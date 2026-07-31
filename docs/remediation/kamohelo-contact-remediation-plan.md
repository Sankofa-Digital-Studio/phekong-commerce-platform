# Kamohelo Contact Feature — Remediation and Readiness Framework

**Working branch:** `remediation/kamohelo-contact`  
**Source branch:** `feat/m1-contact`  
**Original PR:** #145  
**Purpose:** Give the intern a safe branch to learn, correct, test, deploy and visually evaluate the contact feature before returning to peer review.

---

## 1. Why this remediation exists

This is not only an intern problem. It exposes gaps in both the delivery system and the implementation.

### Intern-side gaps

- Success was simulated instead of verified against a real backend.
- The PR description overstated completed behaviour.
- Pseudo-tests were placed in production code.
- Unrelated files changed.
- Self-review stopped too early.
- Deployment was treated as proof of completion instead of one validation signal.

### Lead/process-side gaps

- The issue did not enforce a measurable self-review threshold.
- The acceptance criteria did not clearly separate frontend, backend, testing and deployment evidence.
- The intern was not required to provide a hosted preview before peer review.
- There was no formal evidence pack or accuracy scorecard.
- The learning path introduced several backend concepts at once without staged checkpoints.

The remediation therefore corrects both the feature and the process.

---

## 2. Required delivery path

```text
Issue and acceptance criteria
        ↓
Intern implementation branch
        ↓
Local validation
        ↓
Storybook and automated tests
        ↓
Hosted preview deployment
        ↓
Intern self-review and score
        ↓
75% minimum gate for peer review
        ↓
Peer feedback and correction
        ↓
90% expected final threshold
        ↓
Lead approval or intervention
```

The original PR must not be marked ready until this remediation branch produces evidence.

---

## 3. Accuracy thresholds

### Below 60% — foundational failure

The work is not ready for peer review.

Required response:

- stop feature expansion;
- identify misunderstood concepts;
- pair with a peer or lead;
- complete a smaller guided exercise;
- document what failed and why;
- revise the implementation plan.

### 60%–74% — partial implementation

The intern continues self-remediation.

Peer review is not yet requested.

Required evidence:

- updated checklist;
- screenshots;
- failed test notes;
- corrected commits;
- explanation of remaining gaps.

### 75%–89% — peer-review eligible

The intern may request peer review.

This means the feature is mostly correct, but not production-ready.

The intern must provide:

- hosted preview URL;
- self-scored rubric;
- tests and results;
- known limitations;
- before-and-after screenshots;
- exact commit SHA tested.

### 90%–100% — expected completion threshold

The feature is expected to be ready for lead review.

A score above 90% does not guarantee merge. It means all major requirements are implemented, tested, truthful and evidenced.

### Failure to reach 90% after peer review

This triggers intervention.

Required intervention evidence:

- interim documentation;
- peer-review notes;
- lead feedback;
- proof of attempted fixes;
- test output;
- deployment screenshots;
- additional learning resources used;
- explanation of why the intern remains blocked;
- decision on pairing, reassignment or scope reduction.

This is not punishment. It is a controlled escalation.

---

## 4. Contact feature scorecard

Score each area from 0 to 5.

| Area | Weight | 0 | 3 | 5 |
|---|---:|---|---|---|
| Requirement accuracy | 15% | Major requirements misunderstood | Most requirements implemented | All acceptance criteria implemented accurately |
| Frontend behaviour | 10% | Broken or misleading | Mostly functional | Fully functional and accessible |
| Backend persistence | 15% | No backend | Partial or unstable | Enquiries validated and persisted reliably |
| Truthful states | 10% | Fake success | Some correct states | Idle, sending, success and error are accurate |
| Validation | 10% | Empty checks only | Most validation present | Client and server validation complete |
| Automated tests | 10% | No real tests | Some tests | Unit, integration and E2E tests cover critical paths |
| Storybook coverage | 5% | None | Basic states | General, product, wholesale and failure states represented |
| Responsive/accessibility | 5% | Major defects | Acceptable | Keyboard, labels, errors and mobile verified |
| Scope discipline | 5% | Unrelated changes | Minor scope noise | Focused feature-only changes |
| Deployment evidence | 5% | No preview | Preview exists | Preview tested against exact commit |
| Documentation | 5% | Missing | Partial | Setup, architecture and known limitations documented |
| Self-review quality | 5% | Claims without proof | Basic checklist | Honest evidence-backed review |

### Score calculation

```text
Weighted score = sum of each area score ÷ 5 × its weight
```

The intern must calculate and publish the score before requesting review.

---

## 5. Required completed tasks

### Task A — Clean branch scope

- Restore unrelated `next-env.d.ts`, lockfile and shell changes unless justified.
- Remove pseudo-tests from production code.
- Confirm final diff is feature-focused.

