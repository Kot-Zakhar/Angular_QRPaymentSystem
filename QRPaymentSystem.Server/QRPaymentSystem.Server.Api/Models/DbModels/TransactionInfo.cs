using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using QRPaymentSystem.Server.Api.Models.Enums;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    [FormGroup]
    public class TransactionInfo : Entity
    {
        public TransactionInfoType Type { get; set; }

        [ForeignKey("FromAssetId")]        
        public virtual Asset FromAsset { get; set; }

        [ForeignKey("ToAssetId")]
        public virtual Asset ToAsset { get; set; }

        public TransactionStatus Status { get; set; }

        public int Amount { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpirationDate { get; set; }
        
        public DateTime NotBeforeDate { get; set; }

        public int MaxTransactionsQuantity { get; set; }

        public virtual IdentityProfile Creator { get; set; }

        public virtual IList<Transaction> Transactions { get; set; }
        public virtual IList<Scan> Scans { get; set; }
    }
}
