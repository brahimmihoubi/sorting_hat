# SDG Sorting Hat

A Harry Potter-inspired department sorting web application built for **Setif Developers Group (SDG)**. The system guides participants through a personalized questionnaire and assigns them to one of four departments — Development, Design, Events, or Social Media — based on their responses and a weighted scoring algorithm.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Modes](#application-modes)
- [Screens and Navigation Flow](#screens-and-navigation-flow)
- [Frontend Functions Reference](#frontend-functions-reference)
  - [ClientApp](#clientapp)
  - [AdminApp](#adminapp)
  - [API Service (ApiService)](#api-service-apiservice)
  - [Sound Engine (SoundEngine)](#sound-engine-soundengine)
  - [Admin Dashboard (Screen9AdminDashboard)](#admin-dashboard-screen9admindashboard)
- [Components](#components)
- [Data Layer](#data-layer)
- [Backend Integration](#backend-integration)
- [Environment and Configuration](#environment-and-configuration)

---

## Overview

The SDG Sorting Hat is a full-featured single-page application (SPA) that simulates a magical sorting ceremony for club recruitment. It provides:

- A multi-step onboarding flow for new participants including personal information collection and a structured questionnaire.
- An animated sorting sequence that computes department affinity scores and reveals the result.
- A read-only member profile page displaying the participant's assigned department.
- An Event Mode screen for live recruitment sessions.
- A mobile-optimized flow for on-device QR scan registration.
- A protected Admin Portal with real-time statistics, participant management, and API management views for departments, questions, and scoring rules.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 7 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 13, React Spring 10 |
| Icons | Lucide React |
| Confetti | canvas-confetti |
| Audio | Web Audio API (custom SoundEngine) |
| HTTP Client | Fetch API (custom ApiService wrapper) |
| State Persistence | localStorage |
| Backend | FastAPI (external, at `http://localhost:8000/api`) |

---

## Project Structure

```
sorting_hat/
├── index.html                  # HTML entry point; routes /admin to AdminApp
├── vite.config.ts              # Vite configuration with multi-page entry points
├── package.json
├── tsconfig.json
└── src/
    ├── main.tsx                # React root; mounts ClientApp or AdminApp by route
    ├── App.tsx                 # Root app shell
    ├── ClientApp.tsx           # Main participant-facing application
    ├── AdminApp.tsx            # Admin portal application
    ├── index.css               # Global styles and Tailwind directives
    ├── assets/                 # Static asset registry (logo, audio, avatars)
    ├── components/             # Reusable UI components
    │   ├── ApiConnectorModal.tsx
    │   ├── DepartmentHeraldicCard.tsx
    │   ├── GoldenHatButton.tsx
    │   ├── JoinModal.tsx
    │   ├── MagicalBackground.tsx
    │   ├── Navbar.tsx
    │   ├── ScreenSwitcherBar.tsx
    │   └── WizardStepper.tsx
    ├── screens/                # Full-page screen components
    │   ├── Screen1Landing.tsx
    │   ├── Screen2Welcome.tsx
    │   ├── Screen3PersonalInfo.tsx
    │   ├── Screen4Questionnaire.tsx
    │   ├── Screen5SortingAnimation.tsx
    │   ├── Screen6SortingResult.tsx
    │   ├── Screen7DepartmentsOverview.tsx
    │   ├── Screen8DepartmentDetail.tsx
    │   ├── Screen9AdminDashboard.tsx
    │   ├── Screen10MemberProfile.tsx
    │   ├── Screen11EventMode.tsx
    │   ├── Screen12MobileFlow.tsx
    │   ├── AdminLoginScreen.tsx
    │   └── AdminApiManagementViews.tsx
    ├── services/
    │   └── api.ts              # HTTP client for FastAPI backend
    ├── utils/
    │   ├── audio.ts            # Web Audio API sound engine
    │   └── animation.ts        # Shared animation utilities
    ├── data/
    │   ├── questions.ts        # Questionnaire data and scoring algorithm
    │   ├── departments.ts      # Department metadata and descriptions
    │   └── initialParticipants.ts  # Seed participant data
    └── types/
        └── index.ts            # Shared TypeScript type definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A running FastAPI backend at `http://localhost:8000` (optional; the app falls back to local data)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app is served at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

---

## Application Modes

The application exposes two separate entry points controlled by URL path:

| Path | Application | Description |
|---|---|---|
| `/` | ClientApp | Participant-facing sorting flow |
| `/admin` | AdminApp | Protected admin portal (requires login) |

---

## Screens and Navigation Flow

### Client Flow

```
Landing (Screen 1)
    └── Welcome (Screen 2)
            └── Personal Info (Screen 3)
                    └── Questionnaire (Screen 4)
                            └── Sorting Animation (Screen 5)
                                    └── Sorting Result (Screen 6)
                                            ├── Departments Overview (Screen 7)
                                            │       └── Department Detail (Screen 8)
                                            └── Member Profile (Screen 10)

Event Mode (Screen 11)  -- accessible from Navbar
Mobile Flow (Screen 12) -- accessible from Navbar
```

### Admin Flow

```
Admin Login
    └── Admin Dashboard (Screen 9) -- participant table, statistics, analytics
    └── Departments API View       -- CRUD management for department records
    └── Questions API View         -- CRUD management for questionnaire questions and answers
    └── Scoring Rules API View     -- CRUD management for answer-to-department scoring rules
```

---

## Frontend Functions Reference

### ClientApp

`ClientApp` is the root component for the participant flow. It manages all shared state and orchestrates navigation between screens.

| Function | Signature | Description |
|---|---|---|
| `handleNavigate` | `(screen: ScreenId) => void` | Central navigation handler. Redirects `/admin_dashboard` to `/admin`, otherwise updates `currentScreen` state and scrolls the page to the top. |
| `handleUpdateParticipant` | `(data: Partial<ParticipantInfo>) => void` | Merges a partial participant object into the main `participant` state, used by Screen 3 (Personal Info) to collect form values. |
| `handleSelectOption` | `(questionId: number, optionId: string) => void` | Records the participant's selected answer for a given question ID into the `answers` state map. |
| `handleNextQuestion` | `() => void` | Advances `currentQuestionIndex` by one, capped at the final question (index 7). |
| `handlePreviousQuestion` | `() => void` | Decrements `currentQuestionIndex` by one, or navigates back to Screen 3 if already on the first question. |
| `handleSubmitQuestionnaire` | `() => void` | Runs the `calculateSortingResult` algorithm against the collected answers, updates `departmentResult` and `scores`, saves the completed participant to `participantsList` in localStorage, and transitions to the sorting animation screen. |
| `handleSortingAnimationComplete` | `() => void` | Callback invoked by Screen 5 when the animation sequence finishes; transitions to Screen 6 (Sorting Result). |
| `handleJoinModalSuccess` | `(data: { name, email, dept }) => void` | Creates a new `ParticipantInfo` entry from the Join Modal form data and prepends it to `participantsList`. |

---

### AdminApp

`AdminApp` is the root component for the admin portal. It controls sidebar navigation, authentication state, and tab routing.

| Function | Signature | Description |
|---|---|---|
| `handleLoginSuccess` | `(name: string, email: string) => void` | Called by `AdminLoginScreen` on successful authentication; stores admin credentials in state and sets `isAuthenticated` to true. |
| `handleLogout` | `() => Promise<void>` | Calls `apiService.adminLogout()` to invalidate the server token, clears `isAuthenticated`, and plays a click sound. |
| `handleAddParticipant` | `(newP: ParticipantInfo) => void` | Prepends a new participant entry to the shared `participantsList` state (also written to localStorage). |

---

### API Service (ApiService)

Located at `src/services/api.ts`. A singleton class (`apiService`) that wraps all HTTP communication with the FastAPI backend. Handles Bearer token injection, base URL management, and error normalization.

#### Configuration Methods

| Method | Signature | Description |
|---|---|---|
| `getBaseUrl` | `() => string` | Returns the currently configured API base URL. |
| `setBaseUrl` | `(url: string) => void` | Normalizes and persists a new base URL to localStorage. Automatically appends `/api` if the suffix is missing. |
| `getToken` | `() => string | null` | Returns the current admin JWT token from memory. |
| `setToken` | `(token: string | null) => void` | Stores or clears the admin JWT token in both memory and localStorage. |

#### Public Endpoints

| Method | Signature | Description |
|---|---|---|
| `checkHealth` | `() => Promise<HealthCheckResponse>` | Pings the backend health endpoint. Tries the root `/health` URL first, then falls back to `/api/health`. Uses a 3-second timeout. |
| `getQuestions` | `() => Promise<any[]>` | Fetches the active questionnaire questions from `/api/questions`. |
| `registerParticipant` | `(data) => Promise<any>` | Creates a participant session via `POST /api/participants`. Accepts `fullName`, `email`, and `studyYear`. |
| `submitSorting` | `(participantId, responses) => Promise<any>` | Submits the participant's questionnaire responses to `POST /api/sort` for server-side scoring. |

#### Admin Authentication

| Method | Signature | Description |
|---|---|---|
| `adminLogin` | `(email, password) => Promise<AdminLoginResponse>` | Authenticates against `POST /api/admin/login`. On success, persists the JWT token, admin name, and admin email to localStorage. |
| `adminLogout` | `() => Promise<void>` | Calls `POST /api/admin/logout`, then clears the token and admin credentials regardless of server response. |
| `getAdminMe` | `() => Promise<any>` | Fetches the authenticated admin's profile from `/api/admin/me`. |

#### Admin Management

| Method | Signature | Description |
|---|---|---|
| `getAdminStatistics` | `() => Promise<BackendAdminStats>` | Retrieves aggregate participant statistics from `/api/admin/statistics`. |
| `getAdminParticipants` | `(limit?, skip?, statusFilter?) => Promise<any[]>` | Fetches a paginated list of participants. Supports optional `statusFilter` query parameter. |
| `getAdminResults` | `(limit?, skip?) => Promise<any[]>` | Fetches paginated sorting results from `/api/admin/results`. |
| `getAdminDepartments` | `() => Promise<any[]>` | Lists all departments from `/api/admin/departments`. |
| `createDepartment` | `(deptData) => Promise<any>` | Creates a new department via `POST /api/admin/departments`. |
| `updateDepartment` | `(deptId, deptData) => Promise<any>` | Updates an existing department via `PUT /api/admin/departments/:id`. |
| `getAdminQuestions` | `() => Promise<any[]>` | Lists all questionnaire questions from `/api/admin/questions`. |
| `createQuestion` | `(qData) => Promise<any>` | Creates a new question via `POST /api/admin/questions`. |
| `updateQuestion` | `(questionId, qData) => Promise<any>` | Updates an existing question via `PUT /api/admin/questions/:id`. |
| `createAnswer` | `(ansData) => Promise<any>` | Creates a new answer option via `POST /api/admin/answers`. |
| `updateAnswer` | `(answerId, ansData) => Promise<any>` | Updates an existing answer option via `PUT /api/admin/answers/:id`. |
| `getAdminScoringRules` | `() => Promise<any[]>` | Lists all scoring rules from `/api/admin/scoring-rules`. |
| `createScoringRule` | `(ruleData) => Promise<any>` | Creates a new scoring rule via `POST /api/admin/scoring-rules`. |
| `updateScoringRule` | `(ruleId, ruleData) => Promise<any>` | Updates an existing scoring rule via `PUT /api/admin/scoring-rules/:id`. |

---

### Sound Engine (SoundEngine)

Located at `src/utils/audio.ts`. A singleton class (`sounds`) that generates all application audio entirely with the Web Audio API — no external audio files are required for sound effects.

| Method | Signature | Description |
|---|---|---|
| `playThemeMusic` | `() => void` | Starts looped background music (Hedwig's Theme audio asset) at 45% volume. Respects browser autoplay policy. |
| `pauseThemeMusic` | `() => void` | Pauses background music and sets `isMusicPlaying` to false. |
| `toggleThemeMusic` | `() => boolean` | Toggles background music on or off. Returns the new `isMusicPlaying` state. |
| `playChime` | `(pitch?: number) => void` | Plays a soft sine-wave bell chime. Default pitch is 520 Hz. Duration approximately 0.85 seconds. |
| `playClick` | `() => void` | Plays a short triangle-wave click sound for UI interactions. Duration approximately 90 ms. |
| `playSortingResonance` | `() => void` | Plays a deep four-note harmonic chord that builds over 1.5 seconds, used during the sorting animation. |
| `playRevealFanfare` | `() => void` | Plays a major-chord arpeggio fanfare for the general sorting result reveal. |
| `playHatRumble` | `() => void` | Synthesizes a low sawtooth growl with distortion and a high shimmer overlay, played just before the department reveal. |
| `playDepartmentReveal_Development` | `() => void` | Plays a bold ascending square-wave synth arp with a punchy kick, themed for the Development department. |
| `playDepartmentReveal_Design` | `() => void` | Plays a dreamy pentatonic harp glissando across two octaves, themed for the Design department. |
| `playDepartmentReveal_Events` | `() => void` | Plays an upbeat festive major fanfare with octave doubling, themed for the Events department. |
| `playDepartmentReveal_SocialMedia` | `() => void` | Plays an energetic sawtooth arpeggio with a two-note boom-bap accent, themed for the Social Media department. |
| `playDepartmentReveal` | `(departmentId: string) => void` | Dispatcher that calls the appropriate department-specific reveal sound based on the provided department ID. |

---

### Admin Dashboard (Screen9AdminDashboard)

Located at `src/screens/Screen9AdminDashboard.tsx`. Renders the main admin analytics view, participant table, and quick actions.

| Function | Signature | Description |
|---|---|---|
| `handleExportCSV` | `() => void` | Serializes the full participant list to a CSV string with headers and triggers a browser file download with a timestamped filename. |
| `handleQuickAdd` | `() => void` | Generates a random participant entry with a randomized name and department assignment, then calls `onAddParticipant` to inject it into the live list. Used to simulate new registrations during demos. |

---

## Components

| Component | File | Description |
|---|---|---|
| `MagicalBackground` | `components/MagicalBackground.tsx` | Renders an animated particle and gradient canvas background shared across all screens. |
| `Navbar` | `components/Navbar.tsx` | Top navigation bar with links to main screens, a Join button, and an API connector toggle. |
| `ScreenSwitcherBar` | `components/ScreenSwitcherBar.tsx` | Developer-facing bottom bar for jumping directly to any screen during prototyping or demonstration. |
| `JoinModal` | `components/JoinModal.tsx` | Modal dialog that collects name, email, and department preference for a quick participant registration. |
| `ApiConnectorModal` | `components/ApiConnectorModal.tsx` | Modal panel that allows users to configure the FastAPI base URL, run a health check, and view the live connection status. |
| `DepartmentHeraldicCard` | `components/DepartmentHeraldicCard.tsx` | Styled card displaying a department's heraldic crest, name, description, and member count. |
| `GoldenHatButton` | `components/GoldenHatButton.tsx` | Reusable primary call-to-action button styled with a golden gradient and glow effect. |
| `WizardStepper` | `components/WizardStepper.tsx` | Step progress indicator used in the multi-step onboarding flow (Screens 2 through 5). |

---

## Data Layer

### `src/data/questions.ts`

Contains the full questionnaire (8 questions, each with 4 answer options) and the core sorting algorithm.

- **`calculateSortingResult(answers: Record<number, string>)`**: Accepts a map of question IDs to selected option IDs. Iterates over each answer, looks up the pre-defined scoring weights for each department, accumulates totals, and returns the winning `departmentId` and the full `scores` map (`Record<DepartmentId, number>`).

### `src/data/departments.ts`

Static metadata for each of the four departments: `development`, `design`, `events`, `social_media`. Includes name, tagline, description, color theme, icon reference, member count, and heraldic crest description.

### `src/data/initialParticipants.ts`

Seed data containing a set of sample `ParticipantInfo` records loaded into localStorage on first run.

---

## Backend Integration

The frontend communicates with a FastAPI backend through the `ApiService` singleton. The default base URL is:

```
http://localhost:8000/api
```

This can be changed at runtime via the **API Connector** modal accessible from the Navbar and Admin Portal header. The updated URL is persisted in localStorage under the key `sdg_api_base_url`.

Authentication uses a Bearer JWT token stored under `sdg_admin_token`. All admin routes automatically include this token in the `Authorization` header.

If the backend is unavailable, the application operates in fully offline mode using locally cached questionnaire data and localStorage-persisted participant records.

---

## Environment and Configuration

The following `localStorage` keys are managed by the application:

| Key | Description |
|---|---|
| `sdg_api_base_url` | Configured FastAPI base URL |
| `sdg_admin_token` | Admin JWT access token |
| `sdg_admin_name` | Authenticated admin display name |
| `sdg_admin_email` | Authenticated admin email address |
| `sdg_participants` | JSON-serialized array of all participant records |

---

## License

This project is the property of **Setif Developers Group**. All rights reserved.
