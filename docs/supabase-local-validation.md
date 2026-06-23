# Supabase M0 validation gate

The Supabase baseline is merged into `main`. This gate validates `main` and every pull request that changes the database baseline or its access boundaries.

## Version source of truth

The exact Supabase CLI version is pinned once in `package.json` and resolved by `package-lock.json`. Local commands and CI use the executable from `node_modules/.bin`; do not add a second CLI version to the GitHub Actions workflow or depend on a globally installed CLI.

Confirm the installed version with:

```shell
npm ci
npm run supabase:version
```

## Prerequisites

- Docker Desktop is installed and running.
- Node.js 22 or later is installed.
- Dependencies were installed with `npm ci`.
- No hosted Supabase project is required or contacted.

## Run the complete gate

The OS-specific wrappers start only the local Database, Auth, PostgREST, and API gateway services required by M0, rebuild the database from migrations, create a temporary local authentication user, exercise the access boundaries, remove the user, and stop the stack. Unrelated services such as Storage, Realtime, Studio, and Analytics are excluded so their health cannot mask a database-contract failure.

### Windows PowerShell

```powershell
git switch main
git pull --ff-only origin main
npm ci
npm run supabase:m0:windows
```

### macOS, Linux, or Git Bash

```bash
git switch main
git pull --ff-only origin main
npm ci
npm run supabase:m0:unix
```

CI runs the same Unix wrapper through `npm run supabase:m0:ci`.

## Checks performed automatically

The gate fails unless all of the following are true:

1. The pinned CLI starts the local Supabase stack.
2. `supabase db reset` rebuilds the database from committed migrations.
3. `supabase db lint` reports no schema errors.
4. Creating an Auth user creates exactly one matching `public.profiles` row.
5. The profile defaults to `role = customer` and `active = true`.
6. The authenticated customer reads their own profile.
7. The customer updates only `full_name` and `phone`.
8. The customer cannot update `role` or `active`.
9. The customer cannot read `orders` or `audit_logs`.
10. Overlapping non-cancelled bookings are rejected for the same staff member.
11. Overlapping non-cancelled bookings are rejected for the same normalized service slot.
12. Adjacent bookings and cancelled overlaps remain valid.
13. Temporary validation bookings and the validation user are removed.

Orders, bookings, inventory movements, and audit logs remain closed until role-specific policies are implemented and tested. Booking-conflict assertions use the local service role solely to exercise the database constraints through PostgREST; customer booking access is not opened by this gate.

## Lower-level commands

`npm run supabase:m0:check` runs only the HTTP assertions and requires `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` from a running local stack. Prefer the complete OS wrapper.

For migration diagnosis:

```shell
npm exec -- supabase start
npm exec -- supabase db reset
npm exec -- supabase db lint --local --level warning --fail-on error
npm exec -- supabase status
npm exec -- supabase stop --no-backup
```

Never paste service-role keys, database passwords, JWT secrets, or access tokens into issue or pull-request evidence.

## Hosted project transition

M0 is deliberately local-only. Before the first hosted `db pull` or `db push`, record the project region in `docs/architecture.md`, link the intended non-production project, and set `db.major_version` in `supabase/config.toml` to the hosted database's actual major version.
