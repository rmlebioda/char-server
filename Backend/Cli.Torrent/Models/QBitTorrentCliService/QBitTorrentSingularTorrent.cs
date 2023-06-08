using System.Text.Json.Serialization;

namespace Cli.Torrent.Models.QBitTorrentCliService;

public record struct QBitTorrentSingularTorrent([property: JsonIgnore] Dictionary<string, string> Info)
{
    [DictionaryInfoProperty] public string? Hash { get; }

    [DictionaryInfoProperty] public string? Name { get; }

    [DictionaryInfoProperty] public string? MagnetUri { get; }

    [DictionaryInfoProperty] public string? Size { get; }

    [DictionaryInfoProperty] public string? Progress { get; }

    [DictionaryInfoProperty] public string? DownloadSpeed { get; }

    [DictionaryInfoProperty] public string? UploadSpeed { get; }

    [DictionaryInfoProperty] public string? Priority { get; }

    [DictionaryInfoProperty] public string? ConnectedSeeds { get; }

    [DictionaryInfoProperty] public string? TotalSeeds { get; }

    [DictionaryInfoProperty] public string? ConnectedLeechers { get; }

    [DictionaryInfoProperty] public string? TotalLeechers { get; }

    [DictionaryInfoProperty] public string? Ratio { get; }

    [DictionaryInfoProperty] public string? EstimatedTime { get; }

    [DictionaryInfoProperty] public string? State { get; }

    [DictionaryInfoProperty] public string? SequentialDownload { get; }

    [DictionaryInfoProperty] public string? FirstLastPiecePrioritized { get; }

    [DictionaryInfoProperty] public string? Category { get; }

    [DictionaryInfoProperty] public string? SuperSeeding { get; }

    [DictionaryInfoProperty] public string? ForceStart { get; }

    [DictionaryInfoProperty] public string? SavePath { get; }

    [DictionaryInfoProperty] public string? AddedOn { get; }

    [DictionaryInfoProperty] public string? CompletionOn { get; }

    [DictionaryInfoProperty] public string? CurrentTracker { get; }

    [DictionaryInfoProperty] public string? DownloadLimit { get; }

    [DictionaryInfoProperty] public string? UploadLimit { get; }

    [DictionaryInfoProperty] public string? Downloaded { get; }

    [DictionaryInfoProperty] public string? Uploaded { get; }

    [DictionaryInfoProperty] public string? DownloadedInSession { get; }

    [DictionaryInfoProperty] public string? UploadedInSession { get; }

    [DictionaryInfoProperty] public string? IncompletedSize { get; }

    [DictionaryInfoProperty] public string? CompletedSize { get; }

    [DictionaryInfoProperty] public string? RatioLimit { get; }

    [DictionaryInfoProperty] public string? LastSeenComplete { get; }

    [DictionaryInfoProperty] public string? LastActivityTime { get; }

    [DictionaryInfoProperty] public string? ActiveTime { get; }

    [DictionaryInfoProperty] public string? AutomaticTorrentManagement { get; }

    [DictionaryInfoProperty] public string? TotalSize { get; }

    [DictionaryInfoProperty] public string? SeedingTime { get; }

    [DictionaryInfoProperty] public string? ContentPath { get; }
}