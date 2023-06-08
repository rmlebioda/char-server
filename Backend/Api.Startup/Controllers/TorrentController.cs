using Api.Startup.Models.Torrent;
using Cli.Torrent;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Api.Startup.Controllers;

[ApiController]
[Route("api/torrent")]
public class TorrentController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IMemoryCache _memoryCache;
    private readonly QBitTorrentService _qBitTorrentService;
    
    public TorrentController(ILogger<TorrentController> logger, IMemoryCache memoryCache)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _qBitTorrentService = new QBitTorrentService(logger);
    }

    [HttpPost("add", Name = "Add new torrent via magnet (supports only qBitTorrent)")]
    [Obsolete("Use qbt endpoints for torrent managing, this endpoint is no longer supported and maintained")]
    public async Task<ActionResult> AddTorrent(TorrentAddRequest request)
    {
        await _qBitTorrentService.AddMagnet(request.Magnet);
        return Ok();
    }
}
