using System.Linq;
using System.Security.Claims;
using QRPaymentSystem.Server.Domain.Models;
using QRPaymentSystem.Server.Repository;

namespace QRPaymentSystem.Server.Application.Services.Implementations
{
    public class MoneyAccountService : IMoneyAccountService
    {
        private IMoneyAccountRepository _moneyAccountRepository;

        public MoneyAccountService(IMoneyAccountRepository moneyAccountRepository)
        {
            _moneyAccountRepository = moneyAccountRepository;
        }

        public MoneyAccount CreateUserMoneyAccount(MoneyAccount account)
        {
            return _moneyAccountRepository.Create(account);
        }

        public IQueryable<MoneyAccount> GetByOwnerId(System.Guid ownerId)
        {
            return _moneyAccountRepository.GetByUserId(ownerId);
        }
    }
}