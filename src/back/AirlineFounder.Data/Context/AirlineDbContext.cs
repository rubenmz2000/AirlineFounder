using AirlineFounder.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AirlineFounder.Data.Context;

public class AirlineDbContext : DbContext
{
    public AirlineDbContext(DbContextOptions<AirlineDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Aircraft> Aircraft => Set<Aircraft>();
    public DbSet<AircraftModel> AircraftModels => Set<AircraftModel>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Company>()
            .Property(c => c.Money)
            .HasColumnType("TEXT");

        modelBuilder.Entity<AircraftModel>()
            .Property(m => m.PurchasePrice)
            .HasColumnType("TEXT");

        modelBuilder.Entity<AircraftModel>()
            .Property(m => m.LeasingPricePerMonth)
            .HasColumnType("TEXT");

        modelBuilder.Entity<AircraftModel>().HasData(
            new AircraftModel { Id = 1, Manufacturer = "Airbus", Name = "A320neo", Capacity = 165, RangeKm = 6300, PurchasePrice = 101_000_000, LeasingPricePerMonth = 380_000, Description = "Narrow-body workhorse, perfect for medium-haul routes." },
            new AircraftModel { Id = 2, Manufacturer = "Airbus", Name = "A321neo", Capacity = 194, RangeKm = 7400, PurchasePrice = 129_500_000, LeasingPricePerMonth = 480_000, Description = "Extended narrow-body for high-density routes." },
            new AircraftModel { Id = 3, Manufacturer = "Airbus", Name = "A330-300", Capacity = 277, RangeKm = 11750, PurchasePrice = 264_000_000, LeasingPricePerMonth = 780_000, Description = "Wide-body for long-haul international routes." },
            new AircraftModel { Id = 4, Manufacturer = "Airbus", Name = "A350-900", Capacity = 315, RangeKm = 15000, PurchasePrice = 317_400_000, LeasingPricePerMonth = 1_100_000, Description = "Next-gen wide-body, ultra-long range capability." },
            new AircraftModel { Id = 5, Manufacturer = "Boeing", Name = "737-800", Capacity = 162, RangeKm = 5765, PurchasePrice = 89_100_000, LeasingPricePerMonth = 320_000, Description = "Classic narrow-body, cost-efficient operations." },
            new AircraftModel { Id = 6, Manufacturer = "Boeing", Name = "787-9", Capacity = 296, RangeKm = 14140, PurchasePrice = 292_500_000, LeasingPricePerMonth = 950_000, Description = "Dreamliner — fuel-efficient long-haul operations." }
        );
    }
}
