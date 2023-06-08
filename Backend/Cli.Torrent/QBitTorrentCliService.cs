using Cli.Torrent.CliParser;
using Cli.Torrent.Models.QBitTorrentCliService;
using CommandLineRunner;
using Microsoft.Extensions.Logging;

namespace Cli.Torrent;

public class QBitTorrentCliService
{
    private const string ProgramName = "qbt";
    
    private readonly ILogger _logger;
    private readonly QbtParser _parser;

    public QBitTorrentCliService(ILogger logger)
    {
        _logger = logger;
        _parser = new QbtParser();
    }

    public async Task<string> GetHelpAsync()
    {
        var result = await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            new string[] { "--help" },
            true);
        return result.Output;
    }
    
    public async Task<QBitTorrentCliVersion> GetVersionAsync(QBitTorrentCredentials credentials)
    {
        _logger.LogInformation("Fetching QBT Cli version");
        var result = await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            BuildArgsWithCredentials(credentials, "server", "info"),
            true);
        return _parser.ParseVersion(result.Output);
    }

    public async Task<IEnumerable<QBitTorrentSingularTorrent>> GetTorrentListAsync(QBitTorrentCredentials credentials)
    {
        _logger.LogInformation("Fetching torrent list");
        var result = await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            BuildArgsWithCredentials(credentials, "torrent", "list", "--format", "csv"),
            true);
        return _parser.ParseTorrentListAsCsv(result.Output);
    }

    public async Task AddTorrentWithUrlAsync(string url, QBitTorrentCredentials credentials)
    {
        _logger.LogInformation("adding torrent from url: {url}", url);
        _ = await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            BuildArgsWithCredentials(credentials, "torrent", "add", "url", url),
            true);
    }

    public async Task DeleteTorrentAsync(string hash, bool withFiles, QBitTorrentCredentials credentials)
    {
        _logger.LogInformation("deleting torrent with hash: {hash}", hash);
        _ = await CommandLineRunnerService.ExecuteCommandAsync(ProgramName,
            BuildArgsWithCredentials(credentials, "torrent", "delete", hash),
            true);
    }
    
    private IEnumerable<string> BuildArgsWithCredentials(QBitTorrentCredentials credentials, params string[] arguments)
    {
        foreach (var argument in arguments)
            yield return argument;
        
        if (!string.IsNullOrEmpty(credentials.ServerHostName))
        {
            yield return "--url";
            yield return credentials.ServerHostName;
        }
        if (!string.IsNullOrEmpty(credentials.ServerUserName))
        {
            yield return "--username";
            yield return credentials.ServerUserName;
        }
        if (!string.IsNullOrEmpty(credentials.ServerPassword))
        {
            yield return "--password";
            yield return credentials.ServerPassword;
        }
    }
}