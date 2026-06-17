namespace AirlineFounder.Api.Dtos;

public record AircraftModelDto(
    int Id,
    string Manufacturer,
    string Name,
    int Capacity,
    int RangeKm,
    decimal PurchasePrice,
    decimal LeasingPricePerMonth,
    string Description);