using AirlineFounder.Core.Enums;

namespace AirlineFounder.Core.Models;

public class Aircraft
{
    public int Id { get; set; }
    public string Registration { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public AircraftStatus Status { get; set; } = AircraftStatus.Parked;
    public double FlightHours { get; set; } = 0;
    public DateTime AcquiredAt { get; set; } = DateTime.UtcNow;

    public int AircraftModelId { get; set; }
    public AircraftModel? Model { get; set; }

    public int CompanyId { get; set; }
    public Company? Company { get; set; }
}
