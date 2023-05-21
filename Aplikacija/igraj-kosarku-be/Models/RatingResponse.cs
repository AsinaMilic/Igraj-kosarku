namespace igraj_kosarku_be.Models
{
    public class RatingResponse
    {
        public int Id { get; set; }
        public int CreatedByUserId { get; set; }
        public UserResponse CreatedByUser { get; set; } = null!;
        public int ActivityId { get; set; }
        public ActivityResponse Activity { get; set; } = null!;
        public int Rated { get; set; }
    }
}
