using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using QRPaymentSystem.Server.Api.Models.DbModels;
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
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretTransactionKey")));
            return new TokenValidationParameters() {
                IssuerSigningKey = secretKey,
                RequireExpirationTime = false,
                ValidateAudience = false,
                ValidateIssuer = false
            };
        }

        private async Task<TransactionInfo> TranslateTokenToTransactionInfo(SecurityToken transactionInfoToken) {
            // TODO: there is gonna be fetching request, wich gets info about transaction (by id from transactionInfoToken)
            return new TransactionInfo() {
                Amount = 3,
                Type = Models.Enums.TransactionInfoType.Transfer,
                FromAsset = new Asset() {
                    Currency = "EUR",
                    Name = "From Asset Name",
                    IBAN = "IBANFROM-123491283123474"
                },
                ToAsset = new Asset() {
                    Currency = "USD",
                    Name = "ToAssetName",
                    IBAN = "IBANTO-1234676712394876"
                },
                ExpirationDate = DateTime.Now.AddDays(10),
                NotBeforeDate = DateTime.Now.AddDays(5),
                Creator = new IdentityProfile("Creator username"),
                Status = Models.Enums.TransactionStatus.Created
            };
        }

        public async Task<TransactionInfo> GetTransactionInfo(string encodedTransactionInfoToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (!tokenHandler.CanReadToken(encodedTransactionInfoToken))
                return null;

            SecurityToken decodedTransactionInfoToken;
            try
            {
                System.Security.Claims.ClaimsPrincipal principal = tokenHandler.ValidateToken(encodedTransactionInfoToken, GetValidationParameters(), out decodedTransactionInfoToken);
                TransactionInfo result = await TranslateTokenToTransactionInfo(decodedTransactionInfoToken);
                return result;
            }
            catch (SecurityTokenException)
            {
                throw new InvalidTransactionInfoException("Token is invalid");
            }
            catch (Exception ex){
                // TODO: check for TokenToTransactionInfoException
                throw new InvalidTransactionInfoException("Unknown exception", ex);
            }
        }

        public string Encode(TransactionInfo transaction)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretTransactionKey")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
