using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace QRPaymentSystem.Server.Api.Models
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

        public IList<Asset> Assets { get; set; }
    }
}
