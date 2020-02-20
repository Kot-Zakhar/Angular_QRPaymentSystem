using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace QRPaymentSystem.Server.Domain.Models
{
    public class User : Entity
    {
        public User() { }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }

        public virtual IList<MoneyAccount> MoneyAccounts { get; set; }
        public virtual IList<Scan> Scans { get; set; }
        public virtual IList<TransactionInfo> CreatedTransactionInfos { get; set; }
    }
}
