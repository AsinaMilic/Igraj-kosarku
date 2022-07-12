using DbServices;
using igraj_kosarku_be.Helpers;
using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.Net;
using igraj_kosarku_be.Mappers;

namespace igraj_kosarku_be.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IConfiguration _configuration;
        private readonly IgrajKosarkuContext context;

        public ActivityService(IOptions<AppSettings> appSettings, IConfiguration configuration)
        {
            _configuration = configuration;
            context = new IgrajKosarkuContext(_configuration);
        }

        public async Task<List<ActivityResponse>> GetAll()
        {
            var activities = await context.Activities
                .Include(a => a.CreatedByUser)
                .Include(a => a.CreatedByUser.Role)
                .Include(a => a.Category)
                .Include(a => a.Location)
                .Include(a => a.Teams)
                .Include(a => a.Ratings)
                .ToListAsync();

            var activityResponses = new List<ActivityResponse>();
            foreach (var activity in activities)
            {
                double rating = 0;
                if (activity.Ratings.Count > 0)
                {
                    var ratings = activity.Ratings;
                    int rates = 0;
                    foreach (var r in ratings)
                    {
                        rating += r.Rated;
                        rates++;
                    }
                    rating /= rates;
                }

                activityResponses.Add(new ActivityResponse
                {
                    Id = activity.Id,
                    ActivityDateTime = activity.ActivityDateTime,
                    Category = activity.Category,
                    Description = activity.Description,
                    Location = LocationMapper.EntityToItem(activity.Location),
                    Name = activity.Name,
                    CreatedByUser = UserMapper.UserToResponse(activity.CreatedByUser),
                    NumberOfPlayers = activity.NumberOfPlayers,
                    CourtId = activity.CourtId,
                    Url = activity.Url,
                    Teams = TeamMapper.EntitiesToResponse(activity.Teams),
                    Rating = rating
                });
            }
            return activityResponses;
        }

        public async Task<ActivityResponse> GetActivityById(int id)
        {
            var activity = await context.Activities
                .Include(a => a.CreatedByUser)
                .Include(a => a.CreatedByUser.Role)
                .Include(a => a.Category)
                .Include(a => a.Location)
                .Include(a => a.Teams)
                    .ThenInclude(team=>team.Users)  //Dodao aleksa, trebali su mi i user-i 
                .Include(a => a.Ratings)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (activity == null)
                throw new HttpRequestException($"Activity with id: {id} not found", null, HttpStatusCode.NotFound);

            double rating = 0;
            if (activity.Ratings.Count > 0)
            {
                var ratings = activity.Ratings;
                int rates = 0;
                foreach (var r in ratings)
                {
                    rating += r.Rated;
                    rates++;
                }
                rating /= rates;
            }

            return new ActivityResponse
            {
                Id = activity.Id,
                ActivityDateTime = activity.ActivityDateTime,
                Category = activity.Category,
                Description = activity.Description,
                Location = LocationMapper.EntityToItem(activity.Location),
                Name = activity.Name,
                CreatedByUser = UserMapper.UserToResponse(activity.CreatedByUser),
                NumberOfPlayers = activity.NumberOfPlayers,
                CourtId = activity.CourtId,
                Url = activity.Url,
                Teams = TeamMapper.EntitiesToResponse(activity.Teams),
                Rating = rating
            };
        }

        public async Task<ActivityResponse> CreateActivity(ActivityRequest value, UserResponse user, string? role)
        {
            var location = await context.Locations.FirstOrDefaultAsync(x => x.Name == value.Location.Name) ??
                new Location()
                {
                    Name = value.Location.Name,
                    Lat = value.Location.Lat,
                    Lng = value.Location.Lng
                };

            if (location.Id.Equals(0L))
            {
                location = context.Locations.Add(location).Entity;
                await context.SaveChangesAsync();
            }

            var activity = new Activity
            {
                ActivityDateTime = value.ActivityDateTime.ToUniversalTime(),
                Category = await context.Categories.FirstAsync(x => x.Id == value.CategoryId),
                Description = value.Description ?? "",
                Location = location,
                Name = value.Name,
                CreatedByUserId = user.Id,
                NumberOfPlayers = value.NumberOfPlayers,
                CourtId = value.CourtId,
                Url = value.Url
            };

            context.Activities.Add(activity);
            await context.SaveChangesAsync();

            return new ActivityResponse()
            {
                Id = activity.Id,
                ActivityDateTime = activity.ActivityDateTime,
                Category = activity.Category,
                Description = activity.Description,
                Location = LocationMapper.EntityToItem(activity.Location),
                Name = activity.Name,
                CreatedByUser = user,
                NumberOfPlayers = value.NumberOfPlayers,
                CourtId = value.CourtId,
                Url = activity.Url
            };
        }

        public async Task<ActivityResponse> UpdateActivity(int id, ActivityRequest value, UserResponse user, string? role)
        {
            var activity = await context.Activities.FirstOrDefaultAsync(x => x.Id == id);
            if (activity == null)
                throw new HttpRequestException($"Activity with id: {id} not found", null, HttpStatusCode.NotFound);

            if (activity.CreatedByUser.Id != user.Id && role != "Admin")
                throw new HttpRequestException($"Unable to delete activity of another user", null, HttpStatusCode.Unauthorized);

            var location = context.Locations.FirstOrDefault(x => x.Name == value.Location.Name) ??
                new Location()
                {
                    Name = value.Location.Name,
                    Lat = value.Location.Lat,
                    Lng = value.Location.Lng
                };

            if (location.Id.Equals(0L))
            {
                location = context.Locations.Add(location).Entity;
                context.SaveChanges();
            }

            activity.ActivityDateTime = value.ActivityDateTime;
            activity.CategoryId = value.CategoryId;
            activity.Description = value.Description ?? "";
            activity.Location = location;
            activity.Name = value.Name;
            activity.NumberOfPlayers = value.NumberOfPlayers;
            activity.CourtId = value.CourtId;
            activity.Url = value.Url;

            activity = context.Activities.Update(activity).Entity;

            context.SaveChanges();
            return new ActivityResponse()
            {
                Id = activity.Id,
                ActivityDateTime = activity.ActivityDateTime,
                Category = activity.Category,
                Description = activity.Description,
                Location = LocationMapper.EntityToItem(activity.Location),
                Name = activity.Name,
                CreatedByUser = UserMapper.UserToResponse(activity.CreatedByUser),
                NumberOfPlayers = value.NumberOfPlayers,
                CourtId = value.CourtId,
                Url = activity.Url
            };
        }

        public async void DeleteActivity(int id, UserResponse user, string? role)
        {
            var activity = await context.Activities.FirstOrDefaultAsync(x => x.Id == id);
            if (activity == null)
                throw new HttpRequestException($"Activity with id: {id} not found", null, HttpStatusCode.NotFound);

            if (activity.CreatedByUserId != user.Id && role != "Admin")
                throw new HttpRequestException($"Unable to delete comment of another user", null, HttpStatusCode.Unauthorized);

            context.Activities.Remove(activity);
            await context.SaveChangesAsync();
        }

        public async Task<ActivityResponse> JoinActivity(int teamId, int activityId)
        {
            var team = await context.Teams.FirstAsync(t => t.Id == teamId);
            if (team == null)
                throw new HttpRequestException($"Team with id: {teamId} not found", null, HttpStatusCode.NotFound);

            var activity = await context.Activities
                .Include(a => a.CreatedByUser)
                .Include(a => a.Teams)
                .Include(a => a.Category)
                .Include(a => a.Location)
                .FirstAsync(a => a.Id == activityId);

            if (activity == null)
                throw new HttpRequestException($"Activity with id: {activityId} not found", null, HttpStatusCode.NotFound);

            if (activity.Teams.Contains(team))
                throw new HttpRequestException($"Team: {team.Name} has already joined", null, HttpStatusCode.BadRequest);

            activity.Teams.Add(team);
            activity = context.Activities.Update(activity).Entity;

            await context.SaveChangesAsync();

            return new ActivityResponse()
            {
                Id = activity.Id,
                ActivityDateTime = activity.ActivityDateTime,
                Category = activity.Category,
                Description = activity.Description,
                Location = LocationMapper.EntityToItem(activity.Location),
                Name = activity.Name,
                CreatedByUser = UserMapper.UserToResponse(activity.CreatedByUser),
                NumberOfPlayers = activity.NumberOfPlayers,
                CourtId = activity.CourtId,
                Url = activity.Url,
                Teams = TeamMapper.EntitiesToResponse(activity.Teams)
            };
        }

        public async Task<RatingResponse> RateActivity(int activityId, UserResponse loggedUser, int rating)
        {
            var activity = await context.Activities
                .Include(a => a.CreatedByUser)
                .Include(a => a.Category)
                .Include(a => a.Location)
                .FirstAsync(a => a.Id == activityId);

            if (activity == null)
                throw new HttpRequestException($"Activity with id: {activityId} not found", null, HttpStatusCode.NotFound);

            var existingRating = await context.Ratings.FirstOrDefaultAsync(r => r.CreatedByUserId == loggedUser.Id && r.ActivityId == activityId);
            Rating? r;

            if (existingRating != null)
            {
                existingRating.Rated = rating;
                r = context.Ratings.Update(existingRating).Entity;
                await context.SaveChangesAsync();
            }
            else
            {
                r = new Rating()
                {
                    Activity = activity,
                    CreatedByUserId = loggedUser.Id,
                    Rated = rating
                };
                r = context.Ratings.Add(r).Entity;
                await context.SaveChangesAsync();
            }

            return new RatingResponse()
            {
                Id = r.Id,
                ActivityId = r.ActivityId,
                Rated = r.Rated
            };
        }
    }
}
