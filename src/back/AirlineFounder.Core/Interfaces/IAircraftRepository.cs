using AirlineFounder.Core.Models;

namespace AirlineFounder.Core.Interfaces;

public interface IAircraftRepository : IRepository<Aircraft>
{
    Task<IEnumerable<Aircraft>> GetByCompanyAsync(int companyId);
    Task<string> GetLastRegistrationAsync();
}
