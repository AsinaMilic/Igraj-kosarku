using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface ICourtService
    {
        List<CourtResponse> GetAll();
        CourtResponse GetCourtById(int id);
        CourtResponse CreateCourt(CourtRequest value, UserResponse LoggedUser, string? role);
        CourtResponse UpdateCourt(int id, CourtRequest value, UserResponse LoggedUser, string? role);
        void DeleteCourt(int id, UserResponse LoggedUser, string? role);
    }
}
