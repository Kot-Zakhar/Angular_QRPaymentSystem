using System;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Api.Models.QueryModels
{
    public class MoneyAccountCreateQueryModel
    {
        public string Name { get; set; }

        public bool IsValid()
        {
            return !String.IsNullOrEmpty(this.Name.Trim());
        }
    }
}