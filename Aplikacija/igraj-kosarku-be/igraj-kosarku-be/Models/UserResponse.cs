using DbServices;

namespace igraj_kosarku_be.Models
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ProfileName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public LocationResponse? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? Description { get; set; }
        public string? Specialties { get; set; }
        public string? ImageUrl { get; set; }
        public virtual List<TeamResponse> Teams { get; set; } = null!;
        public virtual RoleResponse? Role { get; set; }

        public UserResponse()
        {
            Teams = new List<TeamResponse>();
        }
    }
}
