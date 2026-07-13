# M1 Intern Quick Start

> Scope guard: this guide supports issue #31 only. It is for local setup, verification and beginner handoff. It does not introduce production configuration, database migrations, authentication, payments, checkout, booking, admin logic or protected business rules.

## 1. What this task proves

This task proves that a new intern can clone the repository, install the existing dependencies, run the existing checks and start the local application without guessing hidden steps.

The goal is not to build a feature yet. The goal is to make the development path visible, repeatable and safe.

## 2. Required tools

Install these before touching the code:

- Node.js 24 LTS
- Git
- GitHub CLI, recommended for authentication and pull requests
- Docker Desktop, required before local Supabase can run
- Supabase CLI

### Supabase CLI option

Use one official installation method and record which one worked on your machine.

Common npm-based option:

```bash
npm install -g supabase
supabase --version
```

Do not paste tokens, passwords or production values into issues, commits or screenshots.

## 3. Clone and branch

```bash
git clone https://github.com/Sankofa-Digital-Studio/phekong-commerce-platform.git
cd phekong-commerce-platform
git checkout main
git pull origin main
git checkout -b docs/m1-intern-quick-start
```

Expected result:

```text
Switched to a new branch 'docs/m1-intern-quick-start'
```

## 4. Read before editing

Before changing anything, read these files:

- `README.md`
- `.env.example`
- `package.json`
- `package-lock.json`
- `docs/m1-intern-quick-start.md`
- `docs/npm-workflow.md`

The repository currently declares these scripts in `package.json`:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:run
npm run build
npm run dev
```

Use the package manager already used by the repository. Because `package-lock.json` exists, use npm unless the project lead explicitly changes the standard. The normal setup command is `npm ci`; use `npm install` only when a task intentionally changes dependencies.

## 5. Environment file setup

Create your local environment file from the example:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Use placeholder or local development values only. Never commit `.env.local`.

The example file separates browser-safe Supabase values from server-only values. Anything named `SERVICE_ROLE`, password, token or secret must stay private.

## 6. Install dependencies

```bash
npm ci
```

Expected result:

- `node_modules` is created locally
- `package-lock.json` should not change unexpectedly
- No production secrets are requested

If `package-lock.json` changes unexpectedly, stop and comment on issue #31 with the command you ran and the diff summary. Do not commit lockfile churn into a documentation-only PR.

## 7. Start local Supabase

Docker Desktop must be running first.

```bash
supabase start
```

Expected result:

- Supabase starts local services
- Local URLs and local keys are printed
- No production keys are used

Redact any keys before sharing screenshots.

## 8. Run quality checks

Run these from the repository root:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Expected result:

- lint passes
- type checking passes
- tests pass
- production build passes

If a command fails, run it once more after checking that dependencies installed correctly. If it still fails, stop and comment on issue #31. Do not invent a workaround.

## 9. Start the app

```bash
npm run dev
```

Open the local URL printed by Next.js, commonly:

```text
http://localhost:3000
```

Expected result:

The landing page loads and shows the Phekong Wellness Centre scaffold.

## 10. Evidence to collect

Attach or paste redacted evidence in the issue or draft PR:

- operating system and Node version
- install command used
- Supabase CLI version
- result of `npm run lint`
- result of `npm run typecheck`
- result of `npm run test:run`
- result of `npm run build`
- screenshot of the local app running

Example evidence format:

```text
OS: Windows 11
Node: v20.x.x
Supabase CLI: x.x.x
npm ci: passed
npm run lint: passed
npm run typecheck: passed
npm run test:run: passed
npm run build: passed
Local app: http://localhost:3000 loaded successfully
Screenshot: attached, no secrets visible
```

## 11. Common beginner blockers

### Authentication fails when cloning

Use GitHub CLI:

```bash
gh auth login
gh auth status
```

Then retry the clone command.

### `supabase` command is not found

Confirm installation:

```bash
supabase --version
```

If the command is missing after installation, restart the terminal and check that the global npm bin directory is on the PATH.

### Docker is not running

Start Docker Desktop, wait until it says the engine is running, then retry:

```bash
supabase start
```

### Port already in use

Stop the other process or ask for help. Do not randomly change application ports without documenting the reason.

### Secrets appear in terminal output

Do not screenshot or paste them. Redact first.

## 12. Three-pass review checklist

### Pass 1: Requirements and dependency audit

- Issue #31 is the only task being worked on
- Branch is `docs/m1-intern-quick-start`
- No production configuration is touched
- No database migrations are touched
- Existing npm workflow is preserved

### Pass 2: Implementation and verification

- Documentation is beginner-friendly
- Commands are copy-pasteable
- Expected outputs are described
- Quality commands are listed
- Evidence requirements are clear

### Pass 3: Expert review

- No secrets are included
- No later milestone work is introduced
- No business logic is changed
- No dependency major-version upgrade is made
- A new intern can follow the guide without private side instructions

## 13. Devil's-advocate review

Ask these before requesting review:

1. Did I accidentally solve a future feature instead of documenting setup?
2. Did I hide a failure instead of reporting it?
3. Did I include any secret, token, password or private client value?
4. Did I change `package-lock.json` without understanding why?
5. Would a brand-new intern know exactly what to do next?

## 14. Pull request rule

Open a draft PR only. Link it to issue #31 using:

```text
Progresses #31
```

Do not merge your own work. Move to Code Review only after the evidence is complete and the draft PR is ready for a reviewer.
