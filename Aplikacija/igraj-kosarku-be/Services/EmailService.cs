using Google.Apis.Auth.OAuth2;
using igraj_kosarku_be.Helpers;
using igraj_kosarku_be.Services.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace igraj_kosarku_be.Services
{
    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public bool SendEmail(string to, string subject, string body)
        {
            // create email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("igraj.kosarku.service@gmail.com"));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain) { Text = body };



            //string clientId = "185224047578-dkkuei6ngd16mpu80n6n24lvrmvrs37r.apps.googleusercontent.com";
            //string clientSecret = "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";
            //string[] scopes = new string[] { "https://mail.google.com/" };
            //ClientSecrets clientSecrets = new()
            //{
            //    ClientId = clientId,
            //    ClientSecret = clientSecret
            //};
            ////Requesting authorization
            //UserCredential userCredential = GoogleWebAuthorizationBroker.AuthorizeAsync(clientSecrets, scopes, "user", CancellationToken.None).Result;
            ////Authorization granted or not required (if the saved access token already available)
            //if (userCredential.Token.IsExpired(userCredential.Flow.Clock))
            //{
            //    //The access token has expired, refreshing it
            //    if (!userCredential.RefreshTokenAsync(CancellationToken.None).Result)
            //    {
            //        return false;
            //    }
            //}

            //using (var client = new SmtpClient())
            //{
            //    client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            //    var oauth2 = new SaslMechanismOAuth2("igraj.kosarku.service@gmail.com", userCredential.Token.AccessToken);
            //    client.Authenticate(oauth2);
            //    client.Send(email);
            //    client.Disconnect(true);
            //}
            //return true;

            // send email
            using var smtp = new SmtpClient();
            //smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            //smtp.Authenticate("igraj.kosarku.service@gmail.com", "IgrajKosarku123");
            smtp.Connect("email-smtp.eu-central-1.amazonaws.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("AKIATEE7BPBNVANNR3VT", "BLi9BtAVgqHpgmB5l/XJ9+lqY2xFoD9q7vrNMP4nOS6E");
            smtp.Send(email);
            smtp.Disconnect(true);
            return true;
        }
    }
}
