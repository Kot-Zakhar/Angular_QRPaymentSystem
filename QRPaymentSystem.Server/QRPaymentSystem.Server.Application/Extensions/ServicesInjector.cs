using Microsoft.Extensions.DependencyInjection;
using QRPaymentSystem.Server.Application.Services.Implementations;
using QRPaymentSystem.Server.Application.Services;

namespace QRPaymentSystem.Server.Application.Extensions
{
    public static class ServicesInjector
    {
        public static void AddServices(this IServiceCollection services) {
            // services.AddScoped<TransactionInfoService>();
            services.AddScoped<IMoneyAccountService, MoneyAccountService>();
            services.AddScoped<IUserService, UserService>();
        }
    }
}