namespace AirlineFounder.Api.Dtos;

public record CompanyDto(
    int Id,
    string Name,
    string IcaoCode,
    string IataCode,
    string HomeBase,
    string Country,
    decimal Money);