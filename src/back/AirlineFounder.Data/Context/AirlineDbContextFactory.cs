using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AirlineFounder.Data.Context;

public class AirlineDbContextFactory : IDesignTimeDbContextFactory<AirlineDbContext>
{
    public AirlineDbContext CreateDbContext(string[] args)
    {
        
        var options = new DbContextOptionsBuilder<AirlineDbContext>()
            .UseSqlServer("Server=db.rmzsoftwares.com;Database=AirlineFounderTestDb;User Id=AirlineFounderTest;Password=TU_PASSWORD;TrustServerCertificate=True;")
            .Options;
        return new AirlineDbContext(options);
    }
}
