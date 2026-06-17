using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace AirlineFounder.Data.Repositories;

public class CompanyRepository : Repository<Company>, ICompanyRepository
{
    public CompanyRepository(AirlineDbContext context) : base(context) { }

    public async Task<Company?> GetWithFleetAsync(int companyId)
        => await _context.Companies
            .Include(c => c.Fleet)
            .ThenInclude(a => a.Model)
            .FirstOrDefaultAsync(c => c.Id == companyId);

    public async Task<Company?> GetFirstAsync()
        => await _context.Companies
            .Include(c => c.Fleet)
            .ThenInclude(a => a.Model)
            .FirstOrDefaultAsync();
}
