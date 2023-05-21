namespace igraj_kosarku_be.Models
{
    public class CommentResponse
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public UserResponse CreatedByUser { get; set; } = null!;
    }
}
