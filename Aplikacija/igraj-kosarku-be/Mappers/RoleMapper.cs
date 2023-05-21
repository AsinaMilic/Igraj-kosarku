using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Mappers
{
    public class RoleMapper
    {
        public static RoleResponse? EntityToItem(Role role)
        {
            return role == null ? null :
             new RoleResponse()
             {
                 Id = role.Id,
                 Name = role.Name,
             };
        }
    }
}
