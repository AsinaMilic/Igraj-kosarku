using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class UserRequest
    {
        public string Email { get; set; } = null!;
        public string? Password { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public LocationRequest? Location { get; set; }
        public int? RoleId { get; set; }
        public string? Status { get; set; }
        public string? Phone { get; set; }
        public string? Description { get; set; }
        public string? Specialties { get; set; }
        public string? ProfileName { get; set; }

        //dodao aleksa
        public string? ImageUrl { get; set; }

    }
}
