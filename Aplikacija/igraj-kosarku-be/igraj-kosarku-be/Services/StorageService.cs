using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Transfer;
using igraj_kosarku_be.Helpers;
using igraj_kosarku_be.Models;
using igraj_kosarku_be.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;

namespace igraj_kosarku_be.Services
{
    public class StorageService : IStorageService
    {
        //private readonly IConfigurationManager _config;

        private readonly AppSettings _appSettings;

        public StorageService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<S3Response> UploadFileAsync(IFormFile file)
        {
            // Process file
            await using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var fileExt = Path.GetExtension(file.FileName);
            var docName = $"{Guid.NewGuid()}{fileExt}";
            // call server

            var obj = new S3Object()
            {
                BucketName = "igraj-kosarku",
                InputStream = memoryStream,
                Name = docName
            };

            var credentials = new BasicAWSCredentials(_appSettings.AccessKey, _appSettings.SecretKey);

            var config = new AmazonS3Config()
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUCentral1
            };

            var response = new S3Response();
            try
            {
                var uploadRequest = new TransferUtilityUploadRequest()
                {
                    InputStream = obj.InputStream,
                    Key = obj.Name,
                    BucketName = obj.BucketName,
                    CannedACL = S3CannedACL.NoACL
                };

                // initialise client
                using var client = new AmazonS3Client(credentials, config);

                // initialise the transfer/upload tools
                var transferUtility = new TransferUtility(client);

                // initiate the file upload
                await transferUtility.UploadAsync(uploadRequest);

                response.StatusCode = 201;
                response.Message = $"{obj.Name}";
            }
            catch (AmazonS3Exception s3Ex)
            {
                response.StatusCode = (int)s3Ex.StatusCode;
                response.Message = s3Ex.Message;
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
