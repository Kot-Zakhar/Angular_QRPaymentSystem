using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRPaymentSystem.Server.Api.Models.ApiModels;
using QRPaymentSystem.Server.Api.Models.DbModels;

namespace QRPaymentSystem.Server.Api.Services
{
    public class AuthService
    {
        private IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IdentityProfile FindUser(LoginModel userCredentials)
        {
            if (userCredentials.Username == "test" && userCredentials.Password == "test")
                return new IdentityProfile("test")
                {
                    PasswordHash = "test",
                    Email = "test@mail.ru"
                };

            return null;
        }

        public string Authorize(IdentityProfile user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretJwtKey")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: user.Id.ToString(),
                claims: new List<Claim>
                {
                    new Claim("claimType1", "value1")
                },
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }
    }
}
