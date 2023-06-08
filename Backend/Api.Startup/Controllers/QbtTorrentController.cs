using Api.Startup.Models.Qbt;
using Cli.Torrent;
using Cli.Torrent.Models.QBitTorrentCliService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Api.Startup.Controllers;

[ApiController]
[Route("api/qbt")]
public class QbtTorrentController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IMemoryCache _memoryCache;
    private readonly QBitTorrentCliService _qBitTorrentCliService;
    private readonly QBitTorrentCredentials _qBitTorrentCredentials;

    public QbtTorrentController(ILogger<QbtTorrentController> logger, IMemoryCache memoryCache)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _qBitTorrentCliService = new QBitTorrentCliService(logger);
        _qBitTorrentCredentials = QBitTorrentCredentials.FromEnvironmentVariables();
    }

    [HttpGet("list", Name = "Lists all torrents")]
    public async Task<ActionResult> ListTorrentsAsync()
    {
        var torrents = await _qBitTorrentCliService.GetTorrentListAsync(_qBitTorrentCredentials);
        return Ok(torrents);
    }
    
    [HttpPost("add/url/{url}", Name = "Add torrent with URL")]
    public async Task<ActionResult> AddTorrentUrlAsync(string url)
    {
        await _qBitTorrentCliService.AddTorrentWithUrlAsync(url, _qBitTorrentCredentials);
        return Ok();
    }
    
    [HttpDelete("delete/{hash}", Name = "Delete torrent with given hash")]
    public async Task<ActionResult> DeleteTorrentAsync(string hash, DeleteTorrentRequest? request)
    {
        await _qBitTorrentCliService.DeleteTorrentAsync(hash, request?.WithFiles ?? false, _qBitTorrentCredentials);
        return Ok();
    }
}