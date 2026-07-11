# M2 Transaction Contract

This note records the smallest backend contract for the first M2 transaction bundle.

## Scope

The current bundle covers the chain behind these queued issues:

- `#99` Implement cart state and server-side price validation
- `#100` Implement order lifecycle
- `#101` Integrate payment gateway sandbox
- `#102` Implement webhook verification and idempotency

## What this bundle does

- Defines the approved order status vocabulary already present in the database migration.
- Keeps order transitions narrow so later checkout work can be verified against a clear state path.
- Validates cart line items before any future server action or checkout mutation uses them.
- Documents the current backend-only contract so the frontend can consume it later without inventing a second model.

## What this bundle does not do

- It does not add the public checkout UI yet.
- It does not add a payment provider integration.
- It does not add webhook handler code.

Those pieces belong to the later UI and integration bundles.

## Acceptance criteria

The bundle is ready when:

1. The transaction vocabulary matches the migration-defined order states.
2. The contract rejects invalid line items.
3. The transition rules are tested.
4. The documentation clearly states that frontend work is deferred.

