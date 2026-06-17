using AirlineFounder.Api.Dtos;
using AirlineFounder.Data.Context;
using AirlineFounder.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AirlineFounder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DeveloperController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private readonly IFleetService _fleetService;
    private readonly AirlineDbContext _dbContext;

    public DeveloperController(ICompanyService companyService, IFleetService fleetService, AirlineDbContext dbContext)
    {
        _companyService = companyService;
        _fleetService = fleetService;
        _dbContext = dbContext;
    }

    [HttpPost("add-money")]
    public async Task<IActionResult> AddMoney([FromBody] MoneyAdjustmentRequest request)
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null) return NotFound("No airline found.");

        await _companyService.UpdateMoneyAsync(company.Id, request.Amount);
        return Ok();
    }

    [HttpPost("subtract-money")]
    public async Task<IActionResult> SubtractMoney([FromBody] MoneyAdjustmentRequest request)
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null) return NotFound("No airline found.");

        await _companyService.UpdateMoneyAsync(company.Id, -request.Amount);
        return Ok();
    }

    [HttpPost("add-free-aircraft")]
    public async Task<IActionResult> AddFreeAircraft([FromBody] AddFreeAircraftRequest request)
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        if (company == null) return NotFound("No airline found.");

        await _fleetService.AddAircraftFreeAsync(company.Id, request.ModelId);
        return Ok();
    }
    
    [HttpPost("reset-database")]
    public async Task<IActionResult> ResetDatabase()
    {
        await _dbContext.Aircraft.ExecuteDeleteAsync();
        await _dbContext.Companies.ExecuteDeleteAsync();
        await _dbContext.Users.ExecuteDeleteAsync();
        return Ok();
    }
}