using igraj_kosarku_be.Helpers;
using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Net;
using BCryptNet = BCrypt.Net.BCrypt;
using Microsoft.EntityFrameworkCore;
using igraj_kosarku_be.Mappers;

namespace igraj_kosarku_be.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly IConfiguration _configuration;
        private readonly IgrajKosarkuContext context;
        private readonly IEmailService _emailService;

        public UserService(IOptions<AppSettings> appSettings, IConfiguration configuration, IEmailService emailService)
        {
            _appSettings = appSettings.Value;
            _configuration = configuration;
            context = new IgrajKosarkuContext(_configuration);
            _emailService = emailService;
        }


        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = context.Users.Include(u => u.Role).FirstOrDefault(x => x.Email == model.Email);
            if (user == null || !BCryptNet.Verify(model.Password, user.Password))
                throw new HttpRequestException($"User not found", null, HttpStatusCode.NotFound);

            var token = GenerateJwtToken(UserMapper.UserToResponse(user), user.Role);

            return new AuthenticateResponse(UserMapper.UserToResponse(user), token);
        }

        public UserResponse RegisterUser(UserRequest model)
        {
            if (context.Users.Any(x => x.Email == model.Email))
                throw new HttpRequestException("User with that email already exists", null, HttpStatusCode.BadRequest);

            Location? location = null;
            if (model.Location != null)
            {
                location = context.Locations.FirstOrDefault(x => x.Name == model.Location.Name);
                if (location == null)
                {
                    location = new Location()
                    {
                        Name = model.Location.Name,
                        Lat = model.Location.Lat,
                        Lng = model.Location.Lng,
                    };
                    location = context.Locations.Add(location).Entity;
                    context.SaveChanges();
                }
            }

            var user = new User
            {
                CreatedAt = DateTime.UtcNow,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Password = BCryptNet.HashPassword(model.Password),
                Role = context.Roles.First(x => x.Name == "Player"),
                Location = location
            };

            user = context.Users.Add(user).Entity;
            context.SaveChanges();
            return UserMapper.UserToResponse(user);
        }

        public UserResponse UpdateUser(int userId, UserRequest model, UserResponse? loggedUser, string? role)
        {
            if (role != "Admin" && (loggedUser != null && loggedUser.Id != userId))
                throw new HttpRequestException("Unable to update user", null, HttpStatusCode.Unauthorized);

            var user = context.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
                throw new HttpRequestException("User with that id doesn't exists", null, HttpStatusCode.NotFound);

            if (context.Users.Any(x => x.Email == model.Email) && user.Email != model.Email)
                throw new HttpRequestException("User with that email already exists", null, HttpStatusCode.BadRequest);

            if (role == "Admin" && model.RoleId != null)
            {
                user.Role = context.Roles.First(x => x.Id == model.RoleId);
            }

            Location? location = null;
            if (model.Location != null)
            {
                location = context.Locations.FirstOrDefault(x => x.Name == model.Location.Name);
                if (location == null)
                {
                    location = new Location()
                    {
                        Name = model.Location.Name,
                        Lat = model.Location.Lat,
                        Lng = model.Location.Lng,
                    };
                    location = context.Locations.Add(location).Entity;
                    context.SaveChanges();
                }
            }

            user.Status = model.Status ?? user.Status;
            user.Email = model.Email ?? user.Email;
            user.FirstName = model.FirstName ?? user.FirstName;
            user.LastName = model.LastName ?? user.LastName;
            user.Password = model.Password != null ? BCryptNet.HashPassword(model.Password) : user.Password;
            user.Description = model.Description ?? user.Description;
            user.Specialties = model.Specialties ?? user.Specialties;
            user.ProfileName = model.ProfileName ?? user.ProfileName;
            user.Location = location ?? user.Location;
            user.PhoneNumber = model.Phone ?? user.PhoneNumber;
            //dodao aleksa
            user.ImageUrl = model.ImageUrl ?? user.ImageUrl;

            user = context.Users.Update(user).Entity;
            context.SaveChanges();
            return UserMapper.UserToResponse(user);
        }

        public UserResponse UpdateUser(int userId, UserRequest model, UserResponse? loggedUser, string? role, string imageUrl)
        {
            var user = UpdateUser(userId, model, loggedUser, role);
            user.ImageUrl = imageUrl;
            return user;
        }

        public UserResponse FindUserByEmail(string email)
        {
            var user = context.Users.FirstOrDefault(x => x.Email == email);
            if (user == null)
                throw new HttpRequestException("User with that email not found", null, HttpStatusCode.NotFound);

            return UserMapper.UserToResponse(user);
        }

        public List<UserResponse> GetAll()
        {
            var users = context.Users.Include(u => u.Role).Include(u => u.Teams).Include(u => u.Location).ToList();
            return UserMapper.UsersToResponse(users);
        }

        public UserResponse GetById(int id)
        {
            User? user = context.Users.Include(u => u.Role).Include(u => u.Teams).FirstOrDefault(x => x.Id == id);
            if (user == null)
                throw new HttpRequestException($"User with id: {id} not found", null, HttpStatusCode.NotFound);
            return UserMapper.UserToResponse(user);
        }

        private string GenerateJwtToken(UserResponse user, Role role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("id", user.Id.ToString()),
                    new Claim("role", role.Name ?? "")
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public UserResponse Delete(int id, UserResponse? loggedUser, string? roleStr)
        {
            if (roleStr != "Admin" && (loggedUser != null && loggedUser.Id != id))
                throw new HttpRequestException("Unable to delete user", null, HttpStatusCode.Unauthorized);

            var user = context.Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
                throw new HttpRequestException("User with that id doesn't exists", null, HttpStatusCode.NotFound);

            context.Users.Remove(user);
            context.SaveChanges();
            return UserMapper.UserToResponse(user);
        }

        public string RequestResetPassword(string email)
        {
            var user = context.Users.FirstOrDefault(x => x.Email == email);
            if (user == null)
                throw new HttpRequestException("User with that email doesn't exists", null, HttpStatusCode.NotFound);

            user.ResetPasswordToken = Guid.NewGuid().ToString();
            context.Users.Update(user);
            context.SaveChanges();

            var message = $"Follow the link to set new password: {_appSettings.BaseUrl}/reset-password/{user.ResetPasswordToken}";
            _emailService.SendEmail(user.Email, "Password reset request", message);

            return user.ResetPasswordToken;
        }

        public bool ResetPassword(string resetPasswordToken, string password)
        {
            if (resetPasswordToken.IsNullOrEmpty())
                throw new HttpRequestException("Invalid reset password token", null, HttpStatusCode.NotFound);

            if (password.IsNullOrEmpty())
                throw new HttpRequestException("Invalid new password", null, HttpStatusCode.NotFound);

            var user = context.Users.FirstOrDefault(x => x.ResetPasswordToken == resetPasswordToken);
            if (user == null)
                throw new HttpRequestException("User did not request password reset", null, HttpStatusCode.NotFound);

            user.ResetPasswordToken = null;
            user.Password = BCryptNet.HashPassword(password);
            context.Users.Update(user);
            context.SaveChanges();

            _emailService.SendEmail(user.Email, "Password reset request", "You have changed password successfully");

            return true;
        }

        public UserResponse SetPicture(int id, string imageUrl, UserResponse? loggedUser, string? role)
        {
            if (role != "Admin" && (loggedUser != null && loggedUser.Id != id))
                throw new HttpRequestException("Unable to change image", null, HttpStatusCode.Unauthorized);

            var user = context.Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
                throw new HttpRequestException("User with that id doesn't exists", null, HttpStatusCode.NotFound);

            user.ImageUrl = $"{_appSettings.BucketUrl}{imageUrl}";
            context.Users.Update(user);
            context.SaveChanges();
            return UserMapper.UserToResponse(user);
        }
    }
}
