# Airline Founder — Frontend

React + TypeScript app built with Vite and MUI

## Stack

- React
- Vite
- MUI (Material UI)
- Axios

## Prerequisites

- Node.js
- pnpm
## Setup

```bash
pnpm install
pnpm dev
```

The dev server runs n Vite's default port. The api base URL is currently hardcoded in `src/api/apiclient.ts` as `http://localhost:5056/api` — if your backend runs elsewhere, update it there (there's no environment variable for this yet).

## Building
```bash
pnpm build
pnpm preview
```

## Structure

- `src/pages` — one file per screen: `Dashboard,tsx`, `Aerolinea.tsx` (Airline), `Flota.tsx`, `Mercado.tsx` (Market), `PanelDesarrollador.tsx` (Developer Panel)
- `src/components` — shell components: `Header`, `Footer`, `Sidebar`, `MainContent` (holds the route definitions).
- `src/services` — one file per API resource (`companyService.ts`, `fleetService.ts`, etc.), wrapping the corresponding backend endpoints.
- `src/types` — TypeScript interfaces matching the backend DTOs.
- `src/theme.ts` — the MUI dark theme, matching the color palette of the original WPF prototype.

## Screens

- **Dashboard** — overview: airline name, balance, home base, fleet size and value.
- **Airline** — view and edit the airline's profile (name, ICAO/IATA codes, home base, country).
- **Fleet** — table of owned aircraft, with registration, model, location, status, and flight hours.
- **Market** — catalog of aircraft available to purchase or lease.
- **Developer Panel** — debug tools (add/subtract money, grant a free aircraft, reset the database). Not meant for production use.