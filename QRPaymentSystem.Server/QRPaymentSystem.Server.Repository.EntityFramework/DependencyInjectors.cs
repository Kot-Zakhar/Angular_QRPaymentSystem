using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QRPaymentSystem.Server.Repository.EntityFramework.QRDbContext;
using QRPaymentSystem.Server.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public static class DependencyInjectors
    {
        public static void AddContextWithIdentity(this IServiceCollection services, IConfiguration configuration) {
            services.AddDbContext<QRPaymentSystemDbContext>(options => 
                options.UseMySql(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentityCore<User>()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<QRPaymentSystemDbContext>();
        }

        public static void AddUnitOfWork(this IServiceCollection services) {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}