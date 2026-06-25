# Phekong Commerce Platform

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Custom commerce, booking, inventory, seller-tracking and business intelligence MVP.

## Source of truth

- GitHub Issues: authorised work
- GitHub Projects: delivery status and milestone control
- Pull Requests: review and acceptance evidence
- `/docs`: architecture and operational documentation

## Issue naming convention

Issue titles must follow the established Sankofa milestone naming pattern:

```text
[MILESTONE-STREAM-NN] Clear action-based title
```

Example:

```text
[M1-DEV-03] Implement official training landing page
```

### Approved M1 streams

| Stream | Meaning | Use for |
| --- | --- | --- |
| `DES` | Design | Penpot frames, visual foundations, screen packs and approved design states |
| `DEV` | Development | Application code, frontend implementation, Storybook setup and technical build work |
| `LRN` | Learning | Intern onboarding, exploratory exercises, training evidence and presentations |

### Numbering rules

- Use two digits for sequence numbers: `01`, `02`, `03`.
- Continue the next number in the same stream.
- Do not invent new streams such as `UX`, `UI`, `OPS`, or `QA` unless Sankofa Digital formally adds them to this README first.
- Keep the title action-based: use verbs such as `Design`, `Build`, `Implement`, `Document`, `Audit`, or `Verify`.
- Do not rename issue categories casually. Naming is part of the project architecture.

### Correct examples

```text
[M1-DES-01] Design Penpot foundations, shell and responsive component states
[M1-DEV-03] Implement official training landing page
[M1-LRN-04] Present design-token correlation and local implementation evidence
```

### Incorrect examples

```text
[M1-UX-01] Make the training HTML artifact the official responsive landing page
[M1-UI] Landing page work
[M1 Task] Fix homepage
```

If a task does not clearly fit `DES`, `DEV`, or `LRN`, pause and ask the project lead before creating the issue.

## Local setup

1. Install Node.js LTS, Git, GitHub CLI and Docker Desktop. The Supabase CLI is installed from the repository lockfile.
2. Copy `.env.example` to `.env.local`.
3. Run `npm ci`. See `docs/npm-workflow.md` for when to use `npm ci` versus `npm install`.
4. Run `npm run supabase:m0:windows` on Windows or `npm run supabase:m0:unix` on macOS/Linux to validate the local Supabase baseline.
5. Run `npm run dev`.

## Working rule

Nothing is work until Sankofa Digital has defined, assigned, reviewed and accepted it.