Evidence:

```bash
git diff --stat origin/main...HEAD
git status
```

### Task B — Implement real backend flow

Required flow:

```text
Contact form → POST /api/contact → server validation → Supabase insert → response
```

No success state may appear before the API confirms persistence.

### Task C — Add truthful failure handling

Cover:

- invalid fields;
- malformed email;
- network failure;
- API failure;
- database failure;
- duplicate submission prevention.

### Task D — Storybook

At minimum maintain or add:

1. General enquiry state.
2. Wholesale state.
3. Product enquiry state.
4. Sending state.
5. Error state after backend integration.
6. Success state after backend integration.

### Task E — Tests

At minimum:

- validation unit tests;
- component interaction tests;
- API route tests;
- Cypress browser tests;
- one failed-backend test;
- one successful-persistence test.

### Task F — Hosted preview

Push the remediation branch:

```bash
git push -u origin remediation/kamohelo-contact
```

The repository's Vercel integration should create a branch preview.

The intern must test the preview, not only localhost.

### Task G — Visual evaluation

The intern must provide screenshots at:

- 375 × 812 mobile;
- 768 × 1024 tablet;
- 1366 × 768 desktop.

Screenshots must show:

- default form;
- wholesale form;
- validation errors;
- sending state;
- success state;
- failure state.

### Task H — Self-review statement

The intern must answer:

1. What did I originally misunderstand?
2. What did I change?
3. What test proves it works?
4. What still does not work?
5. What would break under real customer use?
6. What is my accuracy score and how did I calculate it?
7. Am I personally satisfied with the hosted preview? Why?

---

## 6. Required evidence pack

Create:

```text
docs/evidence/contact/
  self-review.md
  test-results.md
  deployment-check.md
  known-limitations.md
  screenshots/
```

The evidence pack must include:

- branch name;
- commit SHA;
- preview URL;
- test commands;
- test results;
- screenshots;
- accessibility observations;
- failed attempts and lessons;
- final accuracy score.

---

## 7. Lead responsibilities

The lead must:

- define acceptance criteria clearly;
- distinguish required work from stretch work;
- provide approved backend architecture boundaries;
- avoid changing expectations after implementation without documenting scope change;
- review evidence, not confidence;
- provide one consolidated review instead of fragmented corrections;
- intervene when the same conceptual error repeats;
- provide pairing or resources when the gap is instructional rather than effort-related;
- document why work is accepted, rejected or reassigned.

The lead must not:

- expect the intern to infer backend architecture from a visual issue;
- treat a green deployment as proof of correctness;
- merge work because it “looks fine”;
- rewrite the whole feature without first showing the intern the reasoning gap.

---

## 8. Technical skills being learned

- Next.js App Router boundaries.
- Client versus server code.
- API route design.
- Request and response contracts.
- Server-side validation.
- Supabase persistence.
- Environment-variable security.
- Error-state design.
- Idempotency and duplicate prevention.
- Unit, component, integration and E2E testing.
- Storybook state modelling.
- Cypress browser testing.
- Accessibility testing.
- Responsive verification.
- Git branch discipline.
- Focused commits.
- Deployment preview validation.
- Evidence-based pull requests.

---

## 9. Soft skills being learned

- Accurate reporting instead of optimistic reporting.
- Asking for clarification before inventing behaviour.
- Breaking complex work into stages.
- Self-review and metacognition.
- Receiving critique without defending incomplete work.
- Communicating risk and uncertainty.
- Time and scope management.
- Ownership of deployment outcomes.
- Documenting effort and failed attempts.
- Peer collaboration.
- Professional accountability.
- Knowing when to escalate.
- Distinguishing “I built it” from “I proved it works.”

---

## 10. Review gates

### Gate 1 — Local implementation

Required:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

### Gate 2 — Storybook

Required:

```bash
npm run storybook:ci
```

### Gate 3 — Cypress

Required:

```bash
npm run dev
npm run cypress:run
```

### Gate 4 — Hosted preview

Required:

- preview URL loads;
- no console errors;
- mobile, tablet and desktop checked;
- real contact submission verified in approved development storage;
- failure path deliberately tested.

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
- [ ] Real backend persistence is implemented.
- [ ] Fake success is removed.
- [ ] Storybook states are complete.
- [ ] Unit, integration and Cypress tests pass.
- [ ] Accessibility and responsive checks are documented.
- [ ] Evidence pack exists.
- [ ] Intern self-score is at least 75% before peer review.
- [ ] Final score is expected to be at least 90%.
- [ ] Any failure below 90% has an intervention record.
- [ ] Original PR is updated only after remediation evidence is reviewed.

---

## Core principle

```text
The intern does not submit confidence.
The intern submits evidence.
The lead does not review effort alone.
The lead reviews correctness, learning and proof.
```