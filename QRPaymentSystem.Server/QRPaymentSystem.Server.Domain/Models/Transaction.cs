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

        public virtual TransactionInfo TransactionInfo { get; set; }
        
        public virtual MoneyAccount FromAsset { get; set; }

        public virtual MoneyAccount ToAsset { get; set; }

        public int Amount { get; set; }
        public double ExchangeRate { get; set; }

        public DateTime PaymentDate { get; set; }
        public TransactionStatus Status { get; set; }

    }
}
