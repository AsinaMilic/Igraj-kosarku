using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class TeamRequest
    {
        [Required]
        public string Name { get; set; } = null!;

        public string Color { get; set; } = null!; //dodao aleksa
    }
}
