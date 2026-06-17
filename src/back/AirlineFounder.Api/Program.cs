using AirlineFounder.Core.Interfaces;
using AirlineFounder.Data.Context;
using AirlineFounder.Data.Repositories;
using AirlineFounder.Services.Implementations;
using AirlineFounder.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AirlineDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<IAircraftRepository, AircraftRepository>();
builder.Services.AddScoped<IAircraftModelRepository, AircraftModelRepository>();

builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IFleetService, FleetService>();
builder.Services.AddScoped<IMarketService, MarketService>();

var corsOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>() ??
                  throw new ArgumentNullException("Need to add cors origins in appsettings.json (List<string>)");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AirlineDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();