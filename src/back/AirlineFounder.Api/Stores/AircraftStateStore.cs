using AirlineFounder.Api.Dtos;

namespace AirlineFounder.Api.Stores;

public class AircraftStateStore
{
    private AircraftPositionDto? _current;

    public AircraftPositionDto? Get()
    {
        return _current;
    }

    public void Set(AircraftPositionDto position)
    {
        _current = position;
    }
}