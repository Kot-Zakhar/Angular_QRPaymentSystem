using Microsoft.EntityFrameworkCore;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Repository.EntityFramework.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(QRPaymentSystemDbContext context) : base(context)
        {
        }
    }
}