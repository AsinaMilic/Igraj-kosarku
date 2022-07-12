using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class CourtRequest
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public int LocationId { get; set; }
        public string? ImageUrl { get; set; }
    }
}
