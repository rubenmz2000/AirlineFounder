namespace AirlineFounder.Api.Dtos;

public record DashboardDto(
    string CompanyName,
    string IcaoCode,
    decimal Money,
    string HomeBase,
    string Country,
    int AircraftCount,
    decimal FleetValue);