# Mkhuseli About Feature — Remediation and Readiness Framework

**Working branch:** `remediation/mkhuseli-about`  
**Source branch:** `feat/m1-about`  
**Original PR:** #144  
**Purpose:** Give the intern an isolated branch to correct, test, deploy and visually evaluate the About page before returning to peer review.

---

## 1. Why this remediation exists

This is not only an intern problem. It exposes gaps in both the feature work and the delivery process.

### Intern-side gaps

- The page was visually complete but key CTA controls did not navigate.
- Content claims were not fully checked against dates, evidence or wellness-risk wording.
- Storybook was treated as stronger proof than it actually is.
- Tests were missing.
- Generic reusable components were introduced without a clear ownership boundary.
- The PR originally claimed completion before behaviour and content were fully verified.

### Lead/process-side gaps

- The issue did not require a content-verification pass.
- There was no explicit hosted-preview self-review gate.
- The acceptance criteria did not distinguish visual completion from functional completion.
- There was no measurable threshold before peer review.
- The intern was not required to document confidence, known limitations and evidence.

The remediation corrects both the feature and the system around the feature.

---

## 2. Required delivery path

```text
Approved content and acceptance criteria
        ↓
Intern remediation branch
        ↓
Component and route corrections
        ↓
Storybook and automated tests
        ↓
Hosted preview deployment
        ↓
Intern visual evaluation and score
        ↓
75% minimum gate for peer review
        ↓
Peer feedback and correction
        ↓
90% expected final threshold
        ↓
Lead approval or intervention
```

The original PR remains Draft until remediation evidence exists.

---

## 3. Accuracy thresholds

### Below 60% — foundational failure

The implementation is not ready for review.

Required response:

- stop expanding the page;
- identify misunderstood requirements;
- pair with a peer or lead;
- complete a smaller component correction;
- document failures and lessons;
- rebuild the plan.

### 60%–74% — partial implementation

The intern continues self-remediation.

Peer review is not requested yet.

Required evidence:

- updated checklist;
- corrected screenshots;
- test notes;
- content verification notes;
- exact remaining blockers.

### 75%–89% — peer-review eligible

The intern may request peer review.

Required:

- hosted preview URL;
- self-scored rubric;
- screenshots at three viewport sizes;
- Storybook evidence;
- unit and Cypress results;
- content-risk review;
- known limitations;
- exact commit SHA.

### 90%–100% — expected completion threshold

The feature is expected to be ready for lead review.

A score above 90% still requires evidence and approval.

### Failure to reach 90% after peer review

This triggers intervention.

Required intervention evidence:

- interim documentation;
- peer feedback;
- lead feedback;
- proof of attempted fixes;
- test output;
- deployment screenshots;
- content approval notes;
- additional resources used;
- explanation of the remaining block;
- decision on pairing, reassignment or scope reduction.

---

## 4. About feature scorecard

Score each area from 0 to 5.

| Area | Weight | 0 | 3 | 5 |
|---|---:|---|---|---|
| Requirement accuracy | 15% | Major requirements misunderstood | Mostly implemented | All acceptance criteria implemented accurately |
| Content accuracy | 15% | Claims/wording unverified | Most content corrected | Dates, wording and wellness claims approved |
| CTA functionality | 10% | Controls do nothing | Partly functional | All CTA links navigate correctly |
| Component structure | 10% | Duplicated or confused | Mostly reusable | Clear ownership and stable interfaces |
| Accessibility | 10% | Major semantic issues | Acceptable | Headings, alt text, focus and landmarks verified |
| Responsive behaviour | 10% | Layout breaks | Mostly responsive | Mobile, tablet and desktop verified |
| Automated tests | 10% | No tests | Partial tests | Unit/component/E2E cover critical behaviour |
| Storybook coverage | 5% | None | Basic | Desktop, tablet, mobile and component states documented |
| Metadata/SEO | 5% | Generic or wrong | Mostly correct | Brand-specific and accurate |
| Scope discipline | 5% | Unrelated changes | Minor noise | Focused and justified dependencies |
| Deployment evidence | 3% | No preview | Preview exists | Preview tested against exact commit |
| Self-review quality | 2% | Claims without proof | Basic checklist | Honest, evidence-backed analysis |

### Score calculation

```text
Weighted score = sum of each area score ÷ 5 × its weight
```

The intern publishes the score before requesting review.

---

## 5. Required completed tasks

### Task A — Verify content

Create an approval checklist for:

- establishment year and years-of-experience statistic;
- product and service names;
- “100% natural” claims;
- “safe” and “effective” claims;
- references to scientific understanding;
- wellness language that could be interpreted as medical treatment;
- spelling, grammar and capitalisation.

No unapproved claim remains in production copy.

### Task B — Fix CTA behaviour

Required routes:

```text
Shop Now → /products
Book a Massage → /services
```

Use links for navigation, not inert buttons.

### Task C — Clarify component ownership

Decide whether `Card` is:

- a shared global UI primitive under `components/ui`, or
- an About-only `AboutCard`.

Document the decision.

### Task D — Improve images

