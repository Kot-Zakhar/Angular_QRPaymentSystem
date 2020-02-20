using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QRPaymentSystem.Server.Auth.Models;

namespace QRPaymentSystem.Server.Auth.Data
{
    public class AuthDbContext : ApiAuthorizationDbContext<AuthIdentityUser>
    {
        public AuthDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions
        ) : base(options, operationalStoreOptions)
        {
            
        }
    }
}