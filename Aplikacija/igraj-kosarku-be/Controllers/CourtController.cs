using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace igraj_kosarku_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtController : BaseController
    {
        private readonly ICourtService _courtService;

        public CourtController(ICourtService courtService, IUserService userService) : base(userService)
        {
            _courtService = courtService;
        }

        // GET: api/<CourtController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_courtService.GetAll());
        }

        // GET api/<CourtController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_courtService.GetCourtById(id));
        }

        // POST api/<CourtController>
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] CourtRequest value)
        {
            return Ok(_courtService.CreateCourt(value, LoggedUser, RoleStr));
        }

        // PUT api/<CourtController>/5
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CourtRequest value)
        {
            return Ok(_courtService.UpdateCourt(id, value, LoggedUser, RoleStr));
        }

        // DELETE api/<CourtController>/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _courtService.DeleteCourt(id, LoggedUser, RoleStr);
        }
    }
}
