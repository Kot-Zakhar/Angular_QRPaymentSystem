using System.Linq;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository
{
    public interface IMoneyAccountRepository : IRepository<MoneyAccount>
    {
        IQueryable<MoneyAccount> GetByUserId(System.Guid userId);
    }
}