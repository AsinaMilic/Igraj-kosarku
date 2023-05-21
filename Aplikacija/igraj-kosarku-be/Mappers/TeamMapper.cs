using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Mappers
{
    public class TeamMapper
    {
        public static TeamResponse EntityToResponse(Team team)
        {
            return new TeamResponse
            {
                Id = team.Id,
                Name = team.Name,
                Color = team.Color, //jel sam ovo ja dodao? - aleksa
                Users = UserMapper.UsersToResponse(team.Users)
            };
        }
        public static Team RequestToEntity(TeamRequest teamR, Team teamE)
        {
            teamE.Name = teamR.Name;
            return teamE;
        }

        internal static List<TeamResponse> EntitiesToResponse(List<Team> teams)
        {
            var teamResponses = new List<TeamResponse>();
            teams.ForEach(x =>
            {
                teamResponses.Add(EntityToResponse(x));
            });
            return teamResponses;
        }
    }
}
