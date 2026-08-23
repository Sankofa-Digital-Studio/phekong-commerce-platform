# M2-M4 Public Roadmap

This document maps the currently queued public-commerce issues into the next milestone buckets.

## Confirmed issues

- `#23` - M1-06 Build product catalogue UI
- `#27` - M1-07 Build product detail UI
- `#28` - M1-08 Implement technical SEO foundation
- `#30` - M1-10 Run accessibility baseline audit
- `#67` - queued follow-up reference to keep attached to the public-route workstream
- `#68` - M2 Transactions and Bookings: public UI task queue
- `#70` - M3 Operations: public UI task queue
- `#71` - M4 Intelligence: public UI task queue

## Milestone buckets

| Milestone | Theme | Notes |
| --- | --- | --- |
| M2 | Booking foundation | Reset the public visual system, then deliver auth-aware service booking, conflict prevention and booking notifications. |
| M3 | Transactions and Operations | Deliver cart, server-side pricing, order lifecycle, payment sandbox, verified webhooks and operational surfaces. |
| M4 | Intelligence | Reserve for analytics, insight, and higher-order reporting work. |

## Tracking rule

- Keep the issue bodies explicit about the UI surface they change.
- Only add backend work when the public page needs a real contract, data shape, or submission path.
- Link route polish and SEO tasks back to the confirmed issue set above instead of creating parallel duplicates.
- Treat #99 through #102 as M3 transaction work; they are not M2 booking exit criteria.
- Milestone attachment still needs the repository's actual GitHub milestone IDs; the queue issues are open now, but their milestone field remains unset until those IDs are confirmed.

## Acceptance criteria note

- The queue issues should carry their own milestone-specific acceptance criteria in GitHub once the board mapping is confirmed.
- Use the M1 evidence doc for route cleanup proof and the roadmap for future milestone tracking.
