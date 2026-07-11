# Intern Guide

This folder is the entry point for new contributors who need the why, not just the what.

## How to use this guide

1. Read the milestone overview first.
2. Read the milestone you are about to touch.
3. Use the issue tracker as the source of truth for current scope.
4. Do not duplicate working patterns. Reuse shared components, tokens, and page shells.
5. Keep changes small, explain them clearly, and verify them before moving on.

## Shared rules

- Prefer one reusable component over repeated page-specific markup.
- Prefer one token update over one-off styling overrides.
- If a UI pattern already exists, critic it first:
  - What is already good?
  - What is missing?
  - What would regress if changed?
- Keep metadata, breadcrumbs, and route structure consistent across public pages.
- If a page needs backend behavior, document the contract before adding the UI.

## What this folder covers

- `m0.md`: repository foundation and guardrails
- `m1.md`: public commerce foundation
- `m2.md`: transactions, auth, bookings, and payments
- `m3.md`: operations and admin support
- `m4.md`: intelligence, reporting, and review surfaces

## Suggested reading order

1. `m0.md`
2. `m1.md`
3. `m2.md`
4. `m3.md`
5. `m4.md`

## Notes for maintainers

- Update the milestone guide after a bundle lands, not before.
- Keep the language practical and specific.
- If a new reusable component appears, mention where it lives and why it exists.
- If a page is intentionally not interactive, say so plainly.
