# Airline Founder - Backend
ASP.NET Core Web API (.NET 10) on top of SQL Server.

## Stack

- .NET 10
- Entity Framework Core
- SQL Server
- Swagger / OpenAPI for API exploration

## Project layout

- `AirlineFounder.Core` — domain models (`Aircraft`, `AircraftModel`, `Company`, `User`) and enums.
- `AirlineFounder.Data` — `DbContext`, EF Core migrations, and a generic repository pattern.
- `AirlineFounder.Services` — interface/implementation split for company, fleet, and market logic.
- `AirlineFounder.Api` — the actual Web API: controllers and DTOs. Controllers never return raw EF entities — every response goes through a DTO defined in `AirlineFounder.Api.Dtos`.

## Prerequisites

- .NET 10 SDK
- Access to a SQL Server instance
- The `dotnet-ef` CLI tool (`dotnet tool install --global dotnet-ef`)

## Setup

1. Update the connection string. It currently lives directly in `AirlineDbContextFactory.cs` (used by EF tooling) and in `appsettings.json` (used at runtime) — there's no `.env` or secrets manager wired up yet, so point both at your own SQL Server instance.
2. Apply migrations:
```bash
   dotnet ef database update --project AirlineFounder.Data --startup-project AirlineFounder.Api
```
(the API also calls `Database.Migrate()` on startup, so this step is mostly useful if you want to inspect the schema before running the app)
3. Run the API:
```bash
   dotnet run --project AirlineFounder.Api
```

Swagger UI is available once the API is running, for exploring endpoints without a frontend

## API surface

| Controller  | Endpoints                                                                     | Purpose                                                       |
|-------------|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| `Company`   | `GET / POST / PUT`                                                            | Create, fetch, and edit the airline (single company per save) |
| `Fleet`     | `GET`, `POST /purchase`                                                       | List owned aircraft, buy new ones from the catalog            |
| `Market`    | `GET`                                                                         | List purchasable/leasable aircraft models                     |
| `Dashboard` | `GET`                                                                         | Aggregated stats (balance, fleet size, fleet value, etc.)     |
| `Developer` | `POST /add-money`, `/subtract-money`, `/add-free-aircraft`, `/reset-database` | Debug tools, not meant for production use                     |

## Cors

Allowed origins are read from the `CorsOrigins` array in `appsettings.json` — make sure your frontend's dev/prod URL is listed there