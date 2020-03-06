using System.Linq;
using System.Security.Claims;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Application.Services
{
    public interface IMoneyAccountService
    {
        IQueryable<MoneyAccount> GetByOwnerId(System.Guid ownerId);
        MoneyAccount CreateUserMoneyAccount(MoneyAccount account);
    }
}