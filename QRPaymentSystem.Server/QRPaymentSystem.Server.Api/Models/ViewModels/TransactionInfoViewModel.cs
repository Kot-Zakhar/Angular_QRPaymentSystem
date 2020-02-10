using System;
using QRPaymentSystem.Server.Api.Models.DbModels;
using QRPaymentSystem.Server.Api.Models.Enums;

namespace QRPaymentSystem.Server.Api.Models.ViewModels
{
    [FormGroup]
    public class TransactionInfoViewModel
    {
        public TransactionInfoViewModel ( ) { }

        public TransactionInfoViewModel (TransactionInfo transactionInfo) {
            Type = transactionInfo.Type;
            FromAsset = new AssetViewModel(transactionInfo.FromAsset);
            ToAsset = new AssetViewModel(transactionInfo.ToAsset);
            Status = transactionInfo.Status;
            Amount = transactionInfo.Amount;
            CreationDate = transactionInfo.CreationDate;
            ExpirationDate = transactionInfo.ExpirationDate;
            NotBeforeDate = transactionInfo.NotBeforeDate;
            MaxTransactionsQuantity = transactionInfo.MaxTransactionsQuantity;
            Creator = new PublicUserViewModel(transactionInfo.Creator);
        }

        [FormField(required: true, display: false)]
        public TransactionInfoType Type { get; set; }

        // TODO: create subFormGroup
        public AssetViewModel FromAsset { get; set; }

        public AssetViewModel ToAsset { get; set; }

        [FormField("Status")]
        public TransactionStatus Status { get; set; }

        [FormField("Amount", required: true, editable: true)]
        public int Amount { get; set; }

        [FormField("Creation date")]
        public DateTime CreationDate { get; set; }

        [FormField("Expiration date")]
        public DateTime ExpirationDate { get; set; }
        
        [FormField("Start date")]
        public DateTime NotBeforeDate { get; set; }

        [FormField("Transactions quantity")]
        public int MaxTransactionsQuantity { get; set; }


        public PublicUserViewModel Creator { get; set; }
    }
}