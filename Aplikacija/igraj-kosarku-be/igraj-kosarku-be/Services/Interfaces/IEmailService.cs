using MimeKit;

namespace igraj_kosarku_be.Services.Interfaces
{
    public interface IEmailService
    {
        public bool SendEmail(string to, string subject, string body);
    }
}
