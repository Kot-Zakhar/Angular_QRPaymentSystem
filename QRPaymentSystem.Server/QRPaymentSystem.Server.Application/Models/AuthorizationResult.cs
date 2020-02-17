namespace QRPaymentSystem.Server.Application.Models
{
    public class AuthorizationResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}