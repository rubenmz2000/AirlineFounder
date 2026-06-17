namespace AirlineFounder.Api.Dtos;

public record FleetItemDto(
    string Registration,
    string ModelName,
    string Location,
    string Status,
    double FlightHours);