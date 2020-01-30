using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using QRPaymentSystem.Server.Api.Models.Enums;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    [FormGroup]
    public class TransactionInfo : Entity
    {
        [FormField(required: true, display: false)]
        public TransactionInfoType Type { get; set; }

        [ForeignKey("FromAssetId")]
        
        public virtual Asset FromAsset { get; set; }

        [ForeignKey("ToAssetId")]
        public virtual Asset ToAsset { get; set; }

        [FormField("Status")]
        public TransactionStatus Status { get; set; }

        [FormField("Amount", required: true, editable: true)]
        public int Amount { get; set; }

        [FormField("Creation date")]
        public DateTime CreationDate { get; set; }

        [FormField("Expiration date")]
        public DateTime ExpirationDate { get; set; }
        
        [FormField("Start date")]
        public DateTime NotBeforeDate { get; set; }

        [FormField("Transactions quantity")]
        public int MaxTransactionsQuantity { get; set; }

        [ForeignKey("CreatorId")]
        public virtual IdentityProfile Creator { get; set; }

        public virtual IList<Transaction> Transactions { get; set; }
        public virtual IList<Scan> Scans { get; set; }
    }
}
