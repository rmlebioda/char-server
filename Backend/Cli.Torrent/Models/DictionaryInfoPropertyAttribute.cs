using PostSharp.Aspects;
using PostSharp.Serialization;

namespace Cli.Torrent.Models;

[PSerializable]
public class DictionaryInfoPropertyAttribute : LocationInterceptionAspect
{
    private string? KeyName { get; set; }
    public DictionaryInfoPropertyAttribute(string? keyName = null)
    {
        KeyName = keyName;
    }
    
    public override void OnGetValue(LocationInterceptionArgs args)
    {
        var propertyName = KeyName ?? args.LocationName;
        var infoValue =
            (Dictionary<string, string>)args.Instance.GetType().GetProperty("Info")!.GetValue(args.Instance)!;
        args.Value = infoValue.GetValueOrDefault(propertyName);
    }
}