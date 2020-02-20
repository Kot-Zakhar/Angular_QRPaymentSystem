using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework.Repositories
{
    public class TransactionInfoRepository : Repository<TransactionInfo>, ITransactionInfoRepository
    {
        public TransactionInfoRepository(QRPaymentSystemDbContext context) : base(context)
        {
        }
    }
}