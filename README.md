# EmpleaPlus — AI-Powered Resume Generator

<p align="center">Genera tu currículum profesional paso a paso con inteligencia artificial. Frontend moderno construido con React 19 + TypeScript + Vite.</p>

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-SWC-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix%20UI-Components-161618?logo=radixui&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?logo=zod&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.x-EC5990?logo=reacthookform&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white) ![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?logo=reactrouter&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Multi-Step Guided Form](#multi-step-guided-form)
  - [AI-Powered Resume Generation](#ai-powered-resume-generation)
  - [Inline Resume Editor](#inline-resume-editor)
  - [Resume Management (My CVs)](#resume-management-my-cvs)
  - [Authentication System](#authentication-system)
  - [Route Protection (AuthGuard)](#route-protection-authguard)
  - [Form Validation with Zod](#form-validation-with-zod)
  - [PDF Download](#pdf-download)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Pages & Routing](#pages--routing)
- [Feature Modules](#feature-modules)
- [Services Layer](#services-layer)
- [Custom Hooks](#custom-hooks)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Environment Configuration](#environment-configuration)
- [Code References](#code-references)
- [License](#license)
- [Authors](#authors)

---

## Overview

**EmpleaPlus** is a production-ready **Single Page Application (SPA)** built with **React 19**, **TypeScript**, and **Vite**, designed to simplify the process of creating a professional, AI-enhanced resume.

The application guides users through a **7-step form** that collects structured data about their personal information, education, work experience, skills, languages, certifications, and a professional summary. Once completed, this data is sent to a backend AI service that processes the inputs and returns a polished, structured resume. The user can then **review and fine-tune** every section inline before **downloading the final CV as a PDF**.

Users also have a personal **"My CVs" dashboard** where they can view, rename, preview, and delete all previously generated resumes.

The application follows a **feature-based architecture** with a clean separation between UI components, domain features, services, hooks, and routing — making it easy to maintain and extend.

---

## Key Features

### Multi-Step Guided Form

The **7-step wizard** (`ResumeFormFlow`) walks users through each section of the resume sequentially:

1. **Personal Data** — Full name, email, phone, and LinkedIn profile.
2. **Professional Summary** — A free-text summary of 20–600 characters.
3. **Education** — Institution, degree, start/end years, and optional notes (up to 4 entries).
4. **Work Experience** — Project name, role, achievements, teamwork, coordination, and presentation (up to 4 entries, AI-oriented questions).
5. **Skills** — Skill name and proficiency level: Básico, Intermedio, or Avanzado (up to 8 entries).
6. **Languages** — Language and CEFR level: A1–C2 (up to 4 entries).
7. **Certifications** — Course name, provider, year, and optional certificate URL (up to 4 entries).

Each step is self-contained, validates independently with Zod, and persists the user's data across navigation (Back/Next). A progress bar visually tracks completion.

### AI-Powered Resume Generation

Once the user completes all 7 steps, their data is **formatted and sent** to the backend's `POST /resume/generate` endpoint.

The utility `formatFormDataForBackend` normalizes the aggregated form state into a clean `ResumeRequest` payload. The AI backend processes this and returns a structured `ResumeResponse`, which is stored in `localStorage` and used to pre-fill the Resume Editor.

A **loading dialog with a spinner** is displayed while the AI processes the request, keeping users informed.

### Inline Resume Editor

After generation, users are directed to the **Summary Screen**, which hosts the `ResumeEditor` component. This component:

- Pre-loads the AI-generated result from `localStorage`.
- Renders all resume sections as **editable form fields** using `react-hook-form` and `FormProvider`.
- Validates the full resume with a unified Zod schema (`resumeSchema`).
- Allows modifications to every section: name, summary, contact, education, experience, skills, languages, and certifications.
- On submit, transforms the form data back into the `ResumeResponse` shape via `transformToResumeResponse`, then triggers the **PDF download**.

### Resume Management (My CVs)

The **ResumeListPage** presents a grid of all the user's saved resumes, each rendered as a `ResumeCard`. Each card exposes:

- **View / Edit** — Loads the resume into the editor for review and re-download.
- **Rename** — Opens an inline dialog with a text input to update the filename.
- **Delete** — Permanently removes the resume with confirmation toasts.

Actions communicate with the backend via the `resumeService` and optimistically update the UI, keeping the state consistent.

### Authentication System

EmpleaPlus includes a full **JWT-based auth flow**:

- **Login** (`POST /auth/login`) — Receives a JWT `access_token` and stores it in `localStorage`.
- **Register** (`POST /auth/register`) — Creates a new account.
- **Reset Password** (`PUT /auth/reset-password`) — Allows authenticated users to change their password.

The `useAuth` hook encapsulates all auth state and operations (`login`, `register`, `logout`) and exposes an `isAuthenticated` flag derived from the presence/absence of the stored token.

The Axios instance (`api.ts`) dynamically injects the `Authorization: Bearer <token>` header on every non-public request via an **interceptor**, so services are completely token-aware with no manual header manipulation.

### Route Protection (AuthGuard)

All internal pages are wrapped in an `AuthGuard` component that:

1. Reads the `isAuthenticated` state from `useAuth`.
2. Shows a loading indicator while the auth state initializes.
3. **Redirects unauthenticated users** to `/login` via React Router's `<Navigate />`.
4. Renders the protected content (`AuthenticatedLayout` with `Sidebar`) for authenticated users.

### Form Validation with Zod

Every feature module has its own **Zod schema** that defines field-level validation rules:

| Section | Constraints |
|---|---|
| Personal | Required name (≤100 chars), valid email, phone (≤30 chars), valid LinkedIn URL |
| Summary | Free text, 20–600 characters |
| Education | Institution & degree required (≤100 chars), 4-digit year ≥1900, optional notes (≤300 chars); 1–4 entries |
| Experience | 6 narrative fields, each required (≤300 chars); 1–4 entries |
| Skills | Skill name (≤50 chars), level: Básico/Intermedio/Avanzado; 1–8 entries |
| Languages | Language name required, CEFR level (A1–C2); 1–4 entries |
| Certifications | Course (≤100 chars), provider (≤100 chars), 4-digit year in range, optional URL (≤300 chars); 1–4 entries |

All schemas are colocated with their feature modules and use `zodResolver` from `@hookform/resolvers` for seamless integration with `react-hook-form`.

### PDF Download

After the user finalizes their resume in the `ResumeEditor`, the **"Generar CV final"** button triggers a `POST /resume/download-pdf` request with `responseType: "blob"`. The response blob is converted into an object URL and a programmatic `<a>` click initiates the browser download of the `cv.pdf` file, with proper cleanup of the object URL afterward.

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 5.x |
| Build Tool | Vite + SWC plugin |
| Styling | TailwindCSS 4.x |
| Component Primitives | Radix UI (Checkbox, Dialog, Label, Popover, Progress, RadioGroup, Select, Slot, Tooltip) |
| Form Management | React Hook Form 7.x |
| Schema Validation | Zod 3.x |
| HTTP Client | Axios 1.x |
| Routing | React Router DOM v7 |
| Toast Notifications | Sonner |
| Date Utilities | date-fns + react-day-picker |
| Icons | Lucide React |
| Theming | next-themes |
| Testing Framework | Vitest |
| Testing Utilities | @testing-library/react, @testing-library/jest-dom, @testing-library/user-event |
| Test Environment | jsdom |

---

## Project Structure

```
emplea-plus/
├── public/                      # Static assets
├── src/
│   ├── App.tsx                  # Root component (Router + Toaster)
│   ├── main.tsx                 # React entry point
│   │
│   ├── assets/                  # Images & SVGs (hero illustration)
│   │
│   ├── components/
│   │   ├── auth/                # Auth forms (Login, Register, ResetPassword)
│   │   ├── form/
│   │   │   ├── FormIntroMessage.tsx   # Welcome screen before the form starts
│   │   │   └── ResumeFormFlow.tsx     # 7-step form wizard orchestrator
│   │   ├── resume/
│   │   │   └── ResumeCard.tsx         # Card for each saved resume (view/rename/delete)
│   │   ├── shared/
│   │   │   ├── Sidebar.tsx            # Authenticated navigation sidebar
│   │   │   └── WelcomeHeader.tsx      # Public landing page header
│   │   ├── summary/
│   │   │   ├── ResumeEditor.tsx       # Full inline resume editor + PDF download
│   │   │   ├── schemas/               # Unified Zod schema for the editor
│   │   │   └── sections/              # Individual editable sections (contact, education, etc.)
│   │   └── ui/                        # shadcn/ui primitives (button, input, card, etc.)
│   │
│   ├── constants/
│   │   ├── formBlueprint.ts     # Static field definitions for the form
│   │   └── formSchemas.ts       # Aggregated schema constants
│   │
│   ├── features/                # Domain-driven feature modules
│   │   ├── personal/            # schema.ts · model.ts · PersonalForm.tsx · index.tsx
│   │   ├── summary/             # schema.ts · SummarySection.tsx · index.tsx
│   │   ├── education/           # schema.ts · EducationSection.tsx · index.tsx
│   │   ├── experience/          # schema.ts · fields.ts · ExperienceSection.tsx · index.tsx
│   │   ├── skills/              # schema.ts · SkillsSection.tsx · index.tsx
│   │   ├── languages/           # schema.ts · model.ts · LanguagesSection.tsx · index.tsx
│   │   └── certifications/      # schema.ts · model.ts · fields.ts · CertificationsSection.tsx · index.tsx
│   │
│   ├── guards/
│   │   └── AuthGuard.tsx        # Redirects unauthenticated users to /login
│   │
│   ├── hooks/
│   │   ├── useAuth.ts           # Auth state + login/register/logout
│   │   └── useStepForm.ts       # Step counter utility (next/prev with bounds)
│   │
│   ├── layouts/
│   │   └── AuthenticatedLayout.tsx  # Sidebar + <Outlet> wrapper
│   │
│   ├── lib/
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   │
│   ├── models/
│   │   ├── resume.ts            # TypeScript interfaces: ResumeRequest, ResumeResponse, ResumeReference
│   │   └── user.ts              # AuthResponse interface
│   │
│   ├── pages/
│   │   ├── WelcomeScreen.tsx    # Public landing page
│   │   ├── LoginPage.tsx        # Login page
│   │   ├── RegisterPage.tsx     # Registration page
│   │   ├── MenuPage.tsx         # Menu page
│   │   ├── FormScreen.tsx       # Multi-step form page
│   │   ├── SummaryScreen.tsx    # AI-generated resume review & editor
│   │   ├── ResumeListPage.tsx   # "My CVs" dashboard
│   │   └── ResetPasswordPage.tsx# Password change page
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx        # Centralized route definitions
│   │
│   ├── services/
│   │   ├── api.ts               # Axios instance + JWT interceptor
│   │   ├── authService.ts       # login · register · resetPassword
│   │   └── resumeService.ts     # generateResume · downloadResumePdf · getUserResumes · getResumeById · deleteResume · renameResume
│   │
│   └── utils/
│       └── formatFormDataForBackend.ts  # Data transformation utilities
│
└── tests/
    ├── setup.ts                 # jest-dom import
    ├── components/auth/         # LoginForm · RegisterForm · ResetPasswordForm tests
    ├── features/                # Section tests (certifications, education, experience, languages, personal, skills, summary)
    ├── guards/                  # AuthGuard.test.tsx
    ├── hooks/                   # useAuth.test.ts · useStepForm.test.ts
    └── services/                # authService.test.ts · resumeService.test.ts
```

---

## Pages & Routing

Routes are defined centrally in `AppRoutes.tsx` using React Router DOM v7.

```
/                     → WelcomeScreen       (public)
/login                → LoginPage           (public)
/register             → RegisterPage        (public)

/form                 → FormScreen          (protected)
/summary              → SummaryScreen       (protected)
/resumes              → ResumeListPage      (protected)
/reset-password       → ResetPasswordPage   (protected)
```

Protected routes are wrapped in `<AuthGuard>` + `<AuthenticatedLayout>`. The layout renders a persistent `Sidebar` on the left and an `<Outlet>` for the active page on the right.

---

## Feature Modules

Each feature under `src/features/` is a self-contained domain module:

| Module | Form Section | Key Constraints |
|---|---|---|
| `personal` | Step 1 — Personal Data | fullName, email, phone, linkedin — all required |
| `summary` | Step 2 — Professional Summary | Free text, 20–600 chars |
| `education` | Step 3 — Education | Institution, degree, years; 1–4 entries |
| `experience` | Step 4 — Experience | 6 narrative fields per entry; 1–4 entries |
| `skills` | Step 5 — Skills | Name + Básico/Intermedio/Avanzado; 1–8 entries |
| `languages` | Step 6 — Languages | Language + A1–C2 CEFR level; 1–4 entries |
| `certifications` | Step 7 — Certifications | Course, provider, year, optional URL; 1–4 entries |

Each module exports its section component via `index.tsx`, keeping imports in `ResumeFormFlow` clean and discoverable.

---

## Services Layer

### `api.ts` — Axios Instance

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});
```

A **request interceptor** automatically injects `Authorization: Bearer <token>` for all non-public routes (any route that is not `/auth/login` or `/auth/register`).

### `authService.ts`

| Function | Method | Endpoint |
|---|---|---|
| `login(email, password)` | POST | `/auth/login` |
| `register(email, password)` | POST | `/auth/register` |
| `resetPassword(oldPassword, newPassword)` | PUT | `/auth/reset-password` |

### `resumeService.ts`

| Function | Method | Endpoint | Description |
|---|---|---|---|
| `generateResume(data)` | POST | `/resume/generate` | Sends form data; receives AI-generated resume |
| `downloadResumePdf(data)` | POST | `/resume/download-pdf` | Returns a PDF blob |
| `getUserResumes()` | GET | `/resume` | Lists all user resumes |
| `getResumeById(id)` | GET | `/resume/:id` | Fetches a specific resume |
| `deleteResume(id)` | DELETE | `/resume/:id` | Deletes a resume |
| `renameResume(id, filename)` | PUT | `/resume/:id/rename` | Updates the resume's filename |

---

## Custom Hooks

### `useAuth`

Centralizes authentication state and operations:

```typescript
const { token, isAuthenticated, loading, login, register, logout } = useAuth();
```

- Reads the JWT from `localStorage` on mount.
- `login()` stores the returned `access_token` in `localStorage` and updates state.
- `logout()` clears `localStorage` (token + resumeResult) and resets state.
- `loading` flag prevents flash-of-unauthenticated-content during initialization.

### `useStepForm`

A minimal step counter utility:

```typescript
const { step, next, prev } = useStepForm(maxSteps);
```

- Clamps `next()` at `maxSteps` and `prev()` at `1`.
- Used as a utility reference; `ResumeFormFlow` manages its own step state directly.

---

## Running the Application

**1. Install dependencies**

```bash
npm install
```

**2. Configure environment variables**

Create a `.env` file at the project root (see [Environment Configuration](#environment-configuration)).

**3. Start the development server**

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Building for Production

```bash
npm run build
```

This runs TypeScript compilation followed by Vite's optimized build. Output is placed in the `dist/` folder.

**Preview the production build locally:**

```bash
npm run preview
```

---

## Testing

### Run all tests

```bash
npm test
```

### Watch mode

```bash
npm run test:watch
```

### Coverage report

```bash
npm run test:coverage
```

Coverage reports are generated as both plain text (terminal) and HTML (`coverage/` directory).

### Test structure

| Folder | What is tested |
|---|---|
| `tests/components/auth/` | LoginForm, RegisterForm, ResetPasswordForm rendering & submission |
| `tests/features/` | Each feature section (personal, summary, education, experience, skills, languages, certifications) |
| `tests/guards/` | AuthGuard redirect logic |
| `tests/hooks/` | `useAuth` state management, `useStepForm` step navigation |
| `tests/services/` | `authService` and `resumeService` API call assertions |

Tests use **Vitest** with `jsdom` as the environment, `@testing-library/react` for component rendering, and `vi.mock` for API mocking.

---

## Environment Configuration

Create a `.env` file at the root of the project:

```env
VITE_BACKEND_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API (AI resume service) |

This follows Vite's convention for environment variables — only variables prefixed with `VITE_` are exposed to client-side code.

For production deployments, configure this variable in your hosting environment (e.g., Vercel, Netlify, Cloud Run, etc.) and never commit secrets to version control.

---

## Code References

- Application entry point: [src/main.tsx](src/main.tsx)
- Root component with router: [src/App.tsx](src/App.tsx)
- Route definitions: [src/routes/AppRoutes.tsx](src/routes/AppRoutes.tsx)
- Axios instance + interceptor: [src/services/api.ts](src/services/api.ts)
- Authentication service: [src/services/authService.ts](src/services/authService.ts)
- Resume service: [src/services/resumeService.ts](src/services/resumeService.ts)
- Auth hook: [src/hooks/useAuth.ts](src/hooks/useAuth.ts)
- Auth guard: [src/guards/AuthGuard.tsx](src/guards/AuthGuard.tsx)
- Authenticated layout: [src/layouts/AuthenticatedLayout.tsx](src/layouts/AuthenticatedLayout.tsx)
- Multi-step form orchestrator: [src/components/form/ResumeFormFlow.tsx](src/components/form/ResumeFormFlow.tsx)
- Inline resume editor: [src/components/summary/ResumeEditor.tsx](src/components/summary/ResumeEditor.tsx)
- Resume list page: [src/pages/ResumeListPage.tsx](src/pages/ResumeListPage.tsx)
- Resume card component: [src/components/resume/ResumeCard.tsx](src/components/resume/ResumeCard.tsx)
- Data transformation utilities: [src/utils/formatFormDataForBackend.ts](src/utils/formatFormDataForBackend.ts)
- TypeScript models: [src/models/resume.ts](src/models/resume.ts)
- Vite configuration: [vite.config.ts](vite.config.ts)

---

## License

This project is licensed under the MIT License.

---

## Authors

<table align="center">
  <tr>
    <td align="center" style="padding:20px;">
      <a href="https://github.com/HugoAlejandro2002">
        <img src="https://avatars.githubusercontent.com/u/97768733?v=4"
             width="90"
             alt="HugoAlejandro"
             style="border-radius:50%" />
        <br />
        <sub><b>Hugo Alejandro</b></sub>
      </a>
      <br />
      <span style="font-size:13px; font-weight:600;">Author</span>
      <br />
      <span style="font-size:13px;">Backend & AI Developer · Automation Developer · Cloud Engineer</span>
      <br /><br />
      <a href="https://www.linkedin.com/in/alejandro-apaza2002/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/HugoAlejandro2002">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

