using DbServices;

namespace igraj_kosarku_be.Models
{
    public class CourtResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public Location Location { get; set; } = null!;
        public string? ImageUrl { get; set; }

    }
}
