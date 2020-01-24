using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace QRPaymentSystem.Server.Api.Services
{
    public class TransactionInfoService
    {
        private readonly IConfiguration _configuration;

        public TransactionInfoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private TokenValidationParameters GetValidationParameters()
        {
            throw new NotImplementedException();
        }

        public bool Validate(string encodedTransactionInfo)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretTransactionKey")));
            var tokenHandler = new JwtSecurityTokenHandler();
            if (!tokenHandler.CanReadToken(encodedTransactionInfo))
                return false;

            SecurityToken decodedTransactionInfo;
            try
            {
                var principal = tokenHandler.ValidateToken(encodedTransactionInfo, GetValidationParameters(), out decodedTransactionInfo);
                return true;
            }
            catch (SecurityTokenException)
            {
                return false;
            }
        }


        //public string GetToken()
        //{

        //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretJwtKey")));
        //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        //    var tokeOptions = new JwtSecurityToken(
        //        issuer: "https://localhost:5001",
        //        audience: user.Id.ToString(),
        //        claims: new List<Claim>
        //        {
        //            new Claim("claimType1", "value1")
        //        },
        //        expires: DateTime.Now.AddMinutes(5),
        //        signingCredentials: signinCredentials
        //    );

        //    var result = new AuthorizationResult
        //    {
        //        AccessToken = new JwtSecurityTokenHandler().WriteToken(tokeOptions)
        //    };
        //}
    }
}
