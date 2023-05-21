namespace igraj_kosarku_be.Models
{
    public class ActivityResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public LocationResponse? Location { get; set; } = null!;
        public List<TeamResponse>? Teams { get; set; } = null!;
        public UserResponse CreatedByUser { get; set; } = null!;
        public Category Category { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime ActivityDateTime { get; set; }
        public int NumberOfPlayers { get; set; }
        public int CourtId { get; set; }
        public string? Url { get; set; }
        public double? Rating { get; set; }
    }
}
