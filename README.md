# Airline Founder

A from-scratch airline management simulator, build as a side project. The long term vision is an app that runs alongsde Microsoft Flight Simulator: You manage an airline (fleet, routes, finances) on a companion dashboard, while your aircraft's state stays tied to what's actually happening in the simulator.

This repository is a full rewrite of an earlier WPF/SQLite prototype, replacing the desktop client with a web frontend talking to a real backend API, while keeping the original domain model intact.

## Structure

This is a monorepo with two independent halves:

- [`src/back`](src/back) — ASP.NET Core Web API (.NET 10) backed by SQL Server. See [src/back/README.md](src/back/README.md).
- [`src/front/airline-founder`](src/front/airline-founder) — React + TypeScript frontend. See [src/front/airline-founder/README.md](src/front/airline-founder/README.md).
## Roadmap

✅ Live Map

🚧 User Management

📋 Airline Management

📋 MSFS Connector Service

📋 Economy

📋 Multiplayer

### Legend

- ✅ Done
- 🚧 In Progress
- 📋 Pending

 Backend and frontend are versioned and released independently — see [src/back/CHANGELOG.md](src/back/CHANGELOG.md) and [src/front/airline-founder/CHANGELOG.md](src/front/airline-founder/CHANGELOG.md) for their respective version histories.

## Origin

The `Core`, `Data`, and `Services` projects under `src/back` come from an earlier WPF prototype (a separate repo) that already had a solid layered architecture — models, a generic repository pattern, and service interfaces. This rewrite keeps that layer untouched and replaces only the presentation layer: a WPF desktop app becomes a web API + React frontend.