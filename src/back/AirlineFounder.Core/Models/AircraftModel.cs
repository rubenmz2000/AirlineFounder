namespace AirlineFounder.Core.Models;

public class AircraftModel
{
    public int Id { get; set; }
    public string Manufacturer { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string FullName => $"{Manufacturer} {Name}";
    public int Capacity { get; set; }
    public int RangeKm { get; set; }
    public decimal PurchasePrice { get; set; }
    public decimal LeasingPricePerMonth { get; set; }
    public string Description { get; set; } = string.Empty;

    public ICollection<Aircraft> Aircraft { get; set; } = new List<Aircraft>();
}