- Use explicit `{ src, alt }` data.
- Replace duplicate desktop/mobile CTA images with one responsive image.
- Verify meaningful alt text.
- Confirm image sizing at three viewport sizes.

### Task E — Storybook

At minimum maintain or add:

1. Desktop About page.
2. Tablet About page.
3. Mobile About page.
4. CTA component with real links.
5. Values grid with approved copy.
6. Products/services panel with corrected content.

### Task F — Tests

At minimum:

- page renders expected sections;
- CTA destinations are correct;
- values render;
- images have meaningful alt text;
- no duplicate section IDs;
- mobile layout does not overflow;
- Cypress confirms navigation and visual structure.

### Task G — Hosted preview

Push the remediation branch:

```bash
git push -u origin remediation/mkhuseli-about
```

The repository's Vercel integration should create a branch preview.

The intern must inspect the hosted preview, not only localhost.

### Task H — Visual evaluation

Provide screenshots at:

- 375 × 812 mobile;
- 768 × 1024 tablet;
- 1366 × 768 desktop.

Screenshots must show:

- hero;
- Why Choose Us;
- products/services;
- stats;
- values;
- CTA;
- CTA navigation destination.

### Task I — Self-review statement

The intern must answer:

1. What did I originally misunderstand?
2. Which visual choices looked complete but were functionally incomplete?
3. What content needed verification?
4. What tests now prove the page works?
5. What still needs business-owner approval?
6. What is my accuracy score and how did I calculate it?
7. Am I satisfied with the hosted preview? Why?

---

## 6. Required evidence pack

Create:

```text
docs/evidence/about/
  self-review.md
  content-approval.md
  test-results.md
  deployment-check.md
  known-limitations.md
  screenshots/
```

The evidence pack must include:

- branch name;
- commit SHA;
- preview URL;
- approved content decisions;
- test commands and results;
- screenshots;
- accessibility observations;
- failed attempts and lessons;
- final accuracy score.

---

## 7. Lead responsibilities

The lead must:

- provide approved brand facts and wording boundaries;
- identify regulated or risky wellness claims;
- define route destinations before asking for CTA implementation;
- distinguish visual acceptance from functional acceptance;
- require hosted-preview evaluation;
- review evidence, not confidence;
- consolidate feedback;
- intervene when the same gap repeats;
- provide pairing or resources where the block is instructional;
- document acceptance, rejection or scope change.

The lead must not:

- assume the intern knows which claims are legally or medically sensitive;
- accept visual polish as functional completion;
- change content requirements silently;
- rewrite the whole page without explaining the missed reasoning;
- allow Storybook screenshots to replace automated tests.

---

## 8. Technical skills being learned

- Next.js App Router page composition.
- Server Component boundaries.
- Component API design.
- Shared versus feature-scoped UI primitives.
- TypeScript props and content modelling.
- `next/image` responsive usage.
- Metadata and canonical routes.
- Semantic HTML and heading hierarchy.
- Accessible link and CTA behaviour.
- Storybook viewport and component-state modelling.
- Vitest and Testing Library.
- Cypress E2E testing.
- Responsive verification.
- Git branch discipline.
- Focused dependency management.
- Vercel branch-preview validation.
- Evidence-based PR preparation.

---

## 9. Soft skills being learned

- Content accuracy and fact checking.
- Recognising regulated or sensitive claims.
- Asking for business-owner approval.
- Distinguishing appearance from behaviour.
- Self-review and metacognition.
- Receiving critique professionally.
- Communicating uncertainty and risk.
- Scope and time management.
- Deployment ownership.
- Documenting decisions.
- Peer collaboration.
- Professional accountability.
- Knowing when to escalate.
- Explaining why a design choice is maintainable.

---

## 10. Review gates

### Gate 1 — Local quality

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

### Gate 2 — Storybook

```bash
npm run storybook:ci
```

### Gate 3 — Cypress

```bash
npm run dev
npm run test:e2e:cypress
```

### Gate 4 — Hosted preview

Required:

- preview loads;
- no console errors;
- CTA links navigate;
- mobile, tablet and desktop checked;
- content matches approved wording;
- images and alt text checked.

### Gate 5 — Intern self-score

Minimum 75% before peer review.

### Gate 6 — Peer review

Peer confirms or disputes the score with evidence.

### Gate 7 — Final threshold

Expected 90% before lead approval.

---

## 11. Definition of remediation complete

- [ ] Remediation branch is deployed.
- [ ] Preview URL is documented.
- [ ] Intern has visually evaluated the preview.
- [ ] CTA links work.
- [ ] Content claims are approved.
- [ ] Storybook scenarios are complete.
- [ ] Unit and Cypress tests pass.
- [ ] Accessibility and responsive checks are documented.
- [ ] Evidence pack exists.
- [ ] Intern self-score is at least 75% before peer review.
- [ ] Final score is expected to be at least 90%.
- [ ] Any failure below 90% has an intervention record.
- [ ] Original PR is updated only after remediation evidence is reviewed.

---

## Core principle

```text
A page is not complete because it looks complete.
It is complete when its content is accurate,
its actions work,
its behaviour is tested,
and its author can prove it.
```