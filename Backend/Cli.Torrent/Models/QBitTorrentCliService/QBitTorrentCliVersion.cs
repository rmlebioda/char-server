// ReSharper disable UnassignedGetOnlyAutoProperty
namespace Cli.Torrent.Models.QBitTorrentCliService;

public record struct QBitTorrentCliVersion(Dictionary<string, string> Info)
{
    [DictionaryInfoProperty("QBittorrent version")]
    public string? QBitTorrentVersion { get; }
    [DictionaryInfoProperty("API version")]
    public string? ApiVersion { get; }
    [DictionaryInfoProperty("Legacy API version")]
    public string? LegacyApiVersion { get; }
    [DictionaryInfoProperty("Legacy API min version")]
    public string? LegacyMinApiVersion { get; }
    [DictionaryInfoProperty]
    public string? Bitness { get; }
    [DictionaryInfoProperty("Libtorrent version")]
    public string? LibtorrentVersion { get; } 
    [DictionaryInfoProperty("Qt version")]
    public string? QtVersion { get; }
    [DictionaryInfoProperty("Boost version")]
    public string? BoostVersion { get; }
    [DictionaryInfoProperty("OpenSSL version")]
    public string? OpenSslVersion { get; }
    [DictionaryInfoProperty("ZLib version")]
    public string? ZLibVersion { get; }
};
