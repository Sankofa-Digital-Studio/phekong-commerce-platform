# M1 About Us — Storybook and Testing Tasks

## Completed examples

### Storybook

File: `src/app/about/AboutPage.stories.tsx`

1. Desktop page.
2. Mobile viewport.
3. Tablet viewport.

Run:

```bash
npm run storybook
```

Then open `Pages/About`.

### Vitest and Testing Library

File: `src/app/about/page.test.tsx`

1. Main heading and core sections render.
2. Quality, Integrity and Community value cards render.
3. Both CTA controls render.

Run:

```bash
npm run test:run -- src/app/about/page.test.tsx
```

### Cypress

File: `cypress/e2e/about.cy.ts`

1. Browser-level page-section coverage.
2. Browser-level value-card coverage.
3. Browser-level CTA coverage, including the current navigation gap.

## Cypress setup task

Cypress is not currently installed in this repository. Install it deliberately:

```bash
npm install --save-dev cypress
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

Create `cypress.config.ts`:

```ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
});
```

Run the app:

```bash
npm run dev
```

Run Cypress separately:

```bash
npm run cypress:open
```

## Follow-up tasks

1. Replace CTA buttons with navigation links.
2. Update the Cypress CTA test to assert `/products` and `/services` href values.
3. Add a content-quality test preventing known copy regressions such as `Beauty lap`.
4. Add image-alt assertions for all meaningful images.
5. Run Storybook accessibility checks on each About component.
6. Add a visual regression baseline for desktop and mobile views.

## Definition of done

- [ ] All three page stories render.
- [ ] Existing component stories still render.
- [ ] All three Vitest tests pass.
- [ ] Cypress is installed and all three E2E tests pass.
- [ ] CTA tests assert real navigation after the V2 fix.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run storybook:ci` and `npm run build` pass.
