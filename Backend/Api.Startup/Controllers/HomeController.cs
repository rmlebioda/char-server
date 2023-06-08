using Microsoft.AspNetCore.Mvc;

namespace Api.Startup.Controllers;

[ApiController]
[Route("")]
public class HomeController : ControllerBase
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet, Route("")]
    public ActionResult Home()
    {
        return Redirect("/swagger");
    }
}