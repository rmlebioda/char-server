using EnvironmentSettings;

namespace Cli.Torrent.Models.QBitTorrentCliService;

public class QBitTorrentCredentials
{
    public string? ServerHostName { get; set; }
    public string? ServerUserName { get; set; }
    public string? ServerPassword { get; set; }

    public static QBitTorrentCredentials FromEnvironmentVariables()
    {
        return new QBitTorrentCredentials()
        {
            ServerHostName = Environment.GetEnvironmentVariable(Variables.Qbt_Url),
            ServerUserName = Environment.GetEnvironmentVariable(Variables.Qbt_UserName),
            ServerPassword = Environment.GetEnvironmentVariable(Variables.Qbt_Password)
        };
    }
}