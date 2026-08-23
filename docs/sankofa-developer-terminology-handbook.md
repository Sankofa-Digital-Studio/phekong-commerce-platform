# Sankofa Developer Terminology Handbook

## How to use this handbook

For each term, learn four things: what it means, why Sankofa needs it, where you see it, and the thought trigger to use when making a decision.

## Git and evidence

### Commit SHA

**Meaning:** The unique identifier for an exact Git commit.  
**Sankofa use:** Connects an issue, test result and deployment to the precise code evaluated.  
**Where to find it:** GitHub commit page, PR commit list, or `git rev-parse HEAD`.  
**Think:** “Which exact version produced this evidence?”

### Acceptance criteria

**Meaning:** Observable conditions that must be true before work is accepted.  
**Sankofa use:** Prevents “it looks done” from replacing verification.  
**Where to find it:** The issue body.  
**Think:** “What evidence would prove each checkbox?”

### Evidence

**Meaning:** Reproducible proof of an outcome, not a verbal claim.  
**Sankofa use:** Includes SHA, command, result, screenshots and relevant security/data checks.  
**Where to find it:** PR description, CI run and delivery comment.  
**Think:** “Can another person reproduce this result?”

### Release gate

**Meaning:** A condition that blocks deployment until a required control is satisfied.  
**Sankofa use:** M3 payments remain disabled until CPA review evidence matches the deployed policy.  
**Where to find it:** CI configuration, milestone checklist and policy status.  
**Think:** “What must be impossible to bypass?”

## Booking integrity

### Advisory availability

**Meaning:** A slot appears free when read, but ownership is not guaranteed until reservation succeeds.  
**Sankofa use:** Prevents the UI from promising a slot that another customer claims concurrently.  
**Where to find it:** Availability response and booking UI.  
**Think:** “Displayed free is not yet owned.”

### Atomic operation

**Meaning:** A group of database changes succeeds completely or does not happen.  
**Sankofa use:** A replacement slot is secured before the original booking is released.  
**Where to find it:** Database transaction or function.  
**Think:** “All together, or nothing changed.”

### Hold

**Meaning:** A temporary reservation of a slot while verification completes.  
**Sankofa use:** Protects the customer’s chosen time without making an unfinished booking permanent.  
**Where to find it:** Booking state `held` and expiry timestamp.  
**Think:** “Reserved briefly, not confirmed forever.”

### TTL — Time to Live

**Meaning:** The period after which temporary data expires.  
**Sankofa use:** Releases an abandoned booking hold.  
**Where to find it:** `expires_at` and the expiry process.  
**Think:** “When must this temporary state die?”

### Idempotency

**Meaning:** Repeating the same request does not repeat its business effect.  
**Sankofa use:** Double-clicks and provider retries cannot create duplicate bookings, credits or messages.  
**Where to find it:** Idempotency keys and unique constraints.  
**Think:** “Retry safely; effect once.”

### Race condition

**Meaning:** The result incorrectly depends on which concurrent action finishes first.  
**Sankofa use:** A check-then-insert booking flow can sell one slot twice.  
**Where to find it:** Concurrency tests and database constraints.  
**Think:** “What happens if two customers click now?”

### Booking state versus delivery state

**Meaning:** Reservation truth and message-delivery truth are separate.  
**Sankofa use:** A failed WhatsApp message does not cancel a confirmed booking.  
**Where to find it:** Booking table/state machine and notification event table.  
**Think:** “Communication reports the booking; it does not own it.”

## Access and privacy

### RLS — Row Level Security

**Meaning:** Database rules controlling which rows a user may read or change.  
**Sankofa use:** Guests, customers, staff, care reviewers and Owners receive only necessary access.  
**Where to find it:** Supabase/Postgres policies and tests.  
**Think:** “Would the database still block this if the UI were bypassed?”

### Least privilege

**Meaning:** Grant only the minimum access required for a task.  
**Sankofa use:** `care_reviewer` does not automatically receive admin, export or marketing access.  
**Where to find it:** Capability assignments, RLS and server authorisation.  
**Think:** “What is the smallest permission that works?”

