using Cli.RealEsrgan;

namespace Api.Startup.Models.Upscaling;

/// <summary>
/// Settings for supported executable Real-ESRGAN.
/// If any of settings are missing, Real-ESRGAN defaults will be used.
/// </summary>
public class RealEsrganSettings
{
    /// <summary>
    /// Sets image scaling as image resolution multiplier.
    /// </summary>
    public byte? ScaleRatio { get; set; }
    /// <summary>
    /// AI model to be used for upscaling.
    /// </summary>
    public string? ModelName { get; set; }
    /// <summary>
    /// Output format of image.
    /// </summary>
    public string? OutputFormat { get; set; }
    /// <summary>
    /// Use verbose output during upscaling image.
    /// </summary>
    public bool? VerboseOutput { get; set; }

    internal RealEsrganUpscaleSettings ToRealEsrganUpscaleSettings()
    {
        return new RealEsrganUpscaleSettings()
        {
            ScaleRatio = ScaleRatio,
            ModelName = ModelName,
            OutputFormat = OutputFormat,
            VerboseOutput = VerboseOutput
        };
    }
}