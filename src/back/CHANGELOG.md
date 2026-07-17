# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/2.0.0/), and the project follows [Semantinc Versioning](https://semver.org/).

## [X.X.X] - UNRELEASED

### Added

- New endpoint for storing in execution scope the aircraft position.

### Changed

- Changed "TEXT" columns to "decimal(18,2)" for monetary values.

## [0.1.0] - 2026-06-17

### Added

- Initial ASP.NET Core Web API (.NET 10) on top of the inherited `Core`/`Data`/`Services` layers.
- SQL Server integration, with EF Core migrations applied automatically on startup.
- DTO-based controllers: `Company`, `Fleet`, `Market`, `Dasgviard`, and `evekioer` — no raw EF entities are ever returned directly.

### Known limitations 

- No `Airport` or `Flight` entities — `Aircraft.Location` and `Company.HomeBase` remain plain strings.
- Aircraft status and location are set manually, not derived from a flight schedule.
- Single company per database — no multy-tenancy.