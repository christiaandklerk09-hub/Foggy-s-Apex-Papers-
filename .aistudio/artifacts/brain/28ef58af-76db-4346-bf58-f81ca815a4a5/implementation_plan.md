# Implementation Plan: Fix AI Tutor & Enable Step-by-Step DBE Guidance

Restore and enhance the AI Exam Tutor across all Grade 12 subjects by upgrading model routing to supported Gemini models, supporting both automatic appearance on incorrect answers and an on-demand tutor button, and providing structured step-by-step DBE marking memorandum guidance.

---

## 1. User Review Required

> [!IMPORTANT]
> - **Model Upgrade**: Replaces obsolete `gemini-2.0-flash` and `gemini-1.5-flash` with active models `gemini-3.1-flash-lite` and `gemini-3.8-flash` in `/app/api/gemini/tutor/route.ts` and `/app/api/gemini/translate/route.ts`.
> - **Dual Tutor Triggers**: The AI Tutor will automatically appear whenever a student's answer is marked incorrect, and will also be instantly summonable on-demand via an "Ask AI Tutor" button next to question actions.
> - **Step-by-Step DBE Memo Format**: Responses will clearly distinguish (1) why the chosen answer had an error, (2) the core DBE syllabus concept, and (3) step-by-step marking method.

---

## 2. Proposed Architecture & Component Updates

### A. Gemini Server Route Upgrades (`app/api/gemini/tutor/route.ts`)
- **Active Model Pipeline**:
  - Primary: `gemini-3.1-flash-lite` (sub-second latency, zero deprecation 404s).
  - Secondary fallback: `gemini-3.8-flash`.
- **System Prompt Refinement**:
  - Tailored to South African DBE standards across Economics, Business Studies, Accounting, Maths Lit, and Languages.
  - Strict step-by-step breakdown structure:
    1. *Misconception Analysis*: Direct, encouraging explanation of where the student's reasoning deviated.
    2. *DBE Rule / Memorandum Principle*: Official curriculum guideline.
    3. *Methodology & Formula Step*: Step-by-step calculation or deduction to arrive at the correct answer.

### B. Gemini Translation Route (`app/api/gemini/translate/route.ts`)
- Upgrade model array to `['gemini-3.1-flash-lite', 'gemini-3.8-flash']` to ensure multilingual question translation also operates without 404 errors.

### C. Question Card Integration (`components/QuestionCard.tsx`)
- Allow the tutor panel to open both:
  - **Automatically** when `isAnswerIncorrect` is true.
  - **On-Demand** when the student taps the "Ask AI Tutor" button (even before answering, to request concept hints).
- Provide an explicit toggle button in the card header / answer studio: `Ask AI Tutor` with a graduation cap icon.

### D. Tutor Feedback Interface (`components/TutorFeedback.tsx`)
- Display structured step-by-step guidance cards with light red academic styling (`#fff5f5`, soft rose borders `border-rose-200`, red margin line, crimson highlights).
- Include a quick retry prompt and dismiss button.

---

## 3. Verification Plan

### Automated Build & Lint Verification
1. `compile_applet` — verify Next.js builds without server/client compilation errors.
2. `lint_applet` — ensure 0 ESLint warnings or errors.

### Functional Verification
- Test direct API call to `/api/gemini/tutor` to confirm successful 200 response with generated text.
- Verify tutor auto-opens on incorrect answer submission.
- Verify tutor button opens on-demand for concept guidance.
