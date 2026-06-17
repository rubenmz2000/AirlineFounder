using AirlineFounder.Core.Interfaces;
using AirlineFounder.Core.Models;
using AirlineFounder.Data.Context;

namespace AirlineFounder.Data.Repositories;

public class AircraftModelRepository : Repository<AircraftModel>, IAircraftModelRepository
{
    public AircraftModelRepository(AirlineDbContext context) : base(context) { }
}
