using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using System.Net;
using Microsoft.EntityFrameworkCore;
using igraj_kosarku_be.Mappers;

namespace igraj_kosarku_be.Services
{
    public class CourtService : ICourtService
    {
        private readonly IConfiguration _configuration;
        private readonly IgrajKosarkuContext context;

        public CourtService(IConfiguration configuration)
        {
            _configuration = configuration;
            context = new IgrajKosarkuContext(_configuration);
        }

        public CourtResponse CreateCourt(CourtRequest value, UserResponse user, string? role)
        {
            var court = new Court()
            {
                ImageUrl = value.ImageUrl ?? string.Empty,
                LocationId = value.LocationId,
                Name = value.Name,
                Location = context.Locations.First(x => x.Id == value.LocationId)
            };

            court = context.Courts.Add(court).Entity;
            context.SaveChanges();
            return CourtMapper.EntityToResponse(court);
        }

        public void DeleteCourt(int id, UserResponse user, string? role)
        {
            var court = context.Courts.FirstOrDefault(x => x.Id == id);
            if (court == null)
                throw new HttpRequestException($"Court with id: {id} not found", null, HttpStatusCode.NotFound);

            context.Courts.Remove(court);
            context.SaveChanges();
        }

        public List<CourtResponse> GetAll()
        {
            var courts = context.Courts.Include(c => c.Location).ToList();
            var courtResponses = new List<CourtResponse>();
            foreach (var court in courts)
            {
                courtResponses.Add(new CourtResponse
                {
                    Id = court.Id,
                    ImageUrl = court.ImageUrl,
                    Location = court.Location,
                    Name = court.Name
                });
            }
            return courtResponses;
        }

        public CourtResponse GetCourtById(int id)
        {
            var court = context.Courts.Include(c => c.Location).FirstOrDefault(x => x.Id == id);
            if (court == null)
                throw new HttpRequestException($"Court with id: {id} not found", null, HttpStatusCode.NotFound);
            return CourtMapper.EntityToResponse(court);
        }

        public CourtResponse UpdateCourt(int id, CourtRequest value, UserResponse user, string? role)
        {
            var court = context.Courts.FirstOrDefault(x => x.Id == id);
            if (court == null)
                throw new HttpRequestException($"Court with id: {id} not found", null, HttpStatusCode.NotFound);

            court = context.Courts.Update(CourtMapper.RequestToEntity(value, court)).Entity;
            context.SaveChanges();
            return CourtMapper.EntityToResponse(court);
        }
    }
}
