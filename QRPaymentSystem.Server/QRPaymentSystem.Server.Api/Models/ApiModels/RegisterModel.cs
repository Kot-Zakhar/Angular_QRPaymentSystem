using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Models.ApiModels
{
    public class RegisterModel: LoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
