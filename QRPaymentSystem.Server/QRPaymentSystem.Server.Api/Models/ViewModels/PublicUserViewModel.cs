using System.Collections.Generic;
using System.Linq;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Api.Models.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<MoneyAccountViewModel> MoneyAccounts { get; set; }
        public UserViewModel(User user) {
            Id = user.Id.ToString();
            FirstName = user.FirstName;
            LastName = user.LastName;
            MoneyAccounts = user.MoneyAccounts.Select(acc => new MoneyAccountViewModel(acc)).ToList();
        }
    }
}