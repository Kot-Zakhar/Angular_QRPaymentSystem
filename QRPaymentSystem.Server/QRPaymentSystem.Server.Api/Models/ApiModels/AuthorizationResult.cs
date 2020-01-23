using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Models.ApiModels
{
    public class AuthorizationResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
