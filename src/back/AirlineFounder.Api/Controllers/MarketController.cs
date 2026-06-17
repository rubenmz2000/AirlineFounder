using AirlineFounder.Api.Dtos;
using AirlineFounder.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirlineFounder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MarketController : ControllerBase
{
    private readonly IMarketService _marketService;

    public MarketController(IMarketService marketService)
    {
        _marketService = marketService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableModels()
    {
        var models = await _marketService.GetAvailableModelsAsync();

        var dtos = models.Select(m => new AircraftModelDto(
            m.Id, m.Manufacturer, m.Name, m.Capacity, m.RangeKm,
            m.PurchasePrice, m.LeasingPricePerMonth, m.Description));

        return Ok(dtos);
    }
}