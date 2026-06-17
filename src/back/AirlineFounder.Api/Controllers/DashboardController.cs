using AirlineFounder.Api.Dtos;
using AirlineFounder.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirlineFounder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private readonly IFleetService _fleetService;

    public DashboardController(ICompanyService companyService, IFleetService fleetService)
    {
        _companyService = companyService;
        _fleetService = fleetService;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null)
            return NotFound();

        var fleet = (await _fleetService.GetFleetAsync(company.Id)).ToList();

        var dto = new DashboardDto(
            company.Name, company.IcaoCode, company.Money, company.HomeBase, company.Country,
            fleet.Count, fleet.Sum(a => a.Model?.PurchasePrice ?? 0));

        return Ok(dto);
    }
}