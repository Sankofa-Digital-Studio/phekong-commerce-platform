# Architecture

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Status: Approved baseline
Owner: Sankofa Digital Lead

## Purpose
Record approved technical decisions for the Phekong MVP.

## Approved stack
- Repository: GitHub
- Project tracking: GitHub Projects
- Design: PenPot
- Application framework: Next.js with TypeScript
- Database and authentication: Supabase
- Deployment: Vercel
- Unit testing: Vitest
- End-to-end testing: Playwright
- Error monitoring: Sentry
- Analytics: Google Analytics and Google Search Console

## Architecture decision
Next.js with TypeScript is selected because the MVP needs public SEO-focused pages, authenticated admin routes, server-side business rules, booking workflows and payment integration in one application.

## Reasons
- Server route handlers support protected business operations.
- Public product and service pages support strong metadata and rendering options.
- Supabase authentication can be used across server and client components.
- Vercel provides a direct preview and deployment path.
- TypeScript gives clearer contracts for products, orders, bookings and inventory.
- One application avoids splitting the public site, API and admin area too early.

## Application boundaries

### Public application
- Home, about and contact
- Product catalogue and product details
- Cart and checkout
- Service booking
- Customer authentication
- Order and booking status

### Administrative application
- Product and inventory control
- Order and return management
- Booking administration
- In-person seller tracking
- KPI and analytics dashboards
- Audit views

### Server responsibilities
- Validate prices and stock
- Verify payment events
- Prevent booking conflicts
- Protect administrative actions
- Record audit events
- Send notifications

## Data and security principles
- Supabase migrations are the database source of truth.
- Row Level Security is enabled on exposed tables.
- Sensitive operations remain server-side.
- Client-submitted totals and roles are revalidated.
- Production data is not used for intern development.

## Booking concurrency invariant

Booking-conflict protection is enforced by PostgreSQL, not only by application checks. Every non-cancelled booking reserves the half-open interval `[starts_at, ends_at)` for both its assigned staff member, when present, and its normalized service slot. Therefore:

- time ranges for the same staff member cannot overlap, even across different services;
- time ranges for the same service slot cannot overlap, even when no staff member is assigned;
- adjacent bookings are allowed when one booking ends exactly when the next begins; and
- changing a cancelled booking back to another status rechecks both constraints.

M0 uses the trimmed, case-insensitive `service_name` as a single-capacity service-slot key because no stable service/resource table exists yet. A future multi-capacity model must introduce an explicit service or resource identifier and migrate the exclusion constraint to that identifier before allowing concurrent capacity.

## Runtime and package management
- Node.js: active LTS supported by the selected Next.js release
- Package manager: npm
- Default branch: main
- Merge strategy: squash merge

## Open decisions
- Payment gateway implementation details
- Notification provider
- Production billing ownership at handover
- Analytics consent approach
