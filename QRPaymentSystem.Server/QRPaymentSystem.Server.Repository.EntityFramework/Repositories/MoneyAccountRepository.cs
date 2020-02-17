using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class MoneyAccountRepository : Repository<MoneyAccount>, IMoneyAccountRepository
    {
        public MoneyAccountRepository(DbContext context) : base(context)
        {
        }
    }
}