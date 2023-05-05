using Cli.RealEsrgan;
using EnvironmentSettings;
using Serilog;

// validate environment variables
void ValidateEnvironmentSettings()
{
    RealEsrganService.ValidateEnvironmentSettings();
}

ValidateEnvironmentSettings();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var logDirectoryPath = Environment.GetEnvironmentVariable(Variables.LogDirectoryPath);

var loggerConfiguration = new LoggerConfiguration();
loggerConfiguration.Enrich.FromLogContext();
if (Directory.Exists(logDirectoryPath))
    loggerConfiguration.WriteTo.File(Path.Combine(logDirectoryPath, $"{Settings.ServerName}_backend_logs.txt"),
        rollingInterval: RollingInterval.Day,
        rollOnFileSizeLimit: true,
        fileSizeLimitBytes: 100 * 1024 * 1024);
loggerConfiguration.WriteTo.Console();
loggerConfiguration.MinimumLevel.Verbose();
var logger = loggerConfiguration.CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

var app = builder
    .Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();