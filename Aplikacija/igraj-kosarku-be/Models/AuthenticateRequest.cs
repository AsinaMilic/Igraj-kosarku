using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class AuthenticateRequest
    {
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
