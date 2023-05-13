namespace Api.Startup.Models.Upscaling;

public class RealEsrganHelpResponse
{
    public string Message { get; set; }

    internal RealEsrganHelpResponse(string msg)
    {
        Message = msg;
    }
}