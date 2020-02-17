using Microsoft.Extensions.DependencyInjection;
using QRPaymentSystem.Server.Application.Services.Implementations;
using QRPaymentSystem.Server.Application.Services;

namespace QRPaymentSystem.Server.Api
{
    public static class ServicesInjector
    {
        public static void AddServices(this IServiceCollection services) {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            // services.AddScoped<TransactionInfoService>();

        }
    }
}