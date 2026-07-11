# M2 Foundation Baseline

This note records the current backend baseline that supports the first M2 bundle.

## Scope

The first M2 bundle is the foundation chain:

- `#92` Create Supabase organisation and project
- `#93` Install Supabase CLI and initialise local project
- `#94` Create database migration baseline
- `#95` Enable RLS on exposed tables

## What already exists

The repository already contains the core database objects and access boundaries required for the baseline:

- `public.profiles` for authenticated customer profile data
- `public.products` for active public reads
- `public.orders`, `public.order_items`, `public.bookings`, `public.inventory_movements`, and `public.audit_logs`
- row-level security enabled on exposed tables
- a deny-by-default privilege model for anon and authenticated roles
- a booking overlap constraint that protects the current single-capacity service-slot model

## Why this matters

M2 should not duplicate M0. The first M2 pass should treat the existing schema as the starting point and only add new work if a later bundle needs a new contract.

## Acceptance contract for the foundation chain

The first M2 bundle is only complete when:

1. The baseline project and local setup are documented.
2. The migration history remains the source of truth.
3. The exposed tables stay protected by RLS.
4. Any later auth, booking, or payment work starts from the documented baseline instead of rewriting it.

## Implementation guidance

- Reuse the current schema instead of creating a duplicate schema layer.
- Keep foundation work separate from auth, bookings, and payments flows.
- When a later bundle needs a new table or policy, document the reason before changing the migration.

## Review note

The repo is already ahead of the milestone outline for several M2 foundation items. That is acceptable as long as the contract remains explicit and the later bundles do not pretend the foundation work is still pending.
