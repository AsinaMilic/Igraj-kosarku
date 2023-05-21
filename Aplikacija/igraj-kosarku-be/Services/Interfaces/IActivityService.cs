using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface IActivityService
    {
        Task<List<ActivityResponse>> GetAll();
        Task<ActivityResponse> GetActivityById(int id);
        Task<ActivityResponse> CreateActivity(ActivityRequest value, UserResponse user, string? role);
        Task<ActivityResponse> UpdateActivity(int id, ActivityRequest value, UserResponse user, string? role);
        void DeleteActivity(int id, UserResponse user, string? role);
        Task<ActivityResponse> JoinActivity(int teamId, int activityId);
        Task<RatingResponse> RateActivity(int activityId, UserResponse loggedUser, int rating);
    }
}
