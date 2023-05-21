using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace igraj_kosarku_be.Controllers
{
    [ApiController]
    public class BaseController : Controller
    {
        private readonly IUserService userService;
        protected string? UserIdStr => User.Claims.FirstOrDefault(x => x.Type == "id")?.Value;
        protected string? RoleStr => User.Claims.FirstOrDefault(x => x.Type.Contains("role"))?.Value;

        protected UserResponse? LoggedUser { get; private set; }

        public BaseController(IUserService userService)
        {
            this.userService = userService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            if (UserIdStr != null)
            {
                LoggedUser = userService.GetById(Convert.ToInt32(UserIdStr));
            }
        }
    }
}