### Deny by default

**Meaning:** Access is refused unless an explicit rule allows it.  
**Sankofa use:** Health data is unavailable until the Owner assigns an authorised reviewer.  
**Where to find it:** RLS and role configuration.  
**Think:** “No matching permission means no access.”

### Special personal information

**Meaning:** Sensitive categories of personal data receiving stronger legal protection, including certain health information.  
**Sankofa use:** Care disclosures are separated from preferences and marketing.  
**Where to find it:** Restricted care profile and privacy controls.  
**Think:** “Necessary for care does not mean available for sales.”

### Purpose limitation

**Meaning:** Information is used only for the stated, lawful reason it was collected.  
**Sankofa use:** An allergy disclosed for safety cannot become a product-targeting signal.  
**Where to find it:** Consent notice, schema boundary and query permissions.  
**Think:** “Why was this collected?”

### Audit trail

**Meaning:** A durable history of who did what, when and why.  
**Sankofa use:** Records care access, policy changes, booking changes and manager exceptions.  
**Where to find it:** Append-only audit events.  
**Think:** “Can we reconstruct the decision?”

## Messaging

### Transactional message

**Meaning:** Communication required to complete or service an existing customer action.  
**Sankofa use:** OTP, booking confirmation, reminder or cancellation result.  
**Where to find it:** Approved templates and notification events.  
**Think:** “Is this necessary for the booking?”

### Marketing consent

**Meaning:** Separate permission to send promotional communication.  
**Sankofa use:** Booking consent does not authorise product campaigns or general promotions.  
**Where to find it:** Consent record and messaging preferences.  
**Think:** “Service permission is not sales permission.”

### Utility template

**Meaning:** A pre-approved WhatsApp template for a non-promotional customer update.  
**Sankofa use:** Business-initiated booking confirmations and updates outside the active service window.  
**Where to find it:** Messaging-provider template dashboard and repository documentation.  
**Think:** “Approved wording for a necessary update.”

### Outbox pattern

**Meaning:** The business change and its notification event are recorded transactionally, then delivered asynchronously.  
**Sankofa use:** Confirmation is not lost if the messaging provider is temporarily unavailable.  
**Where to find it:** Notification event/outbox table and worker.  
**Think:** “Record reliably now; deliver safely afterward.”

## Care and commercial rules

### `clinical_review_required`

**Meaning:** A fulfilment-attention state indicating that authorised care review is needed.  
**Sankofa use:** Triggered only by an Owner-selected treatment or documented safety rule. It is not routine staff booking approval.  
**Where to find it:** Treatment configuration and care task.  
**Think:** “Review care risk, not slot ownership.”

### Treatment add-on

**Meaning:** An optional, clearly priced addition to a complete base treatment.  
**Sankofa use:** Replaces vague language such as “enhancer” and separates optional value from medical advice.  
**Where to find it:** Recommendation and future M3 pricing flow.  
**Think:** “Optional, transparent and safe.”

### Account credit

**Meaning:** A currency-denominated value retained for later customer use.  
**Sankofa use:** Supports disclosed cancellation outcomes without confusing abstract tokens.  
**Where to find it:** M3 ledger and customer balance.  
**Think:** “Real monetary liability, not points.”

### Immutable ledger

**Meaning:** Financial events are appended rather than silently editing a balance.  
**Sankofa use:** Every issue, redemption, reversal, adjustment and expiry remains traceable.  
**Where to find it:** M3 account-credit entries.  
**Think:** “Never change money without an entry.”

### Policy version

**Meaning:** The exact set of rules applied at a specific time.  
**Sankofa use:** Existing bookings retain their original cancellation and treatment-review decision even after configuration changes.  
**Where to find it:** Booking snapshot, configuration history and CPA approval.  
**Think:** “Which rule did the customer actually accept?”

## Learning loop

When you encounter an unfamiliar term, document:

1. Meaning in plain language.
2. Sankofa example.
3. Why the control matters.
4. Where it appears in the repository or tools.
5. The decision question it should trigger.
