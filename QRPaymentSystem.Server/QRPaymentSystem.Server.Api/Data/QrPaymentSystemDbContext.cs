using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Api.Models.DbModels;

namespace QRPaymentSystem.Server.Api.Data
{
    public class QRPaymentSystemDbContext : IdentityDbContext<IdentityProfile>
    {
        public QRPaymentSystemDbContext(DbContextOptions<QRPaymentSystemDbContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Asset>()
                .HasMany(a => a.FromAssetTransactionInfos)
                .WithOne(t => t.FromAsset);
            builder.Entity<Asset>()
                .HasMany(a => a.ToAssetTransactionInfos)
                .WithOne(t => t.ToAsset);
            builder.Entity<Asset>()
                .HasMany(a => a.FromAssetTransactions)
                .WithOne(t => t.FromAsset)
                .IsRequired();
            builder.Entity<Asset>()
                .HasMany(a => a.ToAssetTransactions)
                .WithOne(t => t.ToAsset)
                .IsRequired();
        }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Scan> Scans { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionInfo> TransactionInfos { get; set; }
    }
}
