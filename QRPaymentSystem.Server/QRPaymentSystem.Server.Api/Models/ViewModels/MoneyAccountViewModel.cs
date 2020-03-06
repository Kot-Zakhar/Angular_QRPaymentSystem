using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Api.Models.ViewModels
{
    public class MoneyAccountViewModel
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public MoneyAccountViewModel (MoneyAccount account) {
            this.Name = account.Name;
            this.Id = account.Id.ToString();
        }
    }
}