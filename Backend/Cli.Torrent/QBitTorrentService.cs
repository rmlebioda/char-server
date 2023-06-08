using CommandLineRunner;
using Microsoft.Extensions.Logging;

namespace Cli.Torrent;

public class QBitTorrentService
{
    private const string ProgramName = "qbittorrent";
    
    private readonly ILogger _logger;

    public QBitTorrentService(ILogger logger)
    {
        _logger = logger;
    }

    public async Task AddMagnet(string magnet)
    {
        _logger.LogInformation("Adding magnet: {magnet}", magnet);
        await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            new[] {"--skip-dialog=true", magnet},
            true);
    }
}