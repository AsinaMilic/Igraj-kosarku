using DbServices;
using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Mappers
{
    public class LocationMapper
    {
        public static LocationResponse? EntityToItem(Location? location)
        {
            if (location == null) return null;
            return new LocationResponse()
            {
                Id = location.Id,
                Name = location.Name,
                Lat = location.Lat,
                Lng = location.Lng,
            };
        }
    }
}
