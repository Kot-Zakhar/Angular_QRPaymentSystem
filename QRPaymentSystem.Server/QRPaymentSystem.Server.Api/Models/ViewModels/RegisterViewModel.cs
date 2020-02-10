using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Models.ViewModels
{
    public class RegisterViewModel: LoginViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
