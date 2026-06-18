# Changelog

All notable chagnes to this project are documented here. The format follows [Keep a changelog](https://keepachangelog.com/en/2.0.0), and the project follows [Semantic Versioning](https://semver.org/).

## [X.X.X] - Unreleased

### Fixed

- Deleted several unused imports and configurations from old versions of Grid component that were preventing the front from building

## [0.1.0] - 2026-06-17

### Added

- Initial React + TypeScript app, built with Vite and MUI.
- Dark theme matching the color palette of the original WPF protoype.
- Sidebar + MainContent shell layout.
- Five screens — Dashboard, Airline, Fleet, Market, Developer Panel — wired end-to-end to the live API,

### Known limitations

- API base URL is hardcoded in `src/api/apiClient.ts` — no environment-based configuration yet.