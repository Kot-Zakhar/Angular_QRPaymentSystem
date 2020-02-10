using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    public class Asset : Entity
    {
        public Asset() : base() { }

        [Required]
        public string Name { get; set; }

        [Required]
        [ForeignKey("OwnerId")]
        public virtual IdentityProfile Owner { get; set; }

        [Required]
        public string Number { get; set; }

        [MaxLength(34)]
        public string IBAN { get; set; }

        public string Currency { get; set; }

        public virtual IList<Transaction> FromAssetTransactions { get; set; }
        public virtual IList<Transaction> ToAssetTransactions { get; set; }
        public virtual IList<TransactionInfo> FromAssetTransactionInfos { get; set; }
        public virtual IList<TransactionInfo> ToAssetTransactionInfos { get; set; }
    }
}
