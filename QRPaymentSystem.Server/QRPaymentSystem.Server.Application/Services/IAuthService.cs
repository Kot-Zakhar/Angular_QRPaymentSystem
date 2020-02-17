using QRPaymentSystem.Server.Domain.Models;
using QRPaymentSystem.Server.Application.Models;

namespace QRPaymentSystem.Server.Application.Services
{
    public interface IAuthService
    {
        bool AreCredentialsValid(LoginModel userCredentials);
        AuthorizationResult Authorize(User user);
    }
}