using Cli.Torrent.Models.QBitTorrentCliService;

namespace Cli.Torrent.CliParser;

public class QbtParser
{
    public QBitTorrentCliVersion ParseVersion(string versionOutput)
    {
        return new QBitTorrentCliVersion(ParseCommaString(versionOutput));
    }

    private Dictionary<string, string> ParseCommaString(string value)
    {
        var dictionary = new Dictionary<string, string>();
        var commaCount = value.Count(s => s == ':');
        foreach (var line in value.SplitInParts(value.Length / commaCount))
        {
            if (line.Contains(':'))
            {
                var splitValues = line.Split(":");
                var key = splitValues[0].Trim();
                if (!string.IsNullOrEmpty(key) && splitValues.Length > 1)
                    dictionary.Add(key, string.Join(":", string.Join(":", splitValues[1..]).Trim()));
            }
        }

        return dictionary;
    }

    public IEnumerable<QBitTorrentSingularTorrent> ParseTorrentListAsCsv(string output)
    {
        var csvDict = new CsvFileDictionaryRepresentation(output);
        foreach (var record in csvDict.Records)
        {
            var dict = new Dictionary<string, string>();

            for (var i = 0; i < csvDict.Headers.Length; i++)
                dict.Add(csvDict.Headers[i], record[i]);

            yield return new QBitTorrentSingularTorrent(dict);
        }
    }
}