using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Services.Interfaces;

namespace AirlineFounder.Services.Implementations;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
    }

    public async Task<Company?> GetCurrentCompanyAsync()
        => await _companyRepository.GetFirstAsync();

    public async Task<Company> CreateCompanyAsync(string name, string icao, string iata, string homeBase, string country)
    {
        var user = new User { Username = "Player", Email = "player@airlinefounder.com" };
        var company = new Company
        {
            Name = name,
            IcaoCode = icao.ToUpper(),
            IataCode = iata.ToUpper(),
            HomeBase = homeBase.ToUpper(),
            Country = country,
            Money = 50_000_000,
            User = user
        };
        await _companyRepository.AddAsync(company);
        await _companyRepository.SaveChangesAsync();
        return company;
    }
    
    public async Task<Company> UpdateCompanyAsync(int companyId, string name, string icao, string iata, string homeBase, string country)
    {
        var company = await _companyRepository.GetByIdAsync(companyId);
        if (company == null)
            throw new InvalidOperationException("Company not found.");

        company.Name = name;
        company.IcaoCode = icao.ToUpper();
        company.IataCode = iata.ToUpper();
        company.HomeBase = homeBase.ToUpper();
        company.Country = country;

        await _companyRepository.UpdateAsync(company);
        await _companyRepository.SaveChangesAsync();
        return company;
    }

    public async Task UpdateMoneyAsync(int companyId, decimal amount)
    {
        var company = await _companyRepository.GetByIdAsync(companyId);
        if (company == null) return;
        company.Money += amount;
        await _companyRepository.UpdateAsync(company);
        await _companyRepository.SaveChangesAsync();
    }

    public async Task<bool> HasCompanyAsync()
        => (await _companyRepository.GetFirstAsync()) != null;
}
