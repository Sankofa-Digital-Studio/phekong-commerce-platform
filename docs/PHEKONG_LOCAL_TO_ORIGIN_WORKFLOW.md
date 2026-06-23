# Phekong Local-to-Origin Development Workflow

> **SANKOFA DIGITAL | PROPRIETARY & CONFIDENTIAL | NOT FOR DISTRIBUTION**

## Purpose

This document defines the required Git workflow for the Phekong Commerce Platform.

The rule is simple:

**Pull first. Branch second. Work locally. Verify. Commit. Push. Open a pull request into `main`.**

No developer or intern should work directly on `main`, push unreviewed changes into `main`, or merge their own pull request.

---

## 1. Start from a clean local repository

Before beginning any task, confirm the current repository state.

```bash
git status
git branch --show-current
```

Expected result:

- The working tree is clean.
- You know which branch is currently checked out.
- No uncommitted work is about to be overwritten.

If local changes already exist, stop and either commit them to the correct feature branch or stash them before continuing.

```bash
git stash push -m "temporary work before starting new task"
```

---git

## 2. Switch to `main`

```bash
git checkout main
```

Do not begin a new task from an old feature branch.

---

## 3. Pull the latest remote changes before creating a branch

```bash
git pull origin main
```

This step is mandatory.

It prevents the new feature branch from starting from stale code and reduces avoidable merge conflicts later.

If the pull creates an unexpected merge commit, stop and inspect the repository before continuing.

Preferred safe sequence:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
```

Using `--ff-only` prevents Git from silently creating a merge commit when the local and remote histories have diverged.

---

## 4. Create a feature branch

Create the branch only after `main` is current.

Examples:

```bash
git checkout -b feat/m1-mkhuseli-landing-page
```

```bash
git checkout -b feat/m1-kamohelo-landing-page
```

Other accepted prefixes:

```text
feat/     New feature or component
fix/      Bug fix
docs/     Documentation only
chore/    Tooling or maintenance
test/     Test-only work
```

Branch names must be clear, lowercase and task-specific.

Do not work directly on `main`.

---

## 5. Confirm the branch before editing

```bash
git branch --show-current
```

Expected result:

```text
feat/m1-example-task
```

If the command returns `main`, stop immediately and create or switch to the correct feature branch.

---

## 6. Work locally within the issue scope

Only change files required by the assigned issue.

Do not introduce:

- authentication;
- booking;
- checkout;
- payment;
- production configuration;
- database migrations;
- admin functionality;
- unrelated refactors;
- dependency upgrades not required by the task.

For the current Storybook and shell scope, relevant paths include:

```text
.storybook/
src/components/
src/styles/
src/types/
src/app/globals.css
package.json
package-lock.json
```

Do not edit `.env.local`, production secrets or deployment configuration.

---

## 7. Run local verification before committing

Run the complete quality sequence:

```bash
npm ci
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run build-storybook
```

Do not request review until the required checks pass.

If one fails:

1. copy the exact error;
2. identify the affected file;
3. fix only the root cause;
4. rerun the failed command;
5. rerun the complete verification sequence.

Do not hide failures with disabled rules, broad `any` types, ignored errors or removed checks.

---

## 8. Review the changes before staging

```bash
git status
git diff
```

Check for:

- accidental files;
- secrets;
- generated output;
- unrelated changes;
- formatting damage;
- dependency changes;
- deleted files;
- stale debug code.

Do not commit:

```text
node_modules/
.next/
storybook-static/
.env.local
coverage/
temporary screenshots containing secrets
```

---

## 9. Stage only the intended files

Avoid blindly staging everything when the change set is not fully understood.

Preferred:

```bash
git add .storybook/preview.ts
git add .storybook/main.ts
git add src/components/
git add src/styles/
git add src/types/
git add package.json package-lock.json
```

Then inspect:

```bash
git diff --staged
```

---

## 10. Commit with a meaningful message

Examples:

```bash
git commit -m "feat(storybook): add Phekong shell stories and design tokens"
```

```bash
git commit -m "fix(storybook): correct global stylesheet imports"
```

```bash
git commit -m "docs(workflow): add local-to-origin contribution guide"
```

A commit message must explain what changed, not merely state that work was done.

Bad:

```text
updates
changes
final
fixed stuff
```

---

## 11. Pull remote changes before pushing when the task has taken time

If other developers may have updated `main`, refresh the remote state:

```bash
git fetch origin
git rebase origin/main
```

Resolve conflicts carefully.

After a successful rebase, rerun:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run build-storybook
```

Do not force-push shared branches without lead approval.

---

## 12. Push the feature branch to origin

First push:

```bash
git push -u origin feat/m1-example-task
```

Later pushes:

```bash
git push
```

Do not push the feature work directly to `origin/main`.

---

## 13. Open a draft pull request into `main`

