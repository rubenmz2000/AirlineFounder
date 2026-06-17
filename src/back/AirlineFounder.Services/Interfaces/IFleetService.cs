using AirlineFounder.Core.Models;

namespace AirlineFounder.Services.Interfaces;

public interface IFleetService
{
    Task<IEnumerable<Aircraft>> GetFleetAsync(int companyId);
    Task<Aircraft> PurchaseAircraftAsync(int companyId, int modelId);
    Task<Aircraft> AddAircraftFreeAsync(int companyId, int modelId);
    string GenerateNextRegistration(string lastRegistration);
}
