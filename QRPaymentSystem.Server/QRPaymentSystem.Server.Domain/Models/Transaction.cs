using System;
using QRPaymentSystem.Server.Domain.Enums;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class Transaction : Entity
    {
        public Transaction() : base()
        {
            PaymentDate = DateTime.UtcNow;
        }

        // public virtual TransactionInfo TransactionInfo { get; set; }
        

        public int Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public Guid FromMoneyAccountId { get; set; }
        public Guid ToMoneyAccountId { get; set; }
        public virtual MoneyAccount FromMoneyAccount { get; set; }
        public virtual MoneyAccount ToMoneyAccount { get; set; }
    }
}
