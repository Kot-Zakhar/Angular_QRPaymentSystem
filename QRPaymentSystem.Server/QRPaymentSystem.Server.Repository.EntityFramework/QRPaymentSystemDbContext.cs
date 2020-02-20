using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class QRPaymentSystemDbContext : DbContext
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

            builder.Entity<MoneyAccount>()
                .HasMany(a => a.FromAssetTransactionInfos)
                .WithOne(t => t.FromAsset);
            builder.Entity<MoneyAccount>()
                .HasMany(a => a.ToAssetTransactionInfos)
                .WithOne(t => t.ToAsset);
            builder.Entity<MoneyAccount>()
                .HasMany(a => a.FromAssetTransactions)
                .WithOne(t => t.FromAsset)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<MoneyAccount>()
                .HasMany(a => a.ToAssetTransactions)
                .WithOne(t => t.ToAsset)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }

        public DbSet<MoneyAccount> MoneyAccounts { get; set; }
        public DbSet<Scan> Scans { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionInfo> TransactionInfos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
