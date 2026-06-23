import assert from "node:assert/strict";

const required = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

for (const name of required) {
  assert.ok(process.env[name], `${name} is required`);
}

const baseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
const anonKey = process.env.SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const runAttempt = process.env.GITHUB_RUN_ATTEMPT ?? "1";
const email = `m0-ci-${runId}-${runAttempt}@example.invalid`;
const password = `M0-ci-${runId}-Aa9!`;

let userId = "";
const bookingIds = [];

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  let body = text;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  return { response, body };
}

function jsonHeaders(apiKey, token = apiKey) {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function createBooking(payload) {
  return request("/rest/v1/bookings", {
    method: "POST",
    headers: {
      ...jsonHeaders(serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
}

function rememberBooking(result) {
  const id = result.body?.[0]?.id ?? "";
  assert.ok(id, "Successful booking insert did not return an ID");
  bookingIds.push(id);
}

function assertBookingConflict(result, scenario) {
  assert.equal(
    result.response.status,
    409,
    `${scenario} should fail with HTTP 409`,
  );
  assert.equal(
    result.body?.code,
    "23P01",
    `${scenario} should fail with a PostgreSQL exclusion violation`,
  );
}

try {
  const created = await request("/auth/v1/admin/users", {
    method: "POST",
    headers: jsonHeaders(serviceRoleKey),
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "M0 CI User" },
    }),
  });

  assert.equal(
    created.response.ok,
    true,
    `Auth user creation failed with HTTP ${created.response.status}`,
  );

  userId = created.body?.id ?? created.body?.user?.id ?? "";
  assert.ok(userId, "Auth user creation did not return a user ID");

  const signedIn = await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  assert.equal(
    signedIn.response.ok,
    true,
    `Password sign-in failed with HTTP ${signedIn.response.status}`,
  );

  const accessToken = signedIn.body?.access_token ?? "";
  assert.ok(accessToken, "Password sign-in did not return an access token");

  const profile = await request(
    `/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,full_name,phone,role,active`,
    {
      headers: jsonHeaders(anonKey, accessToken),
    },
  );

  assert.equal(
    profile.response.ok,
    true,
    `Profile lookup failed with HTTP ${profile.response.status}`,
  );
  assert.equal(profile.body.length, 1, "New auth user did not receive one profile");
  assert.equal(profile.body[0].id, userId);
  assert.equal(profile.body[0].full_name, "M0 CI User");
  assert.equal(profile.body[0].role, "customer");
  assert.equal(profile.body[0].active, true);

  const allowedUpdate = await request(
    `/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`,
    {
      method: "PATCH",
      headers: {
        ...jsonHeaders(anonKey, accessToken),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name: "M0 CI Updated",
        phone: "+27000000000",
      }),
    },
  );

  assert.equal(
    allowedUpdate.response.ok,
    true,
    `Allowed profile update failed with HTTP ${allowedUpdate.response.status}`,
  );
  assert.equal(allowedUpdate.body.length, 1);
  assert.equal(allowedUpdate.body[0].full_name, "M0 CI Updated");
  assert.equal(allowedUpdate.body[0].phone, "+27000000000");

  for (const payload of [{ role: "admin" }, { active: false }]) {
    const protectedColumn = Object.keys(payload)[0];
    const deniedUpdate = await request(
      `/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`,
      {
        method: "PATCH",
        headers: {
          ...jsonHeaders(anonKey, accessToken),
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      },
    );

    assert.equal(
      deniedUpdate.response.ok,
      false,
      `Customer unexpectedly updated protected column ${protectedColumn}`,
    );
  }

  for (const table of ["orders", "audit_logs"]) {
    const deniedRead = await request(`/rest/v1/${table}?select=*&limit=1`, {
      headers: jsonHeaders(anonKey, accessToken),
    });

    assert.equal(
      deniedRead.response.ok,
      false,
      `Customer unexpectedly read protected table ${table}`,
    );
  }

  const serviceSlot = `M0 Service ${runId}-${runAttempt}`;
  const otherServiceSlot = `M0 Other Service ${runId}-${runAttempt}`;
  const baseBooking = {
    user_id: userId,
    service_name: serviceSlot,
    assigned_staff_id: userId,
    starts_at: "2035-01-15T10:00:00.000Z",
    ends_at: "2035-01-15T11:00:00.000Z",
  };

  const firstBooking = await createBooking(baseBooking);
  assert.equal(firstBooking.response.status, 201, "Base booking insert failed");
  rememberBooking(firstBooking);

  const sameStaffOverlap = await createBooking({
    ...baseBooking,
    service_name: otherServiceSlot,
    starts_at: "2035-01-15T10:30:00.000Z",
    ends_at: "2035-01-15T11:30:00.000Z",
  });
  assertBookingConflict(sameStaffOverlap, "Overlapping booking for the same staff member");

  const sameServiceOverlap = await createBooking({
    ...baseBooking,
    service_name: `  ${serviceSlot.toUpperCase()}  `,
    assigned_staff_id: null,
    starts_at: "2035-01-15T10:15:00.000Z",
    ends_at: "2035-01-15T10:45:00.000Z",
  });
  assertBookingConflict(sameServiceOverlap, "Overlapping booking for the same service slot");

  const adjacentBooking = await createBooking({
    ...baseBooking,
    starts_at: "2035-01-15T11:00:00.000Z",
    ends_at: "2035-01-15T12:00:00.000Z",
  });
  assert.equal(adjacentBooking.response.status, 201, "Adjacent booking should be allowed");
  rememberBooking(adjacentBooking);

  const cancelledOverlap = await createBooking({
    ...baseBooking,
    status: "cancelled",
    starts_at: "2035-01-15T10:15:00.000Z",
    ends_at: "2035-01-15T10:45:00.000Z",
  });
  assert.equal(
    cancelledOverlap.response.status,
    201,
    "Cancelled booking should not consume staff or service capacity",
  );
  rememberBooking(cancelledOverlap);

  console.log(
    "Supabase M0 authentication, access-boundary and booking-conflict checks passed.",
  );
} finally {
  for (const bookingId of bookingIds) {
    await request(`/rest/v1/bookings?id=eq.${encodeURIComponent(bookingId)}`, {
      method: "DELETE",
      headers: jsonHeaders(serviceRoleKey),
    }).catch(() => undefined);
  }

  if (userId) {
    await request(`/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
      method: "DELETE",
      headers: jsonHeaders(serviceRoleKey),
    }).catch(() => undefined);
  }
}
