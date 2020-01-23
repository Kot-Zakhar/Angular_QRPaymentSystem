using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    public class Scan : Entity
    {
        [ForeignKey("TransactionInfoId")]
        public virtual TransactionInfo TransactionInfo { get; set; }

        [ForeignKey("ScannedById")]
        public virtual IdentityProfile ScannedBy { get; set; }

        public DateTime ScanDate { get; set; }
        public bool Completed { get; set; }
    }
}
