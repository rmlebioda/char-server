namespace Api.Startup.Models.Upscaling;

public class RealEsrganResponse
{
    public RealEsrganStatus Status { get; set; }
    public string? ErrorMessage { get; set; }
    public string? ImageIdentifier { get; set; }
}