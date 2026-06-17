using AirlineFounder.Core.Models;

namespace AirlineFounder.Services.Interfaces;

public interface ICompanyService
{
    Task<Company?> GetCurrentCompanyAsync();
    Task<Company> CreateCompanyAsync(string name, string icao, string iata, string homeBase, string country);
    Task UpdateMoneyAsync(int companyId, decimal amount);
    Task<bool> HasCompanyAsync();
}
