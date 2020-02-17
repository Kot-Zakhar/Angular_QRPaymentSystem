using System;
using System.Collections.Generic;
using QRPaymentSystem.Server.Domain.Enums;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class TransactionInfo : Entity
    {
        public TransactionInfoType Type { get; set; }

        public virtual MoneyAccount FromAsset { get; set; }

        public virtual MoneyAccount ToAsset { get; set; }

        public TransactionStatus Status { get; set; }

        public int Amount { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpirationDate { get; set; }
        
        public DateTime NotBeforeDate { get; set; }

        public int MaxTransactionsQuantity { get; set; }

        public virtual User Creator { get; set; }

        public virtual IList<Transaction> Transactions { get; set; }
        public virtual IList<Scan> Scans { get; set; }
    }
}
