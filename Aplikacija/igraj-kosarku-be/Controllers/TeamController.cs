using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace igraj_kosarku_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : BaseController
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService, IUserService userService) : base(userService)
        {
            _teamService = teamService;
        }

        // GET: api/<TeamController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_teamService.GetAll());
        }

        // GET api/<TeamController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_teamService.GetTeamById(id));
        }

        // POST api/<TeamController>
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] TeamRequest value)
        {
            return Ok(_teamService.CreateTeam(value, LoggedUser, RoleStr));
        }

        // PUT api/<TeamController>/5
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TeamRequest value)
        {
            return Ok(_teamService.UpdateTeam(id, value, LoggedUser, RoleStr));
        }

        // PUT api/<TeamController>/5/5
        [Authorize]
        [HttpPut("{teamId}/{userId}")]
        public IActionResult AddUserToTeam(int teamId, int userId)
        {
            return Ok(_teamService.AddUserToTeam(teamId, userId, LoggedUser, RoleStr));
        }

        // DELETE api/<TeamController>/5/5
        [Authorize]
        [HttpDelete("{teamId}/{userId}")]
        public IActionResult RemoveUserFromTeam(int teamId, int userId)
        {
            return Ok(_teamService.RemoveUserFromTeam(teamId, userId, LoggedUser, RoleStr));
        }

        // DELETE api/<TeamController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _teamService.DeleteTeam(id, LoggedUser, RoleStr);
        }
    }
}
