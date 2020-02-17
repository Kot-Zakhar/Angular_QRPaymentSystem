using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework
{
    public class ScanRepository : Repository<Scan>, IScanRepository
    {
        public ScanRepository(DbContext context) : base(context)
        {
        }
    }
}