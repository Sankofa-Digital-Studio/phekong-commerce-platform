# M2 Auth and Role Contract

This note describes the small contract that supports the M2 auth and profile bundle.

## Purpose

The repository already stores the core role and profile rules in Supabase migrations. This note captures the same contract in repo language so implementation work stays aligned with the database baseline.

## Role model

The approved application roles are:

- `admin`
- `staff`
- `seller`
- `customer`

The role is server-controlled and must not be editable by a signed-in customer.

## Profile edit boundary

Authenticated customers may only update:

- `full_name`
- `phone`

They may not update:

- `role`
- `active`

## Implementation notes

- Keep role names consistent across database, helper modules, and UI copy.
- Keep the server-controlled fields separate from customer-editable fields.
- Reuse the role helper for documentation and flow checks instead of hard-coding role strings in multiple places.

## Verification note

The role helper module and the Supabase migration should agree on the same boundary. If one changes, the other must be reviewed in the same bundle.
