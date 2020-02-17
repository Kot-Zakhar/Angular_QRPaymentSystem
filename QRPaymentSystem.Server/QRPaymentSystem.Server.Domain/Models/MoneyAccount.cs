using System.Collections.Generic;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class MoneyAccount : Entity
    {
        public string Name { get; set; }

        public virtual User Owner { get; set; }

        public string Number { get; set; }

        public string IBAN { get; set; }

        public string Currency { get; set; }

        public virtual IList<Transaction> FromAssetTransactions { get; set; }
        public virtual IList<Transaction> ToAssetTransactions { get; set; }
        public virtual IList<TransactionInfo> FromAssetTransactionInfos { get; set; }
        public virtual IList<TransactionInfo> ToAssetTransactionInfos { get; set; }
    }
}
