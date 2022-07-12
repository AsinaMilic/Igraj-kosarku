using DbServices;
using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Mappers
{
    public class UserMapper
    {
        public static UserResponse UserToResponse(User user)
        {
            return new UserResponse()
            {
                Id = user.Id,
                CreatedAt = user.CreatedAt,
                Description = user.Description,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Location = LocationMapper.EntityToItem(user.Location),
                PhoneNumber = user.PhoneNumber,
                ProfileName = user.ProfileName,
                Specialties = user.Specialties,
                Role = RoleMapper.EntityToItem(user.Role),
                Status = user.Status,
                ImageUrl = user.ImageUrl,
                //Teams = TeamMapper.EntitiesToResponse(user.Teams)
            };
        }

        internal static List<UserResponse> UsersToResponse(List<User> users)
        {
            var userResponses = new List<UserResponse>();
            users.ForEach(x =>
            {
                userResponses.Add(UserToResponse(x));
            });
            return userResponses;
        }
    }
}
