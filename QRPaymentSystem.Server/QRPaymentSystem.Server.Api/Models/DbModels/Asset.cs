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
        public IdentityProfile Owner { get; set; }

        [MaxLength(34)]
        public string IBAN { get; set; }

        public string Currency { get; set; }

        public virtual IList<Transaction> Transactions { get; set; }
        public virtual IList<TransactionInfo> TransactionInfos { get; set; }
    }
}
