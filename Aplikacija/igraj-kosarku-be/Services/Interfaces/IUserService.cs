using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        UserResponse FindUserByEmail(string email);
        UserResponse RegisterUser(UserRequest model);
        UserResponse UpdateUser(int id, UserRequest model, UserResponse? loggedUser, string? role);
        UserResponse UpdateUser(int id, UserRequest model, UserResponse? loggedUser, string? role, string imageUrl);
        List<UserResponse> GetAll();
        UserResponse GetById(int id);
        string RequestResetPassword(string email);
        bool ResetPassword(string resetPasswordToken, string password);
        UserResponse Delete(int id, UserResponse? loggedUser, string? roleStr);
        UserResponse SetPicture(int id, string imageUrl, UserResponse? loggedUser, string? role);
    }
}
