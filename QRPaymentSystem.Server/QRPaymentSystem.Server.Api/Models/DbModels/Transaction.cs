using System;
using System.ComponentModel.DataAnnotations.Schema;
using QRPaymentSystem.Server.Api.Models.Enums;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    public class Transaction : Entity
    {
        public Transaction()
        {
            Id = Guid.NewGuid();
            PaymentDate = DateTime.UtcNow;
        }

        [ForeignKey("TransactionInfoId")]
        public virtual TransactionInfo TransactionInfo { get; set; }
        
        [ForeignKey("FromAssetId")]
        public virtual Asset FromAsset { get; set; }

        [ForeignKey("ToAssetId")]
        public virtual Asset ToAsset { get; set; }

        public int Amount { get; set; }
        public double ExchangeRate { get; set; }

        public DateTime PaymentDate { get; set; }
        public TransactionStatus Status { get; set; }

    }
}
