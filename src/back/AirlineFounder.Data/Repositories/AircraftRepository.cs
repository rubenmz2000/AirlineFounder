using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace AirlineFounder.Data.Repositories;

public class AircraftRepository : Repository<Aircraft>, IAircraftRepository
{
    public AircraftRepository(AirlineDbContext context) : base(context) { }

    public async Task<IEnumerable<Aircraft>> GetByCompanyAsync(int companyId)
        => await _context.Aircraft
            .Include(a => a.Model)
            .Where(a => a.CompanyId == companyId)
            .ToListAsync();

    public async Task<string> GetLastRegistrationAsync()
    {
        var last = await _context.Aircraft
            .OrderByDescending(a => a.Id)
            .Select(a => a.Registration)
            .FirstOrDefaultAsync();
        return last ?? string.Empty;
    }
}
