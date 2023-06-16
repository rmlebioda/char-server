using System.ComponentModel.DataAnnotations;

namespace Api.Startup.Models.Qbt;

public class AddQbtTorrentRequest
{
    [Required] public string Url { get; set; } = default!;
}