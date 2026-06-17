using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AirlineFounder.Data.Context;

public class AirlineDbContextFactory : IDesignTimeDbContextFactory<AirlineDbContext>
{
    public AirlineDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<AirlineDbContext>()
            .UseSqlite("Data Source=airline_design.db")
            .Options;
        return new AirlineDbContext(options);
    }
}
