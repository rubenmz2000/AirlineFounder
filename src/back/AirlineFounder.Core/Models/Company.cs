namespace AirlineFounder.Core.Models;

public class Company
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IcaoCode { get; set; } = string.Empty;
    public string IataCode { get; set; } = string.Empty;
    public string HomeBase { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public decimal Money { get; set; } = 50_000_000;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public User? User { get; set; }

    public ICollection<Aircraft> Fleet { get; set; } = new List<Aircraft>();
}
