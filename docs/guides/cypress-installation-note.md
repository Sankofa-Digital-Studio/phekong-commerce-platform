# Cypress installation note

Cypress is declared in `package.json` and configured through `cypress.config.ts`.

## Required local synchronisation

Because the dependency manifest was updated through GitHub rather than an npm-enabled development machine, regenerate the lockfile locally before final review:

```bash
npm install
```

Then verify:

```bash
npm run cypress:open
npm run cypress:run
```

The Next.js development server must be running at `http://localhost:3000` before executing the end-to-end tests.

```bash
npm run dev
```

Do not use `npm ci` until `package-lock.json` has been regenerated and committed from the updated manifest.
