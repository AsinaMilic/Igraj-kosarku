using Amazon.Runtime;
using igraj_kosarku_be.Models;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface IStorageService
    {
        Task<S3Response> UploadFileAsync(IFormFile file);
    }
}
