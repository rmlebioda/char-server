using CommandLineRunner;
using EnvironmentSettings;
using Microsoft.Extensions.Logging;

namespace Cli.RealEsrgan;

public class RealEsrganService
{
    private static readonly string? RealEsrganExecutablePath =
        Environment.GetEnvironmentVariable(Variables.RealEsrganExecutablePath);

    private readonly ILogger _logger;

    public RealEsrganService(ILogger logger)
    {
        _logger = logger;
    }

    public static void ValidateEnvironmentSettings()
    {
        if (string.IsNullOrEmpty(RealEsrganExecutablePath) || !File.Exists(RealEsrganExecutablePath))
            throw new InvalidEnvironmentVariableValue(Variables.RealEsrganExecutablePath, RealEsrganExecutablePath,
                "Expected valid path to existing executable file.");
    }

    public async Task<string> GetHelp()
    {
        var result =
            await CommandLineRunnerService.ExecuteCommandAsync(RealEsrganExecutablePath!, new[] { "-h" }, false);
        _logger.LogDebug("Fetched real esrgan help: {help}", result);
        return result.Output;
    }

    public async Task<RealEsrganUpscaleResult> UpscaleImage(string sourceImagePath,
        string originalFileName,
        RealEsrganUpscaleSettings settings)
    {
        var fileExtension = Path.GetExtension(sourceImagePath);
        var outputImagePath = Path.Join(Path.GetTempPath(), $"{Guid.NewGuid()}{fileExtension}");
        _logger.LogInformation("Converting image {SourceImagePath} with size " +
                               "{SourceImageSize} KiB " + "and settings {Settings} to new location: {OutputImagePath}",
            sourceImagePath, new FileInfo(sourceImagePath).Length / 1024, settings, outputImagePath);

        var result =
            await CommandLineRunnerService.ExecuteCommandAsync(RealEsrganExecutablePath!,
                BuildArguments(sourceImagePath, settings, outputImagePath),
                true);

        _logger.LogInformation("Converted image, new file size: {Size} KiB",
            new FileInfo(outputImagePath).Length / 1024);

        return new RealEsrganUpscaleResult(sourceImagePath, outputImagePath, originalFileName);
    }

    private IEnumerable<string> BuildArguments(string sourceImagePath,
        RealEsrganUpscaleSettings settings,
        string outputImagePath)
    {
        if (!string.IsNullOrEmpty(settings.ModelName))
        {
            yield return "-n";
            yield return settings.ModelName;
        }

        if (!string.IsNullOrEmpty(settings.OutputFormat))
        {
            yield return "-f";
            yield return settings.OutputFormat;
        }

        if (settings.ScaleRatio is not null)
        {
            yield return "-s";
            yield return settings.ScaleRatio!.ToString()!;
        }

        if (settings.VerboseOutput is not null)
            yield return "-v";

        yield return "-i";
        yield return sourceImagePath;

        yield return "-o";
        yield return outputImagePath;
    }
}