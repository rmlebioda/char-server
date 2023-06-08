using Api.Startup.Core;
using Cli.RealEsrgan;
using Cli.Torrent;
using Cli.Torrent.Models.QBitTorrentCliService;
using EnvironmentSettings;
using Microsoft.Extensions.Logging.Abstractions;
using Serilog;

// validate environment variables
void ValidateEnvironmentSettings()
{
    RealEsrganService.ValidateEnvironmentSettings();
    _ = new QBitTorrentCliService(NullLogger.Instance)
        .GetVersionAsync(QBitTorrentCredentials.FromEnvironmentVariables()).Result;
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
builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new DateTimeIsoJsonConverter()); });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

var app = builder
    .Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(c =>
    {
        c.RouteTemplate = "swagger/{documentname}/swagger.json";
    });
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Cool API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();