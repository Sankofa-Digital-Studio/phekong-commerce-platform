# Phekong About Us Backend Services — Beginner Walkthrough

## First decision: does About Us need a backend now?

A static About page does **not automatically need a backend**.

For M1, static content is acceptable when:

- changes are rare;
- developers control updates;
- no admin editor exists;
- content approval happens through GitHub review.

Add backend services only when Phekong needs authorised staff to update the page without editing code.

The recommended V2 backend goal is:

```text
Admin-approved content → Supabase → Server loader → About page
```

Do not build a public write API.

## Phase 1 — Define editable content

Start with:

- hero;
- story paragraphs;
- values;
- statistics;
- products and services summary;
- CTA labels and destinations.

Images should remain in managed storage or the repository until media administration is approved.

## Phase 2 — Create the content table

Create:

```text
supabase/migrations/<timestamp>_create_site_content.sql
```

```sql
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  content jsonb not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  version integer not null default 1,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_key, section_key, version)
);

create index if not exists site_content_lookup_idx
  on public.site_content (page_key, section_key, status);

alter table public.site_content enable row level security;

create policy "Public can read published site content"
on public.site_content
for select
using (status = 'published');

revoke insert, update, delete
on public.site_content
from anon, authenticated;
```

Public visitors may read published content only.

## Phase 3 — Seed approved content

```sql
insert into public.site_content (
  page_key,
  section_key,
  content,
  status,
  published_at
)
values (
  'about',
  'hero',
  '{
    "eyebrow": "Where Natural Wellness Meets Responsible Care",
    "title": "About Phekong",
    "paragraphs": [
      "Approved paragraph one.",
      "Approved paragraph two."
    ]
  }'::jsonb,
  'published',
  now()
);
```

Do not seed unapproved claims.

## Phase 4 — Add types

Create `src/features/about/about.types.ts`:

```ts
export type AboutHeroContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type AboutPageContent = {
  hero: AboutHeroContent;
  whyChooseUs: {
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
      image: {
        src: string;
        alt: string;
      };
    }>;
  };
};
```

## Phase 5 — Create the server repository

Create `src/features/about/about.repository.ts`:

```ts
import 'server-only';
import { createClient } from '@supabase/supabase-js';

function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase server environment variables.');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function getPublishedAboutSections() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('site_content')
    .select('section_key, content, version, published_at')
    .eq('page_key', 'about')
    .eq('status', 'published');

  if (error) {
    throw new Error(`Unable to load About content: ${error.message}`);
  }

  return data;
}
```

## Phase 6 — Add a mapping service

Create `src/features/about/about.service.ts`:

```ts
import 'server-only';

import { getPublishedAboutSections } from './about.repository';
import { aboutPageContent as fallback } from '@/components/ui/objects/aboutPageContent';

export async function getAboutPageContent() {
  try {
    const rows = await getPublishedAboutSections();

    if (!rows.length) {
      return fallback;
    }

    const sections = Object.fromEntries(
      rows.map((row) => [row.section_key, row.content]),
    );

    return {
      ...fallback,
      ...sections,
    };
  } catch (error) {
    console.error('Using fallback About content', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });

    return fallback;
  }
}
```

The fallback prevents a database outage from breaking the public page.

## Phase 7 — Load content in the server page

```tsx
export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <ApplicationShell>
      {/* render content */}
    </ApplicationShell>
  );
}
```

Keep the About page as a Server Component.

## Phase 8 — Cache later

About content changes infrequently. Add caching only after the basic loader works and repository conventions are confirmed.

## Phase 9 — Do not build admin editing yet

A secure editor requires:

- authentication;
- admin role checks;
- draft and publish workflow;
- audit logs;
- validation;
- preview;
- rollback;
- media management.

That is a separate feature.

## Phase 10 — Tests

Cover:

- published content maps correctly;
- missing content uses fallback;
- database failure uses fallback;
- draft content is excluded;
- malformed content is rejected or ignored;
- page renders with repository content.

## Phase 11 — Verify

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Manually test:

1. published content;
2. no rows;
3. Supabase unavailable;
4. draft row only;
5. one database section overriding static fallback.

## Definition of Done

- [ ] Dynamic content is confirmed as a real requirement.
- [ ] Published content is loaded server-side.
- [ ] Public users cannot write.
- [ ] Static fallback exists.
- [ ] Unapproved claims are not stored.
- [ ] Draft content remains private.
- [ ] Tests cover fallback and failures.
- [ ] No admin editor is implied before it exists.

## Core Rule

```text
Static first.
Dynamic only when there is a real operational need.
Public reads may be open.
Content writes must be protected.
Always keep a safe fallback.
```
