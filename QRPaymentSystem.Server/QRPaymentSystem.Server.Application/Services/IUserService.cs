using System;
using System.Linq;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Application.Services
{
    public interface IUserService
    {
        User GetById(Guid id);
    }
}