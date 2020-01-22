using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QRPaymentSystem.Server.Api.Models
{
    public class Asset : Entity
    {
        public Asset() : base() { }

        [Required]
        public string Name { get; set; }

        

        [Required]
        [ForeignKey("OwnerId")]
        public IdentityProfile Owner { get; set; }

        public IList<Transaction> Transactions { get; set; }
    }
}
