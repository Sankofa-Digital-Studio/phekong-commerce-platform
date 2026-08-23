# M2 Booking Delivery Pack

## Status

Planning baseline for M2 implementation. This document does not prove completion; it defines what must be implemented and evidenced before M2 can close.

## Outcome

Deliver a Basotho-informed luxury wellness booking experience in which customers can book quickly, the database prevents conflicts, WhatsApp/SMS communications are reliable, and staff handle care exceptions without becoming a routine sales bottleneck.

## Scope map

| Workstream | Issue | Required outcome |
| --- | --- | --- |
| Visual reference | #171 | Home + booking establish one accessible design grammar |
| Identity | #97 | Guest and account capabilities are explicit |
| Data access | #98 | RLS protects public, customer, staff and Owner operations |
| Booking UX | #103 | Booking, cancellation and rescheduling are understandable |
| Integrity | #104 | Atomic hold and conflict constraints prevent double booking |
| Communication | #105 | WhatsApp-first, SMS-fallback transactional notifications |
| Care workflow | #179 | Owner-controlled review with health/marketing separation |

## Definition of ready

- [ ] Issue has objective, dependencies, acceptance criteria and scope guard.
- [ ] UI/data contract and state transitions are written down.
- [ ] Required roles and RLS behavior are identified.
- [ ] Error, empty, loading, conflict and success states are specified.
- [ ] Test level is identified: unit, integration, migration, concurrency or browser.
- [ ] No payment or inventory scope has leaked into M2.
- [ ] Assignee understands the terminology linked from this pack.

## Implementation checklist

### Booking integrity

- [ ] Slot display is advisory.
- [ ] Reservation creates one atomic, short-lived hold.
- [ ] Hold TTL and expiry worker are deterministic and tested.
- [ ] Concurrent claims yield one winner.
- [ ] Retry and double-submit are idempotent.
- [ ] Confirmation follows successful database and identity verification.
- [ ] Replacement slot is secured before original release.
- [ ] Policy boundaries use server time and location timezone.

### Customer experience

- [ ] Guest and authenticated flows share a booking contract.
- [ ] No forced account appears after guest data entry.
- [ ] Customer sees the cancellation/reschedule outcome before committing.
- [ ] Conflict response offers current alternatives.
- [ ] Booking confirmation is visible on-screen without relying on message delivery.
- [ ] English copy is stored in translation-ready resources.
- [ ] Mobile keyboard, focus, labels, errors and touch targets are verified.

### Notifications

- [ ] WhatsApp opt-in evidence is retained.
- [ ] Transactional and marketing consent are separate.
- [ ] Approved utility/authentication templates are documented.
- [ ] SMS fallback is deterministic.
- [ ] Provider callbacks are authenticated and idempotent.
- [ ] Delivery failure does not invalidate a booking.
- [ ] Staff notification contains no detailed health data.
- [ ] Retry, dead-letter and operational alert paths are observable.

### Care and privacy

- [ ] Owner assigns/revokes `care_reviewer`.
- [ ] Staff acknowledge privacy duties before first access.
- [ ] Clinical-review multi-select supports an empty initial state.
- [ ] Configuration changes are versioned and audited.
- [ ] Health and preference/marketing data are structurally separated.
- [ ] Product recommendations cannot query health disclosures.
- [ ] RLS prevents unauthorised reads and exports.
- [ ] Declining an add-on does not degrade the base treatment.

### Visual and accessibility

- [ ] Home + booking are captured at 390px and 1440px.
- [ ] Shared tokens replace route-level styling decisions.
- [ ] Basotho reference provenance is recorded.
- [ ] Generic motifs, novelty fonts and sacred decoration are excluded.
- [ ] Focus, contrast, error association and reduced motion are checked.
- [ ] Storybook and visual regression cover reusable states.

## Evidence checklist

Every completed issue/PR must provide:

- [ ] Issue number and acceptance criteria mapping.
- [ ] Tested commit SHA.
- [ ] Exact command list and exit results.
- [ ] `npm ci`, dependency-tree and lockfile consistency evidence.
- [ ] Lint, typecheck, unit, build and relevant Cypress results.
- [ ] Supabase migration and RLS test results where data changes.
- [ ] Concurrency evidence for booking/credit-sensitive transitions.
- [ ] Screenshots for applicable UI states and viewports.
- [ ] Accessibility evidence.
- [ ] Secret/PII review and confirmation that logs are sanitised.
- [ ] Known limitations and residual risks.
- [ ] Reviewer decision and follow-up owner.

## Evidence comment template

```markdown
## Delivery evidence

Issue:
Acceptance criteria covered:
Commit SHA:

### What changed

### Commands and results
- command — PASS/FAIL — relevant output/link

### Visual/accessibility evidence
- state, viewport and artifact link

### Data/security evidence
- migrations, RLS, concurrency, secrets and PII checks

### Known limitations

### Reviewer decision
- ready / changes required
- reviewer:
- date:
```

## Release gates

M2 closes only when all scoped issues meet their acceptance criteria and full CI is green. M3 transaction behavior remains disabled. CPA cancellation/account-credit language remains a development draft until the Owner-appointed reviewer approves the exact deployed policy version.
