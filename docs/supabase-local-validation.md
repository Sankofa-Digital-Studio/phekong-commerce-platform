# Supabase local validation gate

This checklist must be completed before the Supabase baseline pull request is marked ready or merged.

## Prerequisites

- Docker Desktop is installed and running.
- The Supabase CLI is installed.
- The repository branch is `codex/supabase-baseline`.
- No hosted Supabase project is linked for this validation.

## 1. Start the local stack

```powershell
git checkout codex/supabase-baseline
git pull origin codex/supabase-baseline
supabase start
```

Record whether all local services start successfully. Do not paste local service-role keys into GitHub.

## 2. Prove a clean migration reset

```powershell
supabase db reset
```

The command must finish without migration errors. Record the final success output on PR #17 with any secrets removed.

## 3. Verify the new-user profile trigger

1. Open the local Supabase Studio URL printed by `supabase start`.
2. Create one temporary authentication user with a non-production email address.
3. Open the `public.profiles` table.
4. Confirm a profile row exists with the same user ID.
5. Confirm the default role is `customer` and `active` is `true`.

Delete the temporary user after validation.

## 4. Verify database privileges

Run these statements in the local SQL editor:

```sql
select
  has_table_privilege('authenticated', 'public.profiles', 'select')
    as authenticated_can_select_profiles,
  has_column_privilege('authenticated', 'public.profiles', 'full_name', 'update')
    as authenticated_can_update_full_name,
  has_column_privilege('authenticated', 'public.profiles', 'phone', 'update')
    as authenticated_can_update_phone,
  has_column_privilege('authenticated', 'public.profiles', 'role', 'update')
    as authenticated_can_update_role,
  has_column_privilege('authenticated', 'public.profiles', 'active', 'update')
    as authenticated_can_update_active;
```

Expected result:

| Check | Expected |
| --- | --- |
| authenticated can select profiles | `true` |
| authenticated can update `full_name` | `true` |
| authenticated can update `phone` | `true` |
| authenticated can update `role` | `false` |
| authenticated can update `active` | `false` |

Also run:

```sql
select
  has_table_privilege('anon', 'public.products', 'select')
    as anon_can_select_products,
  has_table_privilege('authenticated', 'public.orders', 'select')
    as authenticated_can_select_orders,
  has_table_privilege('authenticated', 'public.audit_logs', 'select')
    as authenticated_can_select_audit_logs;
```

Expected result:

| Check | Expected |
| --- | --- |
| anon can select products | `true` |
| authenticated can select orders | `false` |
| authenticated can select audit logs | `false` |

The closed access posture for orders, bookings, inventory movements and audit logs is intentional until role-specific policies are implemented.

## 5. Evidence to add to PR #17

Add a comment containing:

```text
Local Supabase validation
- supabase start: PASS / FAIL
- supabase db reset: PASS / FAIL
- profile trigger: PASS / FAIL
- full_name and phone update privileges: PASS / FAIL
- role and active update denial: PASS / FAIL
- orders and audit logs remain closed: PASS / FAIL
- validated commit: <full commit SHA>
```

Attach only redacted screenshots or command output. Never include service-role keys, database passwords, JWT secrets or access tokens.
