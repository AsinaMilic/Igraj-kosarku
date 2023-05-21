namespace igraj_kosarku_be.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string BaseUrl { get; set; } = null!;
        public string BucketUrl { get; set; } = null!;
        public string AccessKey { get; set; } = "";
        public string SecretKey { get; set; } = "";
    }
}
