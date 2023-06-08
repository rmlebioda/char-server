using System.Globalization;
using Cli.Torrent.Models.QBitTorrentCliService;
using CsvHelper;
using CsvHelper.Configuration;

namespace Cli.Torrent.CliParser;

public class CsvFileDictionaryRepresentation
{
    public string[] Headers;
    public List<List<string>> Records = new List<List<string>>();

    public CsvFileDictionaryRepresentation(string csv)
    {
        using (TextReader sr = new StringReader(csv))
        using (var csvReader = new CsvReader(sr, new CsvConfiguration(CultureInfo.InvariantCulture)))
        {
            csvReader.Read();
            csvReader.ReadHeader();
            Headers = csvReader.HeaderRecord!;

            while (csvReader.Read())
            {
                var elements = new List<string>();
                
                for (int i = 0; i < Headers.Length; i++)
                    elements.Add(csvReader.GetField<string>(i));
                
                Records.Add(elements);
            }
        }
    }
    
}