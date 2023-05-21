using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace igraj_kosarku_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseController
    {
        private readonly IActivityService _activityService;

        public ActivitiesController(IActivityService activityService, IUserService userService) : base(userService)
        {
            _activityService = activityService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _activityService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _activityService.GetActivityById(id));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(ActivityRequest value)
        {
            return Ok(await _activityService.CreateActivity(value, LoggedUser, RoleStr));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ActivityRequest value)
        {
            return Ok(await _activityService.UpdateActivity(id, value, LoggedUser, RoleStr));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _activityService.DeleteActivity(id, LoggedUser, RoleStr);
        }

        [Authorize]
        [HttpPost("join-activity/{teamId}/{activityId}")]
        public async Task<IActionResult> JoinActivity(int teamId, int activityId)
        {
            return Ok(await _activityService.JoinActivity(teamId, activityId));
        }

        [Authorize]
        [HttpPost("rate/{activityId}")]
        public async Task<IActionResult> RateActivity(int rating, int activityId)
        {
            return Ok(await _activityService.RateActivity(activityId, LoggedUser, rating));
        }
    }
}
