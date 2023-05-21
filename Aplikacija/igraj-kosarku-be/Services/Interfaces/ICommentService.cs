using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface ICommentService
    {
        List<CommentResponse> GetAllByActivityId(int activityId);
        CommentResponse CreateComment(int activityId, CommentRequest text, UserResponse user);
        CommentResponse UpdateComment(int id, CommentRequest text, UserResponse user, string? role);
        void DeleteComment(int id, UserResponse user, string? role);
    }
}
