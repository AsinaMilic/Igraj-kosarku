using DbServices;
using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface ITeamService
    {
        List<TeamResponse> GetAll();
        TeamResponse GetTeamById(int id);
        TeamResponse CreateTeam(TeamRequest value, UserResponse loggedUser, string role);
        TeamResponse UpdateTeam(int id, TeamRequest value, UserResponse? loggedUser, string? role);
        TeamResponse AddUserToTeam(int teamId, int userId, UserResponse? loggedUser, string? role);
        TeamResponse RemoveUserFromTeam(int teamId, int userId, UserResponse? loggedUser, string? role);
        void DeleteTeam(int id, UserResponse? loggedUser, string? role);
    }
}
