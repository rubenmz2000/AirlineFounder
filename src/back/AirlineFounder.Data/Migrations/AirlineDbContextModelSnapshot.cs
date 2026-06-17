using System;
using AirlineFounder.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AirlineFounder.Data.Migrations
{
    [DbContext(typeof(AirlineDbContext))]
    partial class AirlineDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.5");

            modelBuilder.Entity("AirlineFounder.Core.Models.Aircraft", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("AcquiredAt").HasColumnType("TEXT");
                b.Property<int>("AircraftModelId").HasColumnType("INTEGER");
                b.Property<int>("CompanyId").HasColumnType("INTEGER");
                b.Property<double>("FlightHours").HasColumnType("REAL");
                b.Property<string>("Location").IsRequired().HasColumnType("TEXT");
                b.Property<string>("Registration").IsRequired().HasColumnType("TEXT");
                b.Property<int>("Status").HasColumnType("INTEGER");
                b.HasKey("Id");
                b.HasIndex("AircraftModelId");
                b.HasIndex("CompanyId");
                b.ToTable("Aircraft");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.AircraftModel", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<int>("Capacity").HasColumnType("INTEGER");
                b.Property<string>("Description").IsRequired().HasColumnType("TEXT");
                b.Property<decimal>("LeasingPricePerMonth").HasColumnType("TEXT");
                b.Property<string>("Manufacturer").IsRequired().HasColumnType("TEXT");
                b.Property<string>("Name").IsRequired().HasColumnType("TEXT");
                b.Property<decimal>("PurchasePrice").HasColumnType("TEXT");
                b.Property<int>("RangeKm").HasColumnType("INTEGER");
                b.HasKey("Id");
                b.ToTable("AircraftModels");
                b.HasData(
                    new { Id = 1, Capacity = 165, Description = "Narrow-body workhorse, perfect for medium-haul routes.", LeasingPricePerMonth = 380000m, Manufacturer = "Airbus", Name = "A320neo", PurchasePrice = 101000000m, RangeKm = 6300 },
                    new { Id = 2, Capacity = 194, Description = "Extended narrow-body for high-density routes.", LeasingPricePerMonth = 480000m, Manufacturer = "Airbus", Name = "A321neo", PurchasePrice = 129500000m, RangeKm = 7400 },
                    new { Id = 3, Capacity = 277, Description = "Wide-body for long-haul international routes.", LeasingPricePerMonth = 780000m, Manufacturer = "Airbus", Name = "A330-300", PurchasePrice = 264000000m, RangeKm = 11750 },
                    new { Id = 4, Capacity = 315, Description = "Next-gen wide-body, ultra-long range capability.", LeasingPricePerMonth = 1100000m, Manufacturer = "Airbus", Name = "A350-900", PurchasePrice = 317400000m, RangeKm = 15000 },
                    new { Id = 5, Capacity = 162, Description = "Classic narrow-body, cost-efficient operations.", LeasingPricePerMonth = 320000m, Manufacturer = "Boeing", Name = "737-800", PurchasePrice = 89100000m, RangeKm = 5765 },
                    new { Id = 6, Capacity = 296, Description = "Dreamliner - fuel-efficient long-haul operations.", LeasingPricePerMonth = 950000m, Manufacturer = "Boeing", Name = "787-9", PurchasePrice = 292500000m, RangeKm = 14140 });
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.Company", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("CreatedAt").HasColumnType("TEXT");
                b.Property<string>("Country").IsRequired().HasColumnType("TEXT");
                b.Property<string>("HomeBase").IsRequired().HasColumnType("TEXT");
                b.Property<string>("IataCode").IsRequired().HasColumnType("TEXT");
                b.Property<string>("IcaoCode").IsRequired().HasColumnType("TEXT");
                b.Property<decimal>("Money").HasColumnType("TEXT");
                b.Property<string>("Name").IsRequired().HasColumnType("TEXT");
                b.Property<int>("UserId").HasColumnType("INTEGER");
                b.HasKey("Id");
                b.HasIndex("UserId");
                b.ToTable("Companies");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.User", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("CreatedAt").HasColumnType("TEXT");
                b.Property<string>("Email").IsRequired().HasColumnType("TEXT");
                b.Property<string>("Username").IsRequired().HasColumnType("TEXT");
                b.HasKey("Id");
                b.ToTable("Users");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.Aircraft", b =>
            {
                b.HasOne("AirlineFounder.Core.Models.AircraftModel", "Model")
                    .WithMany("Aircraft")
                    .HasForeignKey("AircraftModelId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
                b.HasOne("AirlineFounder.Core.Models.Company", "Company")
                    .WithMany("Fleet")
                    .HasForeignKey("CompanyId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
                b.Navigation("Company");
                b.Navigation("Model");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.Company", b =>
            {
                b.HasOne("AirlineFounder.Core.Models.User", "User")
                    .WithMany("Companies")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
                b.Navigation("User");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.AircraftModel", b =>
            {
                b.Navigation("Aircraft");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.Company", b =>
            {
                b.Navigation("Fleet");
            });

            modelBuilder.Entity("AirlineFounder.Core.Models.User", b =>
            {
                b.Navigation("Companies");
            });
#pragma warning restore 612, 618
        }
    }
}
