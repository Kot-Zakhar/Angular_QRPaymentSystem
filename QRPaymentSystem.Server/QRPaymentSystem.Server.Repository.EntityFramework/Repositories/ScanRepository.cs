using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework.Repositories
{
    public class ScanRepository : Repository<Scan>, IScanRepository
    {
        public ScanRepository(QRPaymentSystemDbContext context) : base(context)
        {
        }
    }
}