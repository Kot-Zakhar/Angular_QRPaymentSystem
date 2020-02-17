using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRPaymentSystem.Server.Application.Models;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Application.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // TODO: username and password validation
        public bool AreCredentialsValid(LoginModel userCredentials)
        {
            return userCredentials != null;
        }

        public AuthorizationResult Authorize(User user)
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
                expires: DateTime.Now.AddDays(5),
                signingCredentials: signinCredentials
            );

            var result = new AuthorizationResult
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(tokeOptions)
            };

            return result;
        }
    }
}
