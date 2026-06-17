using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AirlineFounder.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AircraftModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    RangeKm = table.Column<int>(type: "int", nullable: false),
                    PurchasePrice = table.Column<string>(type: "TEXT", nullable: false),
                    LeasingPricePerMonth = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AircraftModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IcaoCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IataCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HomeBase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Money = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Aircraft",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Registration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    FlightHours = table.Column<double>(type: "float", nullable: false),
                    AcquiredAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AircraftModelId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aircraft", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Aircraft_AircraftModels_AircraftModelId",
                        column: x => x.AircraftModelId,
                        principalTable: "AircraftModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Aircraft_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AircraftModels",
                columns: new[] { "Id", "Capacity", "Description", "LeasingPricePerMonth", "Manufacturer", "Name", "PurchasePrice", "RangeKm" },
                values: new object[,]
                {
                    { 1, 165, "Narrow-body workhorse, perfect for medium-haul routes.", "380000", "Airbus", "A320neo", "101000000", 6300 },
                    { 2, 194, "Extended narrow-body for high-density routes.", "480000", "Airbus", "A321neo", "129500000", 7400 },
                    { 3, 277, "Wide-body for long-haul international routes.", "780000", "Airbus", "A330-300", "264000000", 11750 },
                    { 4, 315, "Next-gen wide-body, ultra-long range capability.", "1100000", "Airbus", "A350-900", "317400000", 15000 },
                    { 5, 162, "Classic narrow-body, cost-efficient operations.", "320000", "Boeing", "737-800", "89100000", 5765 },
                    { 6, 296, "Dreamliner — fuel-efficient long-haul operations.", "950000", "Boeing", "787-9", "292500000", 14140 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aircraft_AircraftModelId",
                table: "Aircraft",
                column: "AircraftModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Aircraft_CompanyId",
                table: "Aircraft",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_UserId",
                table: "Companies",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aircraft");

            migrationBuilder.DropTable(
                name: "AircraftModels");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
