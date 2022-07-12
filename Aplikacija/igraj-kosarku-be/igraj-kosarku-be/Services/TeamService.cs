using DbServices;
using igraj_kosarku_be.Mappers;
using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace igraj_kosarku_be.Services
{
    public class TeamService : ITeamService
    {
        private readonly IConfiguration _configuration;
        private readonly IgrajKosarkuContext context;

        public TeamService(IConfiguration configuration)
        {
            _configuration = configuration;
            context = new IgrajKosarkuContext(_configuration);
        }

        public TeamResponse AddUserToTeam(int teamId, int userId, UserResponse? loggedUser, string? role)
        {
            var team = context.Teams.Include(t => t.Users).FirstOrDefault(x => x.Id == teamId);
            if (team == null)
                throw new HttpRequestException($"Team with id: {teamId} not found", null, HttpStatusCode.NotFound);

            if (loggedUser?.Id==null)  //role != "Admin" && loggedUser?.Id != team.CreatedByUserId //Aleksa dodao "svako logovan moze da se join-a u tim
                throw new HttpRequestException($"Unable to add user to team", null, HttpStatusCode.Unauthorized);

            team.Users.Add(context.Users.First(x => x.Id == userId));

            context.SaveChanges();
            return TeamMapper.EntityToResponse(team);
        }

        public TeamResponse CreateTeam(TeamRequest request, UserResponse loggedUser, string role)
        {
            var entity = new Team()
            {
                Name = request.Name,
                Color = request.Color, //dodato aleksa
                CreatedByUserId = loggedUser.Id
            };

            entity = context.Teams.Add(entity).Entity;
            context.SaveChanges();
            return TeamMapper.EntityToResponse(entity);
        }

        public void DeleteTeam(int id, UserResponse? loggedUser, string? role)
        {
            var team = context.Teams.FirstOrDefault(x => x.Id == id);

            if (team == null)
                throw new HttpRequestException($"Team with id: {id} not found", null, HttpStatusCode.NotFound);

            if (role != "Admin" && loggedUser?.Id != team.CreatedByUserId)
                throw new HttpRequestException($"Unable to delete team", null, HttpStatusCode.Unauthorized);

            context.Teams.Remove(team);
            context.SaveChanges();
        }

        public List<TeamResponse> GetAll()
        {
            var teams = context.Teams.Include(t => t.Users).ToList();
            var teamResponses = new List<TeamResponse>();
            foreach (var team in teams)
            {
                teamResponses.Add(new TeamResponse
                {
                    Id = team.Id,
                    Name = team.Name,
                    Color = team.Color, //dodao aleksa
                    Users = UserMapper.UsersToResponse(team.Users)
                });
            }
            return teamResponses;
        }

        public TeamResponse GetTeamById(int id)
        {
            var entity = context.Teams.Include(t => t.Users).FirstOrDefault(x => x.Id == id);
            if (entity == null)
                throw new HttpRequestException($"Team with id: {id} not found", null, HttpStatusCode.NotFound);
            return TeamMapper.EntityToResponse(entity);
        }

        public TeamResponse RemoveUserFromTeam(int teamId, int userId, UserResponse? loggedUser, string? role)
        {
            var entity = context.Teams.Include(t => t.Users).FirstOrDefault(x => x.Id == teamId);

            if (entity == null)
                throw new HttpRequestException($"Team with id: {teamId} not found", null, HttpStatusCode.NotFound);


            if (role != "Admin" && loggedUser?.Id != entity.CreatedByUserId && loggedUser?.Id != userId)  //Dodao aleksa "korisnik moze sam sebe da izbaci iz tima, dobro je imati tu opciju, a mozda je i slucajno uso
                throw new HttpRequestException($"Unable to delete team", null, HttpStatusCode.Unauthorized);

            entity.Users.Remove(context.Users.First(x => x.Id == userId));
            context.SaveChanges();

            return TeamMapper.EntityToResponse(entity);
        }

        public TeamResponse UpdateTeam(int id, TeamRequest value, UserResponse? loggedUser, string? role)
        {
            var entity = context.Teams.Include(t => t.Users).FirstOrDefault(x => x.Id == id);

            if (entity == null)
                throw new HttpRequestException($"Team with id: {id} not found", null, HttpStatusCode.NotFound);

            if (role != "Admin" && loggedUser?.Id != entity.CreatedByUserId)
                throw new HttpRequestException($"Unable to delete team", null, HttpStatusCode.Unauthorized);

            entity = context.Teams.Update(TeamMapper.RequestToEntity(value, entity)).Entity;
            context.SaveChanges();
            return TeamMapper.EntityToResponse(entity);
        }
    }
}
