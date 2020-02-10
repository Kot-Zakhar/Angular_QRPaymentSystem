using System;
using QRPaymentSystem.Server.Api.Models.DbModels;
using QRPaymentSystem.Server.Api.Models.Enums;

namespace QRPaymentSystem.Server.Api.Models.ViewModels
{
    [FormGroup]
    public class NewTransferViewModel
    {
        // [FormField("Sender asset number", editable: true, jsTypeName: "number")]
        // public String FromAsset { get; set; }

        // [FormField("Receiver asset number", editable: true, jsTypeName: "number", comment: "If not specified - creator's default asset number is used")]
        // public String ToAsset { get; set; }

        [FormField("Amount", required: false, editable: true, jsTypeName: "number")]
        public int Amount { get; set; }
        
        [FormField("Start date", editable: true, jsTypeName: "date")]
        public DateTime? NotBeforeDate { get; set; }

        [FormField("Expiration date", editable: true, jsTypeName: "date")]
        public DateTime? ExpirationDate { get; set; }
    }
}