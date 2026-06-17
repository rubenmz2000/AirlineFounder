using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Services.Interfaces;

namespace AirlineFounder.Services.Implementations;

public class MarketService : IMarketService
{
    private readonly IAircraftModelRepository _modelRepository;

    public MarketService(IAircraftModelRepository modelRepository)
    {
        _modelRepository = modelRepository;
    }

    public async Task<IEnumerable<AircraftModel>> GetAvailableModelsAsync()
        => await _modelRepository.GetAllAsync();
}
