namespace Cli.RealEsrgan;

public record RealEsrganUpscaleSettings
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
}