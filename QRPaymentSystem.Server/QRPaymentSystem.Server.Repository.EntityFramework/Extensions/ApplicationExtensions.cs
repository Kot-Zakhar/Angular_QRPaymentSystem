using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Repository.EntityFramework.Repositories;
using Microsoft.AspNetCore.Builder;

namespace QRPaymentSystem.Server.Repository.EntityFramework.Extensions
{
    public static class ApplicationExtensions
    {
        public static void AddApplicationContext(this IServiceCollection services, IConfiguration configuration) {
            services.AddDbContext<QRPaymentSystemDbContext>(options => 
                options.UseMySql(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("QRPaymentSystem.Server.Repository.EntityFramework")));
        }

        public static void EnsureApplicationContextCreated(this IApplicationBuilder app) {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<QRPaymentSystemDbContext>();
                context.Database.EnsureCreated();
            }
        }

        public static void AddRepositories(this IServiceCollection services) {
            services.AddScoped<IMoneyAccountRepository, MoneyAccountRepository>();
            services.AddScoped<IScanRepository, ScanRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<ITransactionInfoRepository, TransactionInfoRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}