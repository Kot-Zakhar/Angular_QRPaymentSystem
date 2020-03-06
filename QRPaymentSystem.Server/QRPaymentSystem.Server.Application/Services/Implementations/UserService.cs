using System;
using System.Linq;
using System.Security.Claims;
using QRPaymentSystem.Server.Domain.Models;
using QRPaymentSystem.Server.Repository;

namespace QRPaymentSystem.Server.Application.Services.Implementations
{
    public class UserService : IUserService
    {
        public IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetById(Guid id)
        {
            return _userRepository.GetById(id);
        }
    }
}