using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using QRPaymentSystem.Server.Application.Models;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Application.Services
{
    public interface IUserService
    {
        Task<User> FindByCredentialsAsync(LoginModel userCredentials);
        Task<User> GetByUsernameAsync(string username);
        Task<IdentityResult> Register(RegistrationModel userCredentials);
    }
}
