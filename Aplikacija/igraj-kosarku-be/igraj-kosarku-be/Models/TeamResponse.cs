namespace igraj_kosarku_be.Models
{
    public class TeamResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Color { get; set; } = null!; //dodao aleksa
        public List<UserResponse>? Users { get; set; } 
    }
}
