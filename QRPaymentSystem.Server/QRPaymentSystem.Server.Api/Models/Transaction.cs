using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace QRPaymentSystem.Server.Api.Models
{
    public class Transaction
    {
        public Guid Id { get; }

        [ForeignKey("FromAssetId")]
        public virtual Asset FromAsset { get; set; }

        [ForeignKey("ToAssetId")]
        public virtual Asset ToAsset { get; set; }

        public int? Amount { get; set; }
        public string Currency { get; set; }
        public DateTime CreationDateTime { get; }
        public DateTime ExpirationDateTime { get; set; }
        public DateTime NotBeforeDateTime { get; set; }

        [ForeignKey("CreatorId")]
        public virtual IdentityProfile Creator { get; set; }
        
        public int Quantity { get; set; }
        public TransactionStatus Status { get; set; }

        public Transaction()
        {
            Id = Guid.NewGuid();
            CreationDateTime = DateTime.UtcNow;
        }
    }
}
