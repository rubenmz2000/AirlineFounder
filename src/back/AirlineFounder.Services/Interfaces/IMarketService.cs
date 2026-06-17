using AirlineFounder.Core.Models;

namespace AirlineFounder.Services.Interfaces;

public interface IMarketService
{
    Task<IEnumerable<AircraftModel>> GetAvailableModelsAsync();
}
