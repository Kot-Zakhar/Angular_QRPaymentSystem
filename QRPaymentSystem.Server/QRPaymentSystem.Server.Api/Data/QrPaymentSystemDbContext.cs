using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Api.Models;

namespace QRPaymentSystem.Server.Api.Data
{
    public class QrPaymentSystemDbContext : IdentityDbContext<IdentityProfile>
    {
        public QrPaymentSystemDbContext(DbContextOptions<QrPaymentSystemDbContext> options) : base(options)
        { }

        public DbSet<Asset> Assets { get; set; }
    }
}