The pull request direction must be:

```text
feature branch → main
```

Example:

```text
feat/m1-mkhuseli-landing-page → main
```

The pull request must include:

- linked issue;
- summary of changes;
- files changed;
- screenshots where relevant;
- Penpot link where relevant;
- Storybook evidence;
- test outputs;
- known limitations;
- scope declaration.

Use:

```text
Progresses #<issue-number>
```

Do not use `Closes` until the work is genuinely complete and accepted.

---

## 14. Do not merge your own pull request

Interns and developers must not self-merge.

The reviewer must confirm:

- acceptance criteria;
- branch scope;
- design-token correlation;
- accessibility;
- responsive behaviour;
- local build evidence;
- Storybook build;
- no production secrets;
- no later-milestone work.

Only reviewed work may enter `main`.

---

# Current Storybook Review Comments

## 15. Correct items already present

The current `main` branch includes:

1. Storybook scripts in `package.json`.
2. Storybook dependencies and matching lockfile entries.
3. Correct stylesheet imports:
   - `../src/app/globals.css`
   - `../src/styles/phekong-tokens.css`
4. `nextjs.appDirectory: true`.
5. Three palette controls.
6. Light and dark mode controls.
7. English and Chinese locale controls.
8. Root-level decorator updates for palette, mode and locale.
9. CSS and asset module declarations.
10. Strict TypeScript side-effect import checking.
11. A reusable `ApplicationShell` component.

---

## 16. Corrections still required

### 16.1 Clean the formatting in `.storybook/preview.ts`

Use:

```ts
parameters: {
  layout: "fullscreen",
  nextjs: {
    appDirectory: true,
  },
}
```

Do not leave uneven indentation or missing trailing commas.

### 16.2 Decide when accessibility becomes blocking

Current configuration:

```ts
a11y: {
  test: "todo",
}
```

This allows accessibility findings without failing the task.

Before M1 exits review, decide whether to enforce:

```ts
a11y: {
  test: "error",
}
```

Do not change this to `"error"` until the current stories have been checked and violations have been triaged.

### 16.3 Complete bilingual accessibility text

The visible shell supports English and Chinese, but these values must also be translated:

- skip-link text;
- primary navigation `aria-label`;
- mobile navigation `aria-label`;
- menu open label;
- menu close label;
- contact action label where context changes.

Visible translation without translated accessibility text is incomplete localisation.

### 16.4 Prove the build

Repository structure alone is not enough.

Attach results for:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run build-storybook
```

A task is not ready for Code Review merely because Storybook opens in the browser.

### 16.5 Avoid direct work on `main`

The latest push reached `main` through a merge-style commit.

That must not become the intern workflow.

All future work must follow:

```text
pull main → create feature branch → work → verify → commit → push → draft PR → review → merge
```

---

# Three-Pass Review Before Pull Request

## Pass 1: Requirements and scope

1. Confirm the issue number.
2. Confirm the feature branch.
3. Confirm dependencies.
4. Confirm no out-of-scope functionality was added.
5. Confirm the correct artifact or design baseline was used.

## Pass 2: Implementation and verification

1. Run all checks.
2. Test mobile and desktop.
3. Test all required component states.
4. Test light and dark mode.
5. Test all relevant palettes.
6. Test English and Chinese where applicable.
7. Confirm Storybook and the application use the same token source.

## Pass 3: Expert review

1. Check maintainability.
2. Check naming consistency.
3. Check keyboard access.
4. Check focus visibility.
5. Check responsive behaviour.
6. Check empty, loading and error states.
7. Check for regressions.
8. Check for secrets and production changes.
9. Check that another intern can understand the implementation.

---

# Devil's-Advocate Questions

Before opening a pull request, ask:

1. Did I work on `main` by mistake?
2. Did I pull the latest `main` before branching?
3. Did I solve only the assigned issue?
4. Did I invent design decisions that should have come from Penpot?
5. Did I create tokens that duplicate existing tokens?
6. Does Storybook prove every required component state?
7. Does the application use the same token names?
8. Did I silence an error instead of fixing it?
9. Did I commit generated files or secrets?
10. Can another intern reproduce the work from the documentation alone?

---

# Final Workflow Summary

```text
1. git status
2. git checkout main
3. git fetch origin
4. git pull --ff-only origin main
5. git checkout -b feat/<issue-task>
6. work locally
7. npm ci
8. npm run typecheck
9. npm run lint
10. npm run test:run
11. npm run build
12. npm run build-storybook
13. git status
14. git diff
15. git add <intended-files>
16. git diff --staged
17. git commit -m "<type>(scope): meaningful message"
18. git fetch origin
19. git rebase origin/main
20. rerun all checks
21. git push -u origin <feature-branch>
22. open a draft PR into main
23. attach evidence and link the issue
24. wait for review
25. do not self-merge
```
