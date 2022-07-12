using DbServices;
using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Mappers
{
    public class CourtMapper
    {
        public static CourtResponse EntityToResponse(Court court)
        {
            return new CourtResponse
            {
                Id = court.Id,
                ImageUrl = court.ImageUrl,
                Location = court.Location,
                Name = court.Name
            };
        }        
        public static Court RequestToEntity(CourtRequest courtR, Court courtE)
        {
            courtE.LocationId = courtR.LocationId;
            courtE.Name = courtR.Name;
            courtE.ImageUrl = courtR.ImageUrl ?? string.Empty;
            return courtE;
        }
    }
}
