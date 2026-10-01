# Travelmate React

Travelmate is an accessible public-transport journey planning and passenger-assistance experience. This repository contains the complete React + TypeScript version of the public website and interactive passenger demo.

## What is included

- Public homepage explaining Travelmate's purpose and intended outcomes
- Responsive passenger dashboard
- Accessible journey planner with demo route results
- Upcoming journeys, saved places and journey history
- Accessibility and communication preferences
- Consent-based personalisation settings
- Assistance requests and simulated vehicle connection
- Journey alerts, filtering and dismiss actions
- Passenger profile and journey feedback
- Local persistence for accessibility preferences
- Typed API service prepared for a future FastAPI backend

## Technology

- React 18
- TypeScript
- Vite
- React Router
- Lucide React icons
- CSS with responsive desktop and mobile layouts

## Run locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is created in `dist/`.

## Environment variables

Copy `.env.example` to `.env.local` when connecting the frontend to an API:

```bash
cp .env.example .env.local
```

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Project structure

```text
travelmate-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppNavigation.tsx
│   │   ├── Brand.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── Toggle.tsx
│   ├── data/
│   │   └── demo.ts
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── AccessibilityPage.tsx
│   │   ├── AlertsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── JourneysPage.tsx
│   │   ├── PassengerApp.tsx
│   │   ├── ProfilePage.tsx
│   │   └── PublicHome.tsx
│   ├── services/
│   │   └── travelmateApi.ts
│   ├── types/
│   │   └── travel.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Connecting FastAPI

The frontend currently uses seeded demonstration data. `src/services/travelmateApi.ts` contains the API boundary.

The first backend integration can replace the journey-planning fallback with:

```http
POST /api/v1/journeys/plan
Content-Type: application/json

{
  "origin": "Leicester Station",
  "destination": "Haymarket"
}
```

Recommended next endpoints:

- `POST /api/v1/auth/login`
- `GET /api/v1/passenger/profile`
- `PUT /api/v1/passenger/profile`
- `PUT /api/v1/passenger/accessibility`
- `POST /api/v1/journeys/plan`
- `POST /api/v1/assistance-requests`
- `GET /api/v1/alerts`
- `POST /api/v1/feedback`

## Current scope

This export is a frontend application. Authentication, persistent passenger data, live transport information, notifications and real AI recommendations still require the FastAPI/PostgreSQL backend.

## Blue brand theme

The shared theme uses solid `#144F85` for readable controls and `#144F85E9` as the optional translucent brand token. Update `src/styles.css` to change the theme. The provided blue logo artwork lives in `public/travelmate-brand.png`; `Brand.tsx` displays its pin mark without altering the original artwork. Homepage and passenger routes use the same brand.

## Public information and languages

The footer links to About us, Services, Insights, News, Careers and Contact us. News and Careers show honest empty states; public contact details are unpublished until launch. Cookie settings describe the demo's browser storage and save the preference without enabling tracking.

LanguageProvider supports English, Simplified Mandarin Chinese, Spanish, French and Portuguese. The user's selection is stored under `travelmate-language`. UI translations live in `src/i18n/translations.ts`; location names and passenger data remain unchanged. New UI text should use `t()` and include dictionary entries for all four translated locales. Translations should be reviewed by fluent speakers before public launch.

Validation: production build; functional checks for all five languages across six information pages and passenger controls, reload persistence, and cookie-dialog save/close behavior.
