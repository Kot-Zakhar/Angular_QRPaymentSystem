using System.Linq;
using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework.Repositories
{
    public class MoneyAccountRepository : Repository<MoneyAccount>, IMoneyAccountRepository
    {
        private readonly QRPaymentSystemDbContext _context;

        public MoneyAccountRepository(QRPaymentSystemDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<MoneyAccount> GetByUserId(System.Guid userId)
        {
            return _context.MoneyAccounts.Where(account => account.OwnerIdentityId == userId);
        }
    }
}