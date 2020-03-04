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

            builder.Entity<MoneyAccount>(entity => {
                entity.ToTable("money_accounts");

                entity.HasIndex(e => e.OwnerIdentityId)
                    .HasName("fk_money_accounts_users_idx");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
                
                entity.Property(e => e.OwnerIdentityId)
                    .IsRequired()
                    .HasColumnName("users_identity_id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(e => e.Owner)
                    .WithMany(p => p.MoneyAccounts)
                    .HasForeignKey(d => d.OwnerIdentityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_money_accounts_users");
            });

            builder.Entity<Transaction>(entity => {
                entity.ToTable("transactions");

                entity.HasIndex(e => e.FromMoneyAccountId)
                    .HasName("fk_transactions_money_accounts1_idx");

                entity.HasIndex(e => e.ToMoneyAccountId)
                    .HasName("fk_transactions_money_accounts2_idx");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Amount)
                    .HasColumnName("amount")
                    .HasColumnType("int");

                entity.Property(e => e.PaymentDate)
                    .HasColumnName("date")
                    .HasColumnType("datetime");
                
                entity.Property(e => e.FromMoneyAccountId)
                    .IsRequired()
                    .HasColumnName("from_money_account_id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.FromMoneyAccountId)
                    .IsRequired()
                    .HasColumnName("to_money_account_id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
                    
                entity.HasOne(d => d.FromMoneyAccount)
                    .WithMany(p => p.FromAssetTransactions)
                    .HasForeignKey(d => d.FromMoneyAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_transactions_money_accounts1");

                entity.HasOne(d => d.ToMoneyAccount)
                    .WithMany(p => p.ToAssetTransactions)
                    .HasForeignKey(d => d.ToMoneyAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_transactions_money_accounts2");
            });

            builder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasKey(e => e.Id)
                    .HasName("identity_id");

                entity.Property(e => e.Id)
                    .HasColumnName("identity_id")
                    .HasColumnType("varchar(36)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
                
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
                    
                entity.Property(e => e.LastName)
                    .HasColumnName("last_name")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasMany(e => e.MoneyAccounts)
                    .WithOne(e => e.Owner)
                    .HasForeignKey(e => e.OwnerIdentityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_money_accounts_users");
            });
        }

        public virtual DbSet<MoneyAccount> MoneyAccounts { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }
        public virtual DbSet<User> Users { get; set; }
        // public DbSet<Scan> Scans { get; set; }
        // public DbSet<TransactionInfo> TransactionInfos { get; set; }
    }
}
