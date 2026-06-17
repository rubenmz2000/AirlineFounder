using AirlineFounder.Core.Enums;
using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Services.Interfaces;

namespace AirlineFounder.Services.Implementations;

public class FleetService : IFleetService
{
    private readonly IAircraftRepository _aircraftRepository;
    private readonly IAircraftModelRepository _modelRepository;
    private readonly ICompanyRepository _companyRepository;

    public FleetService(IAircraftRepository aircraftRepository, IAircraftModelRepository modelRepository, ICompanyRepository companyRepository)
    {
        _aircraftRepository = aircraftRepository;
        _modelRepository = modelRepository;
        _companyRepository = companyRepository;
    }

    public async Task<IEnumerable<Aircraft>> GetFleetAsync(int companyId)
        => await _aircraftRepository.GetByCompanyAsync(companyId);

    public async Task<Aircraft> PurchaseAircraftAsync(int companyId, int modelId)
    {
        var company = await _companyRepository.GetByIdAsync(companyId)
            ?? throw new InvalidOperationException("Company not found.");
        var model = await _modelRepository.GetByIdAsync(modelId)
            ?? throw new InvalidOperationException("Model not found.");

        if (company.Money < model.PurchasePrice)
            throw new InvalidOperationException("Insufficient funds.");

        company.Money -= model.PurchasePrice;
        await _companyRepository.UpdateAsync(company);

        var aircraft = await CreateAircraftAsync(companyId, modelId, company.HomeBase);
        return aircraft;
    }

    public async Task<Aircraft> AddAircraftFreeAsync(int companyId, int modelId)
    {
        var company = await _companyRepository.GetByIdAsync(companyId)
            ?? throw new InvalidOperationException("Company not found.");
        return await CreateAircraftAsync(companyId, modelId, company.HomeBase);
    }

    private async Task<Aircraft> CreateAircraftAsync(int companyId, int modelId, string location)
    {
        var lastReg = await _aircraftRepository.GetLastRegistrationAsync();
        var registration = GenerateNextRegistration(lastReg);

        var aircraft = new Aircraft
        {
            Registration = registration,
            CompanyId = companyId,
            AircraftModelId = modelId,
            Location = location,
            Status = AircraftStatus.Parked
        };

        await _aircraftRepository.AddAsync(aircraft);
        await _aircraftRepository.SaveChangesAsync();
        return aircraft;
    }

    public string GenerateNextRegistration(string lastRegistration)
    {
        if (string.IsNullOrEmpty(lastRegistration))
            return "EC-AAA";

        var letters = lastRegistration.Replace("EC-", "").ToCharArray();
        if (letters.Length != 3) return "EC-AAA";

        for (int i = 2; i >= 0; i--)
        {
            if (letters[i] < 'Z')
            {
                letters[i]++;
                return $"EC-{new string(letters)}";
            }
            letters[i] = 'A';
        }
        return "EC-AAA";
    }
}
