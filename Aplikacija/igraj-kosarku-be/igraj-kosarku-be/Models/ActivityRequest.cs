using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class ActivityRequest
    {
        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [Required]
        public LocationRequest Location { get; set; } = null!; 
        [Required]
        public int CreatedByUserId { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public DateTime ActivityDateTime { get; set; }
        public int NumberOfPlayers { get; set; }
        [Required]
        public int CourtId { get; set; }
        public string? Url { get; set; }
    }
}
