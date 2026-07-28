# Phekong M1 Contact Backend — Beginner Walkthrough

**For:** First-time backend implementation  
**Repository:** `Sankofa-Digital-Studio/phekong-commerce-platform`  
**Branch:** `feat/m1-contact`  
**Stack:** Next.js 16, TypeScript, Supabase, Vitest

---

## Core Goal

Replace the current simulated success flow with:

```text
Form → API → Validation → Supabase → Response
```

Do not show success until the server confirms persistence.

## Phase 0 — Clean the branch

```bash
git fetch origin
git switch feat/m1-contact
git pull

git restore --source=origin/main next-env.d.ts
git restore --source=origin/main package-lock.json
git restore --source=origin/main src/components/shell/ApplicationShell.tsx
```

Remove the large `/* Pseudo Code */` block from `src/app/contact/page.tsx`.

```bash
npm run typecheck
git add .
git commit -m "chore: clean contact branch scope"
```

## Phase 1 — Create the database table

Create `supabase/migrations/<timestamp>_create_contact_enquiries.sql`:

```sql
create extension if not exists pgcrypto;

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  topic text not null check (topic in ('general','product_inquiry','wholesale','loyalty')),
  message text not null,
  product_id text,
  product_name text,
  business_name text,
  estimated_volume text,
  status text not null default 'new' check (status in ('new','in_progress','resolved','spam')),
  notification_status text not null default 'not_required' check (notification_status in ('pending','sent','failed','not_required')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_enquiries_created_at_idx
  on public.contact_enquiries (created_at desc);

alter table public.contact_enquiries enable row level security;
revoke all on table public.contact_enquiries from anon;
revoke all on table public.contact_enquiries from authenticated;
```

Run:

```bash
npm run supabase:start
npm run supabase:m0:check
```

## Phase 2 — Confirm environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Phase 3 — Add the server-only Supabase client

Create `src/lib/supabase/server.ts`:

```ts
import 'server-only';
import { createClient } from '@supabase/supabase-js';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function createSupabaseAdminClient() {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
```

## Phase 4 — Define contracts

Create `src/features/contact/contact.types.ts`:

```ts
export const CONTACT_TOPICS = ['general','product_inquiry','wholesale','loyalty'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactSubmissionInput = {
  fullName: string;
  email: string;
  topic: ContactTopic;
  message: string;
  productId?: string;
  productName?: string;
  businessName?: string;
  estimatedVolume?: string;
  website?: string;
};
```

## Phase 5 — Validate on the server

Create `src/features/contact/contact.validation.ts` and validate:

- required fields;
- email format;
- allowed topics;
- maximum lengths;
- wholesale business name;
- honeypot field.

Client validation helps the user. Server validation protects the system.

## Phase 6 — Persist enquiries

Create `src/features/contact/contact.repository.ts`:

```ts
import 'server-only';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import type { ContactSubmissionInput } from './contact.types';

export async function insertContactEnquiry(input: ContactSubmissionInput) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from('contact_enquiries')
    .insert({
      full_name: input.fullName,
      email: input.email,
      topic: input.topic,
      message: input.message,
      product_id: input.productId ?? null,
      product_name: input.productName ?? null,
      business_name: input.businessName ?? null,
      estimated_volume: input.estimatedVolume ?? null,
    })
    .select('id, created_at')
    .single();

  if (error || !data) throw new Error(error?.message ?? 'The enquiry could not be saved.');
  return { id: data.id, createdAt: data.created_at };
}
```

## Phase 7 — Add the service layer

Create `src/features/contact/contact.service.ts`:

```ts
import 'server-only';
import { insertContactEnquiry } from './contact.repository';
import { validateContactSubmission } from './contact.validation';

export async function submitContactEnquiry(payload: unknown) {
  const validation = validateContactSubmission(payload);
  if (!validation.success) return { ok: false as const, fieldErrors: validation.fieldErrors };

  if (validation.data.website) return { ok: true as const, enquiryId: 'accepted' };

  const stored = await insertContactEnquiry(validation.data);
  return { ok: true as const, enquiryId: stored.id };
}
```

## Phase 8 — Add the API route

Create `src/app/api/contact/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { submitContactEnquiry } from '@/features/contact/contact.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'INVALID_JSON', message: 'Request body must contain valid JSON.' }, { status: 400 });
  }

  try {
    const result = await submitContactEnquiry(payload);
    if (!result.ok) {
      return NextResponse.json({ ok: false, code: 'VALIDATION_ERROR', message: 'Please correct the highlighted fields.', fieldErrors: result.fieldErrors }, { status: 422 });
    }

    return NextResponse.json({ ok: true, enquiryId: result.enquiryId, message: 'Your enquiry has been received.' }, { status: 201 });
  } catch (error) {
    console.error('Contact submission failed', { message: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ ok: false, code: 'INTERNAL_ERROR', message: 'We could not receive your enquiry. Please try again.' }, { status: 500 });
  }
}
```

## Phase 9 — Test the API before connecting the form

```bash
npm run dev
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Customer","email":"test@example.com","topic":"general","message":"Testing the backend."}'
```

Confirm the row exists in Supabase Studio.

## Phase 10 — Connect the frontend

Replace `setTimeout` with a real `fetch('/api/contact')` call. Add `idle | sending | success | error`. Show success only after a `201` response.

## Phase 11 — Add real tests

Create `src/features/contact/contact.validation.test.ts` and test:

- valid enquiry;
- invalid email;
- missing wholesale business name;
- unsupported topic;
- oversized message.

## Phase 12 — Final checks

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

## Definition of Done

- [ ] Contact table exists.
- [ ] API validates input.
- [ ] Valid enquiries are stored.
- [ ] Invalid email is rejected.
- [ ] Success appears only after persistence.
- [ ] Backend errors are shown truthfully.
- [ ] Real tests pass.
- [ ] Unrelated files are restored.

## Final Rule

```text
Frontend collects.
Backend validates.
Database stores.
Server confirms.
Only then does the UI show success.
```
