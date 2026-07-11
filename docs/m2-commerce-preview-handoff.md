# M2 Commerce Preview Handoff

This note ties the new visual commerce shell to the current M2 issue chain.

## Scope

The new preview surface is frontend-only and demonstrates:

- cart summary
- payment preview
- favorites / wishlist preview
- optional profile preview

## Issue mapping

- `#68` M2 Transactions and Bookings public UI queue
- `#99` Implement cart state and server-side price validation
- `#100` Implement order lifecycle
- `#101` Integrate payment gateway sandbox
- `#102` Implement webhook verification and idempotency

## What changed

- Added a responsive, visual commerce shell at `/commerce`.
- Kept the implementation reusable by composing existing UI primitives.
- Left backend persistence, payment provider wiring, and account CRUD out of scope.

## Acceptance note

The preview is useful even without backend persistence because it shows the intended layout, hierarchy, and interaction model for the next bundle.

