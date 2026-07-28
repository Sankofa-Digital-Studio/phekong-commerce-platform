# M1 Contact — Storybook and Testing Tasks

## Completed examples

### Storybook

File: `src/app/contact/ContactPage.stories.tsx`

1. General enquiry state.
2. Product enquiry populated from query parameters.
3. Wholesale enquiry in a mobile viewport.

Run:

```bash
npm run storybook
```

Then open `Pages/Contact`.

### Vitest and Testing Library

File: `src/app/contact/page.test.tsx`

1. Empty submission displays required-field errors.
2. Wholesale selection reveals business fields.
3. Product query parameters display product context.

Run:

```bash
npm run test:run -- src/app/contact/page.test.tsx
```

### Cypress

File: `cypress/e2e/contact.cy.ts`

1. Browser-level empty-form validation.
2. Browser-level wholesale field behaviour.
3. Browser-level product query context.

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

Run the app in one terminal:

```bash
npm run dev
```

Run Cypress in another terminal:

```bash
npm run cypress:open
```

## Follow-up tasks

1. Replace simulated submission with the real `/api/contact` service.
2. Intercept `POST /api/contact` in Cypress and test success, validation failure and server failure.
3. Add a Storybook error state after the component is extracted from the page.
4. Add an accessibility check for labels, error descriptions and focus behaviour.
5. Ensure tests never claim a message was sent unless the API returns success.

## Definition of done

- [ ] All three Storybook stories render.
- [ ] All three Vitest tests pass.
- [ ] Cypress is installed and the three E2E tests pass.
- [ ] Contact API success and failure paths are covered after backend implementation.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test:run` and `npm run build` pass.
