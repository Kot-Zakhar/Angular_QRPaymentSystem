using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Api.Models;
using QRPaymentSystem.Server.Api.Models.DbModels;

namespace QRPaymentSystem.Server.Api.Data
{
    public class QRPaymentSystemDbContext : IdentityDbContext<IdentityProfile>
    {
        public QRPaymentSystemDbContext(DbContextOptions<QRPaymentSystemDbContext> options) : base(options)
        { }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Scan> Scans { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionInfo> TransactionInfos { get; set; }
    }
}
