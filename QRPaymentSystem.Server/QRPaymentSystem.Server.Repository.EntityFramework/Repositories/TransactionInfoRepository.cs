using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class TransactionInfoRepository : Repository<TransactionInfo>, ITransactionInfoRepository
    {
        public TransactionInfoRepository(DbContext context) : base(context)
        {
        }
    }
}