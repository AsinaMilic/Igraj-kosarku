using DbServices;

namespace igraj_kosarku_be.Models
{
    public class AuthenticateResponse
    {
        public UserResponse User { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(UserResponse user, string token)
        {
            User = user;
            Token = token;
        }

    }
}
