namespace Api.Startup.Models.Torrent;

public class TorrentAddRequest
{
    /// <summary>
    /// Magnet URL to torrent.
    /// </summary>
    public string Magnet { get; set; }
}