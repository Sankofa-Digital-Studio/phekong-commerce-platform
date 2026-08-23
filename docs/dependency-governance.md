# Dependency governance

## Intent

The repository must stay current without allowing automated major upgrades, lockfile drift, new deprecations, or vulnerable transitive packages to enter unnoticed.

## Two control layers

1. Dependabot proposes grouped minor and patch updates monthly. Major version updates are suppressed and must be planned manually.
2. The repository-owned dependency governance workflow runs every second ISO week and can be triggered manually at any time.

Security updates remain advisory-driven and are not delayed by the version-update schedule.

## What the controlled audit checks

- `package.json` and the root of `package-lock.json` declare identical dependency ranges.
- `npm ls --all` produces a valid installed tree.
- new lockfile deprecation notices fail the audit;
- known deprecations are explicit in `dependency-policy.json`, not silently ignored;
- direct dependencies are compared with registry `wanted` and `latest` versions;
- every SemVer-major jump fails for deliberate migration review;
- protected runtime packages, including Next.js and Supabase, are reported even for minor changes;
- npm major drift and Node LTS major drift are reported separately;
- high and critical `npm audit` findings fail the audit.

The report is written to `tmp/dependency-governance.md` and to the GitHub Actions job summary.

## Commands

```bash
npm ci
npm run dependencies:check
npm run dependencies:governance
```

Never repair drift by editing `package-lock.json` directly. Change `package.json` through an intentional npm command, review both files, run `npm ci`, and commit both files together.

## Major-upgrade review

A major upgrade requires:

1. upstream migration guide and changelog review;
2. Node/runtime and peer-dependency compatibility check;
3. a dedicated branch and pull request;
4. lockfile-only diff inspection before application code changes;
5. lint, typecheck, unit/browser tests, production build, Storybook and Cypress;
6. a rollback note and lead approval.

Supabase CLI requires the same review for releases that announce breaking command, migration, diffing, or configuration changes even when the major number remains `2`.
