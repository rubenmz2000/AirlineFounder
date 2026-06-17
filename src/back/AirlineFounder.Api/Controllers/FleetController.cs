using AirlineFounder.Api.Dtos;
using AirlineFounder.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirlineFounder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FleetController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private readonly IFleetService _fleetService;

    public FleetController(ICompanyService companyService, IFleetService fleetService)
    {
        _companyService = companyService;
        _fleetService = fleetService;
    }

    [HttpGet]
    public async Task<IActionResult> GetFleet()
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null)
            return NotFound();

        var aircraft = await _fleetService.GetFleetAsync(company.Id);

        var fleet = aircraft.Select(a => new FleetItemDto(
            a.Registration,
            $"{a.Model?.Manufacturer} {a.Model?.Name}".Trim(),
            a.Location,
            a.Status.ToString(),
            a.FlightHours));

        return Ok(fleet);
    }

    [HttpPost("purchase")]
    public async Task<IActionResult> PurchaseAircraft([FromBody] PurchaseAircraftRequest request)
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null)
            return NotFound("No airline found. Create your airline first.");

        try
        {
            await _fleetService.PurchaseAircraftAsync(company.Id, request.ModelId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}