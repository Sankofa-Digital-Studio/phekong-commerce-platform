# Developer delivery standards

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Status: Proposed  
Owner: Sankofa Digital Lead

## Purpose

This document turns delivery terminology into enforceable repository practice. A change is not ready for integration until the exact revision can be reproduced, previewed, tested and evidenced.

Use the TRACE gate:

- **T — Target branch**
- **R — Revision SHA**
- **A — Accessible preview**
- **C — Checks green**
- **E — Evidence attached**

## Branch and environment model

| Level | Branch pattern | Purpose | Deployment/data boundary |
| --- | --- | --- | --- |
| Production | `main` | Approved live releases only | Production Vercel environment; production services only |
| Shared integration | `dev` | Lead-approved integration of completed work | Shared development/preview services |
| Personal integration | `internDev/<name>` | Isolated review of one intern's incomplete or remediation work | Vercel preview only; no production credentials or production data |
| Task work | `feature/<name>/<scope>`, `fix/<name>/<scope>`, or `remediation/<name>-<scope>` | A bounded implementation | PR preview only |

Canonical personal branches:

- `internDev/mkhuseli`
- `internDev/kamohelo`

Current remediation PR bases:

- Mkhuseli About remediation → `internDev/mkhuseli`
- Kamohelo Contact remediation → `internDev/kamohelo`

A personal integration branch starts from `dev`. Task branches target the developer's personal integration branch. A lead-approved integration PR may then move accepted work from `internDev/<name>` to `dev`.

## Preview URL specification

A valid preview record contains all four items:

1. The full Vercel preview URL.
2. The deployment environment: `Preview`.
3. The deployed Git commit SHA.
4. Access status: public, Vercel-authenticated, or temporary share link.

The preview URL is evidence only when its deployment SHA matches the tested SHA. Do not deploy intern branches to production or attach production-only services to Preview.

## Required viewports

These values are already configured in `.storybook/preview.ts` and are the official evidence sizes:

- Mobile: **390 × 844 CSS pixels** (`mobile390`)
- Desktop: **1440 × 900 CSS pixels** (`desktop1440`)

Tablet evidence is optional unless the issue or acceptance criteria explicitly require it.

Screenshot filename:

`<page>-<state>-<viewport>-<short-sha>.png`

Examples:

- `about-default-mobile390-2cb00ff.png`
- `about-cta-desktop1440-2cb00ff.png`

A screenshot must come from the preview deployment, not an unrelated local revision.

## Tested SHA

Record the seven-character short SHA and link to the full commit. After any code, dependency, configuration or snapshot change, the previous test evidence becomes stale and the required checks must be rerun.

Useful local commands:

```bash
git rev-parse --short HEAD
git rev-parse HEAD
```

## CI gate

Pull requests to `dev`, `preview` and `main` run the repository CI workflow. Required evidence includes the workflow URL and tested SHA.

The quality job currently covers:

- dependency integrity;
- image pipeline validation;
- lint;
- TypeScript type-check;
- Vitest/browser tests;
- production build;
- static Storybook build;
- Cypress smoke coverage.

Supabase baseline validation remains a separate required job when affected.

## Visual regression and Chromatic

Storybook includes the Chromatic addon, but automated hosted baselines require account-level activation.

Repository workflow: `.github/workflows/visual-regression.yml`

Activation controls:

1. Add repository secret `CHROMATIC_PROJECT_TOKEN`.
2. Add repository variable `ENABLE_CHROMATIC=true`.
3. Run the workflow manually once to establish and approve the initial baseline.
4. Confirm both `mobile390` and `desktop1440` stories/states are captured.
5. Only then consider the visual-regression check required for protected branches.

Until both controls exist, the workflow is intentionally skipped and developers must attach manual preview screenshots. A skipped workflow must not be described as a passing visual baseline.

Baseline changes must be reviewed. Do not auto-accept unexplained visual differences.

## Acceptance evidence

Every PR description must include:

- target branch;
- tested short SHA;
- preview URL and deployed SHA;
- CI workflow link;
- required viewport screenshots;
- visual baseline/build link, or an explicit `Not activated — manual screenshots supplied` note;
- acceptance-criteria mapping;
- known limitations;
- truthful risk notes.

Typed claims such as “tests passed” without a workflow link or reproducible command output are insufficient.

## Merge gates

A PR remains draft or unapproved when any of these is true:

- merge conflicts exist;
- the tested SHA differs from the PR head SHA;
- the preview SHA differs from the tested SHA;
- required CI checks failed or did not run;
- required screenshots/evidence are missing;
- a known limitation blocks the business outcome;
- visual differences are unexplained;
- the branch targets the wrong integration level.

Only a Sankofa Digital lead may approve movement from personal integration to `dev`, or from `dev` to `main`.

## Weekly questions

Developers submit precise terminology or workflow questions every Friday by 15:00 SAST in the shared Developer Questions Log. Each question must include:

- term or instruction;
- repository/PR;
- exact screen, command, field or decision;
- what was expected;
- what happened;
- screenshot or link when relevant;
- current interpretation.

Questions are reviewed on Monday. Approved explanations may be added to the Developer Terminology Handbook.
