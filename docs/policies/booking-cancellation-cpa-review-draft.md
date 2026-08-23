# Booking Cancellation and Account Credit Policy — CPA Review Draft

> **Status: DEVELOPMENT TEMPLATE — NOT LEGALLY APPROVED — DO NOT PUBLISH AS CUSTOMER TERMS**

Owner: Phekong Wellness Centre Owner  
Product milestone: M3 Transactions  
Related issues: #100, #101, #102, #103  
Review status: `draft`

## Purpose

This document gives product, engineering and the Owner one reviewable policy baseline. It is not legal advice and cannot become production terms until the Owner appoints a suitably qualified South African reviewer and records approval below.

## Draft customer policy

### Rescheduling and cancellation windows

Times are calculated using the service location's server-configured timezone.

| Notice before appointment | Rescheduling | Draft monetary outcome |
| --- | --- | --- |
| 72 hours or more | One self-service reschedule, subject to availability | 100% account credit; any cash-refund deduction requires separate reasonable-charge review |
| 24 to under 72 hours | One self-service reschedule, subject to availability | 85% account credit; 15% retained |
| Under 24 hours | No self-service rescheduling | 50% goodwill account credit; 50% retained |
| No-show | No automatic reschedule | No automatic credit; documented manager exception |
| Provider cancellation | Customer chooses reschedule | 100% credit or refund |

The replacement slot must be secured before the original booking is released.

### Account credits

- Credits are denominated in South African rand, not abstract tokens.
- Draft validity is 12 months from issue.
- Credits are non-transferable unless an approved exception applies.
- Issue, redemption, reversal, adjustment and expiry use an append-only audit ledger.
- The customer sees the proposed outcome before confirming cancellation.
- The system prevents duplicate refund and credit for the same value.

### Exceptional circumstances

The legal reviewer must advise how incapacity, emergency, hospitalisation, bereavement, unsafe provider conditions and other exceptional cases should affect the standard outcome and what evidence, if any, may reasonably be requested.

## CPA review questions

The reviewer must specifically assess:

1. Whether each proposed charge is reasonable under the Consumer Protection Act and applicable regulations.
2. Whether different service types or large/group reservations need distinct policies.
3. Whether the 15% and 50% retained amounts are defensible against actual booking value, notice, ability to refill the slot and incurred costs.
4. Whether cash refund, account credit and expiry wording is fair, prominent and understandable.
5. Whether the no-show and exceptional-circumstance rules require changes.
6. Whether customer acceptance, evidence retention and policy-change notice are adequate.
7. Whether any Electronic Communications and Transactions Act or payment-provider requirements also apply.
8. Whether the policy needs clauses for minors, packages, vouchers, promotions or third-party bookings.

## Evidence for reviewer

Attach:

- Service catalogue and duration.
- Current prices and deposits.
- Historical cancellation and slot-refill data, if available.
- Large/group booking definitions.
- Payment-provider fees and refund rules.
- Customer booking screens and confirmation messages.
- Credit-ledger design.
- Complaint and exception-handling workflow.
- The exact policy version proposed for release.

## Approval record

Complete before enabling M3 production transactions:

- Reviewer name:
- Organisation or professional capacity:
- Contact details:
- Review date:
- Policy version reviewed:
- Approved without qualification: Yes / No
- Required amendments:
- Unresolved risks:
- Next review date:
- Owner acceptance name and date:
- Evidence link or attachment:

## Release gate

Production deployment must fail or keep transaction features disabled unless:

- status is `approved`;
- reviewer and review date are present;
- the approved policy version matches the deployed version;
- required amendments are closed;
- customer-facing terms and UI show the same approved outcomes;
- tests cover boundary time, timezone, concurrent reschedule, refund/credit duplication and audit evidence.

## Owner notification template

Subject: Action required — appoint CPA reviewer before M3 production release

M3 has reached the cancellation and account-credit policy review gate. Please appoint a suitably qualified South African reviewer and provide the completed approval record and evidence. Transaction features must remain disabled until the reviewed policy version is approved and matches the deployed configuration.
