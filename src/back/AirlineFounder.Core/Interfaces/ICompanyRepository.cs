using AirlineFounder.Core.Models;

namespace AirlineFounder.Core.Interfaces;

public interface ICompanyRepository : IRepository<Company>
{
    Task<Company?> GetWithFleetAsync(int companyId);
    Task<Company?> GetFirstAsync();
}
