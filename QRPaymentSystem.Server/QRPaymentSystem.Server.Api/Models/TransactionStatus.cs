using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Models
{
    public enum TransactionStatus
    {
        Created,
        Shared,
        Scanned,
        Completed,
        Rejected
    }
}
