# Phekong About Us V2 — Frontend Improvement Guide

**PR:** #144  
**Branch:** `feat/m1-about`  
**Author:** `Mkhuseli04`

## Goal

Keep the strong component-based structure, but make the page production-ready, truthful, navigable, testable, and consistent with the Phekong design system.

## 1. Clean PR scope

Review `package.json` and `package-lock.json`.

`lucide-react` should remain only if the About components actually import and use it. Otherwise restore both files from `dev`.

```bash
git fetch origin
git switch feat/m1-about
git pull
git diff --stat origin/dev...HEAD
```

## 2. Fix the PR title

Use:

```text
feat: implement responsive About Us page
```

## 3. Correct content before styling further

Review every public claim with the business owner.

Current content needs correction:

- “Why Choose us” → “Why Choose Us”
- “wellness service” → “wellness services”
- “Beauty lap” likely needs correction
- “Therapy Lab” needs confirmation
- “18+ years” conflicts with an establishment date of 2006 in 2026; that would be 20 years
- “100% Natural Ingredients” is an absolute claim and must be evidence-backed
- “scientific understanding” and “safe, effective solutions” require evidence and careful wellness wording

Prefer:

```text
We combine traditional wellness knowledge with responsible modern practices.
```

Avoid implying medical treatment or guaranteed effectiveness.

## 4. Improve metadata

```ts
export const metadata: Metadata = {
  title: 'About Phekong Wellness Centre',
  description:
    'Learn about Phekong Wellness Centre, our Welkom roots, natural wellness approach, values, herbal product range and massage services.',
  alternates: {
    canonical: '/about',
  },
};
```

## 5. Make CTA actions real

The current CTA receives optional click handlers, but the page passes none. The buttons therefore do nothing.

Prefer links for navigation:

```tsx
<Link href="/products">Shop Now</Link>
<Link href="/services">Book a Massage</Link>
```

Update the props:

```ts
type CTABannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};
```

Do not use buttons for page navigation.

## 6. Improve image modelling

Replace `imageLabel` with explicit content:

```ts
type ImageContent = {
  src: string;
  alt: string;
};
```

Example:

```ts
image: {
  src: '/images/herbal-products.png',
  alt: 'Selection of Phekong herbal wellness products',
}
```

## 7. Remove duplicate image rendering

`CTABanner` renders the same image twice for desktop and mobile.

Use one responsive image:

```tsx
<Image
  src="/images/cta-tea.png"
  alt="Herbal wellness tea with leaves"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className={styles.image}
/>
```

## 8. Strengthen semantics

Recommended hierarchy:

```text
h1 — About Phekong
h2 — Why Choose Us
h2 — Our Products and Services
h2 — Our Values
h2 — Begin Your Wellness Journey
```

Mark decorative elements with `aria-hidden="true"`.

## 9. Clarify Card ownership

Either move the generic Card to `src/components/ui/Card`, or rename it `AboutCard` and keep it feature-scoped.

Do not accidentally create a second global card system.

## 10. Use Phekong tokens

Replace hard-coded colours, spacing, shadows and radii with the existing design tokens.

Check:

- contrast;
- focus states;
- hover states;
- reduced motion;
- mobile spacing;
- responsive typography.

## 11. Add real tests

Create:

```text
src/app/about/page.test.tsx
src/components/about/CtaBanner/CTABanner.test.tsx
```

Cover:

- major sections render;
- CTA links point to `/products` and `/services`;
- images have meaningful alt text;
- all content cards render;
- no duplicate IDs;
- mobile layout does not overflow.

Storybook stories do not replace tests.

## 12. Verify links

```text
Shop Now → /products
Book a Massage → /services
Breadcrumb Home → /
```

## 13. Suggested commits

```text
chore: clean about branch scope
fix: correct About page content and claims
refactor: make About CTA links functional
refactor: improve About image content model
style: align About page with Phekong tokens
test: cover About page and CTA navigation
docs: add About V2 implementation guide
```

## Definition of Done

- [ ] Public claims are approved and evidence-safe.
- [ ] CTA controls navigate correctly.
- [ ] Metadata is brand-specific.
- [ ] Images have meaningful alt text.
- [ ] One responsive CTA image is used.
- [ ] Generic components are placed intentionally.
- [ ] Phekong tokens are used.
- [ ] Tests pass.
- [ ] Lint passes.
- [ ] Type-check passes.
- [ ] Build passes.
- [ ] PR title and description are accurate.
