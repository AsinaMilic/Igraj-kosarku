using System.ComponentModel.DataAnnotations;

namespace igraj_kosarku_be.Models
{
    public class CommentRequest
    {
        [Required]
        public string Text { get; set; } = null!;
    }
}
