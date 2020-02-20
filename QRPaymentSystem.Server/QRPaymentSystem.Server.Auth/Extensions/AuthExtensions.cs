using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using QRPaymentSystem.Server.Auth.Data;
using QRPaymentSystem.Server.Auth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Builder;

namespace QRPaymentSystem.Server.Auth.Extensions
{
    public static class AuthExtensions
    {
        public static void AddAuthContext(this IServiceCollection services, IConfiguration configuration) {
            services.AddDbContext<AuthDbContext>(options => 
                options.UseMySql(configuration.GetConnectionString("DefaultConnection"))
            );

            services.AddDefaultIdentity<AuthIdentityUser>()
                .AddUserManager<UserManager<AuthIdentityUser>>()
                .AddEntityFrameworkStores<AuthDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<AuthIdentityUser, AuthDbContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();
        }

        public static void EnsureAuthContextCreated(this IApplicationBuilder app) {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<AuthDbContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}