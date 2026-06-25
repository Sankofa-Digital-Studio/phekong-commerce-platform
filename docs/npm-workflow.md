# npm workflow law

This repository uses npm with a committed `package-lock.json`. The lockfile is part of the build contract, not a disposable generated file.

## The rule

Use `npm ci` for normal setup, verification, CI and handoff evidence.

Use `npm install` only when intentionally changing dependencies.

`npm i` is only a short alias for `npm install`. It follows the same rule: do not use it for routine setup in this repository.

## Command decision table

| Situation | Command | Why |
| --- | --- | --- |
| Fresh clone | `npm ci` | Installs exactly what `package-lock.json` records. |
| CI or GitHub Actions | `npm ci` | Fails fast when `package.json` and `package-lock.json` drift. |
| Before opening a PR | `npm ci` | Proves another developer can reproduce the dependency tree. |
| After pulling `main` | `npm ci` | Refreshes `node_modules` from the committed lockfile. |
| Adding a package | `npm install <package>` | Updates `package.json` and `package-lock.json` together. |
| Removing a package | `npm uninstall <package>` | Updates `package.json` and `package-lock.json` together. |
| Updating a package deliberately | `npm install <package>@<version>` | Records a reviewed dependency change. |

## Pull request standard

Documentation-only, CSS-only and application-code-only PRs should normally leave `package-lock.json` unchanged.

If `package-lock.json` changes, the PR must explain why. A valid explanation usually includes one of these:

- a dependency was added;
- a dependency was removed;
- a dependency version was intentionally changed;
- the lockfile was repaired after an approved `package.json` change.

Do not hide lockfile churn inside unrelated work. Stop and ask for review if the lockfile changes unexpectedly.

## Why `npm ci` is the default

`npm ci` deletes and recreates `node_modules` from the lockfile. It refuses to continue when `package.json` and `package-lock.json` disagree. That failure is useful because it catches dependency drift before the branch reaches another developer or GitHub Actions.

`npm install` is different. It can update the lockfile while installing. That is correct when you are intentionally changing dependencies, but risky during onboarding or documentation work because it can create noisy lockfile diffs that are unrelated to the task.

## Recovery when the lockfile changes unexpectedly

1. Stop before committing.
2. Check what changed:

   ```bash
   git diff -- package.json package-lock.json
   ```

3. If the task did not require dependency changes, restore the lockfile:

   ```bash
   git restore package-lock.json
   npm ci
   ```

4. If `npm ci` still fails, comment on the issue or PR with the exact error and do not invent a workaround.

## Evidence wording

Use precise evidence in issues and pull requests:

```text
npm ci: passed
npm run lint: passed
npm run typecheck: passed
npm run test:run: passed
npm run build: passed
```

Do not write `npm install: passed` for routine setup evidence unless the task was specifically about changing dependencies.
