using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace igraj_kosarku_be.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IStorageService _storageService;

        public UsersController(IUserService userService, IStorageService storageService) : base(userService)
        {
            _userService = userService;
            _storageService = storageService;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("register")]
        public IActionResult Register(UserRequest model)
        {
            return Ok(_userService.RegisterUser(model));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_userService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_userService.GetById(id));
        }

        [HttpGet("reset-password")]
        public IActionResult RequestResetPassword([FromQuery] string email)
        {
            return Ok(_userService.RequestResetPassword(email));
        }

        [HttpPost("reset-password/{passwordResetToken}")]
        public IActionResult ResetPassword(string passwordResetToken, [FromBody] string newPassword)
        {
            return Ok(_userService.ResetPassword(passwordResetToken, newPassword));
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] UserRequest model)
        {
            return Ok(_userService.UpdateUser(id, model, LoggedUser, RoleStr));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_userService.Delete(id, LoggedUser, RoleStr));
        }

        [HttpPost("update/{id}/upload-file")]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            var s3Response = await _storageService.UploadFileAsync(file);

            return Created(file.FileName, _userService.SetPicture(id, s3Response.Message, LoggedUser, RoleStr));
        }
    }
}
