#!/usr/bin/env bash

set -euo pipefail

: "${SUPABASE_URL:?SUPABASE_URL is required}"
: "${SUPABASE_ANON_KEY:?SUPABASE_ANON_KEY is required}"
: "${SUPABASE_SERVICE_ROLE_KEY:?SUPABASE_SERVICE_ROLE_KEY is required}"

email="m0-ci-${GITHUB_RUN_ID:-local}-${GITHUB_RUN_ATTEMPT:-1}@example.invalid"
password="M0-ci-${GITHUB_RUN_ID:-local}-Aa9!"
user_id=""

cleanup() {
  if [[ -n "${user_id}" ]]; then
    curl --silent --show-error --fail \
      --request DELETE \
      "${SUPABASE_URL}/auth/v1/admin/users/${user_id}" \
      --header "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
      --header "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
      >/dev/null || true
  fi
}
trap cleanup EXIT

create_payload="$({
  jq --null-input \
    --arg email "${email}" \
    --arg password "${password}" \
    '{
      email: $email,
      password: $password,
      email_confirm: true,
      user_metadata: {full_name: "M0 CI User"}
    }'
})"

create_response="$({
  curl --silent --show-error --fail \
    --request POST \
    "${SUPABASE_URL}/auth/v1/admin/users" \
    --header "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
    --header "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
    --header "Content-Type: application/json" \
    --data "${create_payload}"
})"

user_id="$(jq --raw-output '.id // .user.id // empty' <<<"${create_response}")"
[[ -n "${user_id}" ]] || {
  echo "Auth user creation did not return a user ID." >&2
  exit 1
}

session_payload="$({
  jq --null-input \
    --arg email "${email}" \
    --arg password "${password}" \
    '{email: $email, password: $password}'
})"

session_response="$({
  curl --silent --show-error --fail \
    --request POST \
    "${SUPABASE_URL}/auth/v1/token?grant_type=password" \
    --header "apikey: ${SUPABASE_ANON_KEY}" \
    --header "Content-Type: application/json" \
    --data "${session_payload}"
})"

access_token="$(jq --raw-output '.access_token // empty' <<<"${session_response}")"
[[ -n "${access_token}" ]] || {
  echo "Password sign-in did not return an access token." >&2
  exit 1
}

profile_response="$({
  curl --silent --show-error --fail \
    "${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}&select=id,full_name,role,active" \
    --header "apikey: ${SUPABASE_ANON_KEY}" \
    --header "Authorization: Bearer ${access_token}"
})"

jq --exit-status \
  --arg user_id "${user_id}" \
  'length == 1
   and .[0].id == $user_id
   and .[0].full_name == "M0 CI User"
   and .[0].role == "customer"
   and .[0].active == true' \
  <<<"${profile_response}" >/dev/null

allowed_update_status="$({
  curl --silent --show-error \
    --output /tmp/m0-profile-update.json \
    --write-out '%{http_code}' \
    --request PATCH \
    "${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}" \
    --header "apikey: ${SUPABASE_ANON_KEY}" \
    --header "Authorization: Bearer ${access_token}" \
    --header "Content-Type: application/json" \
    --header "Prefer: return=representation" \
    --data '{"full_name":"M0 CI Updated","phone":"+27000000000"}'
})"

[[ "${allowed_update_status}" == "200" ]] || {
  echo "Allowed profile update returned HTTP ${allowed_update_status}." >&2
  cat /tmp/m0-profile-update.json >&2
  exit 1
}

jq --exit-status \
  'length == 1
   and .[0].full_name == "M0 CI Updated"
   and .[0].phone == "+27000000000"' \
  /tmp/m0-profile-update.json >/dev/null

for protected_column in role active; do
  if [[ "${protected_column}" == "role" ]]; then
    protected_payload='{"role":"admin"}'
  else
    protected_payload='{"active":false}'
  fi

  protected_status="$({
    curl --silent --show-error \
      --output "/tmp/m0-${protected_column}-update.json" \
      --write-out '%{http_code}' \
      --request PATCH \
      "${SUPABASE_URL}/rest/v1/profiles?id=eq.${user_id}" \
      --header "apikey: ${SUPABASE_ANON_KEY}" \
      --header "Authorization: Bearer ${access_token}" \
      --header "Content-Type: application/json" \
      --header "Prefer: return=representation" \
      --data "${protected_payload}"
  })"

  if [[ "${protected_status}" =~ ^2 ]]; then
    echo "Protected column ${protected_column} was writable by a customer." >&2
    cat "/tmp/m0-${protected_column}-update.json" >&2
    exit 1
  fi
done

for protected_table in orders audit_logs; do
  protected_read_status="$({
    curl --silent --show-error \
      --output "/tmp/m0-${protected_table}-read.json" \
      --write-out '%{http_code}' \
      "${SUPABASE_URL}/rest/v1/${protected_table}?select=*&limit=1" \
      --header "apikey: ${SUPABASE_ANON_KEY}" \
      --header "Authorization: Bearer ${access_token}"
  })"

  if [[ "${protected_read_status}" =~ ^2 ]]; then
    echo "Protected table ${protected_table} was readable by a customer." >&2
    cat "/tmp/m0-${protected_table}-read.json" >&2
    exit 1
  fi
done

echo "Supabase M0 authentication, profile and closed-table checks passed."
