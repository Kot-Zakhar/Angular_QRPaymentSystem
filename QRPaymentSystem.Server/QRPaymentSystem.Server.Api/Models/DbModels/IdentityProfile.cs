using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace QRPaymentSystem.Server.Api.Models.DbModels
{
    public class IdentityProfile : IdentityUser
    { 
        public IdentityProfile()
        {
        }
        public IdentityProfile(string userName) : base(userName)
        {
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }

        public virtual IList<Asset> Assets { get; set; }
        public virtual IList<Scan> Scans { get; set; }
        public virtual IList<TransactionInfo> CreatedTransactionInfos { get; set; }
    }
}
