# Testing

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Status: Draft
Owner: Sankofa Digital Lead

## Required layers
- Unit tests for pricing, stock, booking and validation logic
- Integration tests for database and service boundaries
- End-to-end tests for login, catalogue, checkout, booking and admin workflows
- Manual acceptance checks for responsive design and accessibility

## Pull request gate
A change may not be merged when required checks fail or acceptance evidence is missing.


## Homepage quality gate
Run `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run storybook:ci`, `npm run test:e2e:cypress`, and `npm run build` before promoting `dev` to `preview`.

The detailed adaptive-homepage contract, automated layers, and manual Vercel Preview checklist live in [`homepage-quality-coverage.md`](./homepage-quality-coverage.md).
