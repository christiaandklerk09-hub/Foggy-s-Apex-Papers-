# Foggy's Apex Papers

A web-based exam-practice app for Grade 12 learners, built with Next.js. The app presents bundled papers as interactive quizzes and study tools.

## Subjects and papers

Bundled paper and test data currently covers Economics, Business Studies, Accounting, Mathematical Literacy, English, and Afrikaans. The data includes multiple-choice practice tests and selected past-paper content.

## Features

- Select and work through practice papers, with question and option shuffling.
- Review quiz results, navigate questions, and save study progress and exam attempts.
- Use user profiles with local persistence and Firebase/Firestore synchronization.
- Use math-answer evaluation, scratchpad, and subject-specific answer/study tools.
- Use admin question-editing and paper-ingestion tools, plus Google Drive sync.
- Installable/offline-related UI for supported browsers and devices.

## Tech stack

- Next.js 15, React 19, and TypeScript
- Firebase and Cloud Firestore
- Google Gemini / Google AI SDK for AI-backed routes
- Tailwind CSS

## Local development

Use a recent Node.js version and npm. From the repository root:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The development server listens on port 3000. Configure the values in `.env.local` before using Firebase or Gemini-backed features. The required variable names are:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `GEMINI_API_KEY`

Do not commit `.env.local` or real credentials.

Useful scripts:

- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm start` - serve the production build

## Repository layout

- `app/` - Next.js pages and API routes
- `components/` - quiz, study, account, and admin UI
- `lib/` and `types/` - quiz data, application logic, and TypeScript types
- `firestore.rules` - Firestore security rules
- `scripts/` - build and maintenance scripts

## Notes

This README describes the features and configuration represented in the current source tree. Confirm Firebase rules, API permissions, and deployment settings in the target environment before publishing the app.
