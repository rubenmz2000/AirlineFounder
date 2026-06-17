using AirlineFounder.Api.Dtos;
using AirlineFounder.Core.Models;
using AirlineFounder.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AirlineFounder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private static CompanyDto ToDto(Company c) =>
        new(c.Id, c.Name, c.IcaoCode, c.IataCode, c.HomeBase, c.Country, c.Money);

    public CompanyController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrentCompany()
    {
        var company = await _companyService.GetCurrentCompanyAsync();
        return company == null ? NotFound() : Ok(ToDto(company));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Company name is required.");

        if (string.IsNullOrWhiteSpace(request.IcaoCode) || request.IcaoCode.Length < 2)
            return BadRequest("ICAO code must be at least 2 characters.");

        await _companyService.CreateCompanyAsync(
            request.Name,
            request.IcaoCode,
            request.IataCode,
            request.HomeBase,
            request.Country);
        return Ok();
    }
    
    [HttpPut]
    public async Task<IActionResult> UpdateCompany([FromBody] CreateCompanyRequest request)
    {
        var existing = await _companyService.GetCurrentCompanyAsync();
        if (existing == null)
            return NotFound("No airline found to update.");

        await _companyService.UpdateCompanyAsync(existing.Id, request.Name, request.IcaoCode, request.IataCode, request.HomeBase, request.Country);
        await _companyService.GetCurrentCompanyAsync();
        return Ok();
    }
}

public record CreateCompanyRequest(string Name, string IcaoCode, string IataCode, string HomeBase, string Country);