using igraj_kosarku_be.Mappers;
using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Web.Http;

namespace igraj_kosarku_be.Services
{
    public class CommentService : ICommentService
    {
        private readonly IConfiguration _configuration;
        private readonly IgrajKosarkuContext context;

        public CommentService(IConfiguration configuration)
        {
            _configuration = configuration;
            context = new IgrajKosarkuContext(_configuration);
        }
        public CommentResponse CreateComment(int activityId, CommentRequest text, UserResponse user)
        {
            var activity = context.Activities.Include(x => x.Comments).FirstOrDefault(x => x.Id == activityId);
            if (activity == null)
                throw new HttpRequestException($"Activity with id: {activityId} not found", null, HttpStatusCode.NotFound);

            var comment = new Comment()
            {
                Activity = activity,
                Text = text.Text,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = user.Id
            };

            comment = context.Comments.Add(comment).Entity;
            context.SaveChanges();
            return new CommentResponse()
            {
                Id = comment.Id,
                Text = comment.Text,
                CreatedByUser = user
            };
        }

        public List<CommentResponse> GetAllByActivityId(int id)
        {
            var activity = context.Activities.Include(x => x.Comments).FirstOrDefault(x => x.Id == id);
            if (activity == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            var comments = context.Comments.Include(x => x.CreatedByUser).ToList().FindAll(x => x.ActivityId == id);

            var commentResponses = new List<CommentResponse>();
            foreach (var comment in comments)
            {
                commentResponses.Add(new CommentResponse
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    CreatedByUser = UserMapper.UserToResponse(comment.CreatedByUser)
                });
            }
            return commentResponses;
        }

        public void DeleteComment(int id, UserResponse user, string? role)
        {
            var comment = context.Comments.FirstOrDefault(x => x.Id == id);
            if (comment == null)
            {
                throw new HttpRequestException($"Comment with id: {id} not found", null, HttpStatusCode.NotFound);
            }
            if (comment.CreatedByUserId != user.Id && role != "Admin")
                throw new HttpRequestException($"Unable to delete comment of another user", null, HttpStatusCode.Unauthorized);

            context.Comments.Remove(comment);
            context.SaveChanges();
        }

        public CommentResponse UpdateComment(int id, CommentRequest text, UserResponse user, string? role)
        {
            var comment = context.Comments.Include(x => x.CreatedByUser).FirstOrDefault(x => x.Id == id);
            if (comment == null)
            {
                throw new HttpRequestException($"Comment with id: {id} not found", null, HttpStatusCode.NotFound);
            }
            if (comment.CreatedByUser.Id != user.Id && role != "Admin")
                throw new HttpRequestException($"Unable to delete comment of another user", null, HttpStatusCode.Unauthorized);

            comment.Text = text.Text;
            context.Update(comment);
            context.SaveChanges();
            return new CommentResponse()
            {
                Id = comment.Id,
                Text = comment.Text,
                CreatedByUser = UserMapper.UserToResponse(comment.CreatedByUser)
            };
        }
    }
}
