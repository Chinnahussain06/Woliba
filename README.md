<div align="center">
  <img src="./src/assets/images/wolibaLogo.png" width="200" />

  <h1>Woliba Frontend</h1>

  <p>A multi-step user registration web application for the <strong>Woliba</strong> wellness platform. Built with React 19, Vite, Material UI, and Redux Toolkit, it guides new employees through a structured onboarding flow — from company verification to personalised wellness preferences.</p>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI_v9-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-FF4154?style=for-the-badge&logo=javascript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![DayJS](https://img.shields.io/badge/Day.js-FF5F4C?style=for-the-badge&logo=javascript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Lato](https://img.shields.io/badge/Lato_Font-000000?style=for-the-badge&logo=google-fonts&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Registration Flow](#registration-flow)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Available Scripts](#available-scripts)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Routing & Guards](#routing--guards)
- [Error Handling](#error-handling)
- [Component Library](#component-library)
- [Testing](#testing)

---

## Overview

Woliba is a corporate wellness platform. This frontend handles the complete **user registration journey**, broken into 7 sequential steps with guard-based navigation to ensure users cannot skip ahead in the flow. A 10-minute session timer begins after OTP verification to enforce timely completion of registration.

---

## Screenshots

| Step 1 — Company Verification                                           | Step 2 — User Details                                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------- |
| ![Company Verification](./docs/screenshots/01-company-verification.png) | ![User Details](./docs/screenshots/02-user-details.png) |

| Step 3 — OTP Verification                                       | Step 4 — Login Credentials                                        |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![OTP Verification](./docs/screenshots/03-otp-verification.png) | ![Login Credentials](./docs/screenshots/04-login-credentials.png) |

| Step 5 — Wellness Selector                                        | Step 6 — Wellbeing Pillars                                        |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![Wellness Selector](./docs/screenshots/05-wellness-selector.png) | ![Wellbeing Pillars](./docs/screenshots/06-wellbeing-pillars.png) |

| Step 7 — Welcome                              |
| --------------------------------------------- |
| ![Welcome](./docs/screenshots/07-welcome.png) |

---

## Tech Stack

| Category           | Technology                     |
| ------------------ | ------------------------------ |
| Framework          | React 19                       |
| Build Tool         | Vite 6                         |
| UI Library         | Material UI (MUI) v9           |
| State Management   | Redux Toolkit + React-Redux    |
| Routing            | React Router DOM v7            |
| Forms & Validation | Formik + Yup                   |
| HTTP Client        | Axios                          |
| Date Handling      | Day.js + MUI X Date Pickers    |
| Error Boundaries   | react-error-boundary           |
| Testing            | Vitest + React Testing Library |
| Fonts              | Lato (@fontsource/lato)        |

---

## Project Structure

```
src/
├── App.jsx                        # Root component — Suspense + route rendering
├── AppErrorBoundary.jsx           # Top-level error boundary (react-error-boundary)
├── main.jsx                       # Entry point — Redux, MUI theme, Router providers
│
├── assets/
│   ├── images/                    # Logo, background, loader video (Loader.mp4)
│   └── theme/
│       ├── base/palette.js        # Brand colour tokens
│       ├── base/typography.js     # Font configuration
│       └── index.js               # MUI theme composition
│
├── components/                    # Reusable MD-prefixed UI components
│   ├── MDAlert/                   # Alert/notification component
│   ├── MDButton/                  # Styled button (contained, outlined, text variants)
│   ├── MDDatePicker/              # MUI X DatePicker with Day.js adapter & Formik support
│   ├── MDFormCard/                # Glassmorphism card wrapper for every registration step
│   ├── MDFormField/               # MUI TextField wired to Formik's Field + error display
│   ├── MDLoader/                  # Full-screen animated loader using Loader.mp4
│   ├── MDLoadingButton/           # MDButton with CircularProgress loading state
│   └── MDTypography/              # MUI Typography with default variant/colour props
│
├── hooks/
│   └── useRegistrationTimer.js    # Countdown timer hook — detects 10-min deadline expiry
│
├── layouts/
│   ├── DashboardLayout/           # Outer layout shell (full-screen background)
│   ├── DashboardNavbar/           # Top navigation bar with Woliba logo
│   └── Footer/                   # Page footer
│
├── pages/
│   ├── CompanyVerification/       # Step 1 — verify company name & password
│   │   ├── index.jsx
│   │   └── schema.js              # Yup validation schema
│   ├── UserDetailsVerification/   # Step 2 — collect first name, last name & email; send OTP
│   │   ├── index.jsx
│   │   └── schema.js
│   ├── OtpVerification/           # Step 3 — 6-digit OTP entry with resend + countdown timer
│   │   └── index.jsx
│   ├── LoginCredentials/          # Step 4 — set password, DOB, phone, work anniversary, policy
│   │   ├── index.jsx
│   │   └── schema.js
│   ├── WellnessSelector/          # Step 5 — choose wellness interests (fetched from API)
│   │   ├── index.jsx
│   │   └── components/
│   │       └── InterestsSkeleton.jsx
│   ├── WellBeingPillars/          # Step 6 — select up to 3 wellbeing pillars (fetched from API)
│   │   ├── index.jsx
│   │   └── components/
│   │       └── PillarsSkeleton.jsx
│   └── welcome/                   # Step 7 — registration complete / welcome screen
│       └── index.jsx
│
├── redux/
│   ├── api/api.js                 # Axios instance — base URL driven by VITE_API_BASE_URL
│   ├── hooks.js                   # Typed useAppDispatch / useAppSelector
│   ├── store.js                   # Redux store with registration reducer
│   ├── selectors/
│   │   └── registrationSelectors.js  # All state selectors (plain functions, not memoised)
│   ├── slices/
│   │   ├── registrationSlice.js   # Full registration state, reducers & extraReducers
│   │   └── registrationSlice.test.js
│   └── thunks/
│       └── registrationThunks.js  # All async API thunks with centralised error extraction
│
├── routes/
│   ├── registrationRoutes.jsx     # Route definitions — lazy-loaded pages with guard config
│   └── RouteGuard.jsx             # Unified guard — redirects when a Redux selector is falsy
│
├── styles/
│   └── index.css                  # Global styles & CSS resets
│
└── utils/
    └── validator.js               # Shared validation helpers
```

---

## Registration Flow

The onboarding is a strictly ordered, 7-step flow. Each step is guarded — users who attempt to navigate directly to a later step are redirected to the appropriate earlier step.

```
/register/company-verification          (Step 1 — entry point, no guard)
        ↓  Company ID confirmed
/register/user-details-verification    (Step 2 — requires: companyId)
        ↓  OTP dispatched to email
/register/otp-verification             (Step 3 — requires: email)
        ↓  OTP verified; 10-min timer starts
/register/login-credentials            (Step 4 — requires: otpVerified)
        ↓
/register/wellness-selector            (Step 5 — requires: otpVerified)
        ↓
/register/wellbeing-pillars            (Step 6 — requires: otpVerified; max 3 pillars)
        ↓  Registration submitted
/welcome                               (Step 7 — requires: registrationComplete)
```

Any unknown route redirects to `/register/company-verification`.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Woliba

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root and set your API URL:

```bash
VITE_API_BASE_URL=https://dev.api.woliba.io/v1
```

### Running Locally

```bash
npm run dev
```

The app starts on **http://localhost:3000**. In development, API calls to `/v1/*` are proxied to `https://dev.api.woliba.io`, so no CORS configuration is needed.

### Production Build

```bash
npm run build
```

Output is written to the `dist/` directory.

---

## Environment & Configuration

The API base URL is driven by the `VITE_API_BASE_URL` environment variable:

| Mode          | Base URL                                                           |
| ------------- | ------------------------------------------------------------------ |
| `development` | `/v1` (proxied via Vite dev server to `https://dev.api.woliba.io`) |
| `production`  | Value of `VITE_API_BASE_URL`                                       |

To disable Hot Module Replacement (e.g. in Docker or CI):

```bash
DISABLE_HMR=true npm run dev
```

---

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start development server on port 3000 |
| `npm run build` | Build for production                  |
| `npm run clean` | Remove the `dist/` directory          |
| `npm run lint`  | Run ESLint across `src/`              |
| `npm test`      | Run unit tests with Vitest            |

>
> ```json
> "test:ui": "vitest --ui",
> "test:coverage": "vitest run --coverage"
> ```

---

## State Management

All registration state lives in a single Redux slice (`registrationSlice`). The slice tracks:

- **Company**: `companyId`, `company_Name`
- **User details**: `email`, `fName`, `lName`
- **OTP**: `otpToken`, `otpVerified`
- **Session timer**: `registrationDeadline` (Unix timestamp, 10 minutes from OTP verification; reset to `null` on OTP resend or registration complete)
- **Profile**: `password`, `birthday`, `phone_number`, `accepted_privacy_policy`
- **Wellness interests**: `interests` (all), `selectedInterests` (user picks — unlimited)
- **Wellbeing pillars**: `pillars` (all), `selectedPillars` (user picks, max 3)
- **Completion**: `authToken`, `registrationComplete`
- **Async state**: `status`, `resendStatus`, `error`, `resendError`

### Key Reducers

| Reducer                       | Behaviour                                                                |
| ----------------------------- | ------------------------------------------------------------------------ |
| `toggleInterest(id)`          | Adds or removes an interest from `selectedInterests`                     |
| `togglePillar(id)`            | Adds or removes a pillar; ignores additions when 3 are already selected  |
| `clearError()`                | Clears both `error` and `resendError`                                    |
| `resetRegistration()`         | Resets all state to initial values, preserving `interests` and `pillars` |
| `setRegistrationDeadline()`   | Sets deadline to `Date.now() + 10 minutes`                               |
| `clearRegistrationDeadline()` | Sets `registrationDeadline` to `null`                                    |

### Key Selectors

| Selector                     | Used as guard condition at |
| ---------------------------- | -------------------------- |
| `selectCompanyId`            | Steps 2 & 3                |
| `selectOtpVerified`          | Steps 4, 5 & 6             |
| `selectRegistrationComplete` | Step 7 (welcome)           |

The full selector list in `registrationSelectors.js` also exposes: `selectEmail`, `selectFirstName`, `selectLastName`, `selectOtpToken`, `selectRegistrationDeadline`, `selectPassword`, `selectDob`, `selectPhoneNumber`, `selectWorkAnniversary`, `selectAcceptedPrivacyPolicy`, `selectInterests`, `selectSelectedInterests`, `selectPillars`, `selectSelectedPillars`, `selectAuthToken`, `selectStatus`, `selectResendStatus`, `selectIsLoading`, `selectIsResendLoading`, `selectError`, `selectResendError`, and the composite `selectRegistrationPayload` (builds the full `/user-registration` POST body from state).

---

## API Integration

All HTTP calls go through a shared Axios instance (`src/redux/api/api.js`). Async operations are implemented as Redux Thunks in `registrationThunks.js`, all using a shared `getErrorMessage` helper that extracts the most specific error message from the Axios error response.

| Thunk                | Method | Endpoint                                                          |
| -------------------- | ------ | ----------------------------------------------------------------- |
| `verifyCompany`      | POST   | `/verify-by-company-name-and-password`                            |
| `saveUserDetails`    | POST   | `/save-user-details-and-send-otp`                                 |
| `verifyOtp`          | POST   | `/verify-otp-for-user-registration`                               |
| `resendOtp`          | POST   | `/send-otp-for-user-registration`                                 |
| `fetchInterests`     | GET    | `/viewWellnessInterest`                                           |
| `fetchPillars`       | GET    | `/get-wellbeing-pillars/:languageId` (defaults to `languageId=1`) |
| `submitRegistration` | POST   | `/user-registration`                                              |

---

## Routing & Guards

Route protection is handled by a single **`RouteGuard`** component (`src/routes/RouteGuard.jsx`). Each route in `registrationRoutes.jsx` can declare an optional `condition` (a Redux selector) and a `redirectTo` path. `RouteGuard` calls `useAppSelector(condition)` and redirects if the result is falsy. Routes without a `condition` (currently only Step 1) are always accessible.

All pages are **lazy-loaded** via `React.lazy` and `Suspense`, with a full-screen `MDLoader` as the fallback while the chunk is loading.

---

## Error Handling

A global **`AppErrorBoundary`** component (`src/AppErrorBoundary.jsx`) wraps the entire application in `main.jsx`, using `react-error-boundary`. If any component in the tree throws an unexpected render error, the boundary catches it and displays a fallback UI with two options — **Try Again** (calls `resetErrorBoundary`, which redirects to `/`) and **Go Home** (hard navigates to `/`).

```
main.jsx
└── Provider (Redux)
    └── ThemeProvider (MUI)
        └── BrowserRouter
            └── AppErrorBoundary        ← catches any render error
                └── App
                    └── Suspense (fallback: MDLoader)
                        └── Routes (all 7 steps, each wrapped in RouteGuard)
```

---

## Component Library

Custom components are prefixed with `MD` (Material Design) and wrap MUI primitives with app-specific defaults:

- **MDButton** — themed button supporting `contained`, `outlined`, and `text` variants, with hover/active micro-interactions and disabled styling
- **MDLoadingButton** — wraps `MDButton`; shows a `CircularProgress` spinner and custom `loadingText` during async operations
- **MDFormField** — MUI `TextField` wired to Formik's `<Field>`, with custom label rendering (including required asterisk), error state, and consistent border/focus styling
- **MDDatePicker** — MUI X `DatePicker` with Day.js (`en-gb` locale), Formik `ErrorMessage` integration, hidden calendar icon, and fully styled popover (rounded corners, custom action bar)
- **MDFormCard** — glassmorphism `Paper` card (blur + translucent background) used as the container for every registration step; accepts `title`, `subtitle`, and `maxWidth`
- **MDAlert** — dismissable alert for API error messages
- **MDLoader** — full-screen loader overlay using the branded `Loader.mp4` video
- **MDTypography** — MUI `Typography` with default `variant` and `colour` props

---

## Testing

Tests are written with **Vitest** and **React Testing Library**. Test files live alongside the code they test.

### Running Tests

```bash
# Run all tests
npm test
```

### Current Test Coverage

| File                                         | What is tested                                                    |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `src/redux/slices/registrationSlice.test.js` | Pillar limit enforcement (max 3), error clearing via `clearError` |

### Suggested Test Structure

```
src/
├── redux/
│   ├── slices/registrationSlice.test.js      ✅ exists

```
