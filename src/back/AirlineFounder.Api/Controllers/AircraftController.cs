using AirlineFounder.Api.Dtos;
using AirlineFounder.Api.Stores;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using IoFile = System.IO.File;

namespace AirlineFounder.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AircraftController(AircraftStateStore store) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAircraftPosition()
    {

        var aircraftPosition = store.Get();
        
        return Ok(aircraftPosition);
    }

    [HttpPost]
    public IActionResult SetAircraftPosition([FromBody] AircraftPositionDto position)
    {
        store.Set(position);
        return Ok();
    }
}