using System;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class Scan : Entity
    {
        public virtual TransactionInfo TransactionInfo { get; set; }

        public virtual User ScannedBy { get; set; }

        public DateTime ScanDate { get; set; }
        public bool Completed { get; set; }
    }
}
