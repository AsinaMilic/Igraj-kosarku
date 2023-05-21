using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace igraj_kosarku_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BaseController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService, IUserService userService) : base(userService)
        {
            _commentService = commentService;
        }

        // GET api/<Comment>/5
        [HttpGet("{activityId}")]
        public List<CommentResponse> Get(int activityId)
        {
            return _commentService.GetAllByActivityId(activityId);
        }

        // POST api/<Comment>/5
        [HttpPost("{activityId}")]
        public IActionResult Post(int activityId, [FromBody] CommentRequest value)
        {
            return Ok(_commentService.CreateComment(activityId, value, LoggedUser));
        }

        // PUT api/<Comment>/5
        [HttpPut("{commentId}")]
        public IActionResult Put(int commentId, [FromBody] CommentRequest value)
        {
            return Ok(_commentService.UpdateComment(commentId, value, LoggedUser, RoleStr));
        }

        // DELETE api/<Comment>/5
        [HttpDelete("{commentId}")]
        public void Delete(int commentId)
        {
            _commentService.DeleteComment(commentId, LoggedUser, RoleStr);
        }
    }
}
