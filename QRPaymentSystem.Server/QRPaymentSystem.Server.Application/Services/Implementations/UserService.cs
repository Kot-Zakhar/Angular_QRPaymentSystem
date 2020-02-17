using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using QRPaymentSystem.Server.Application.Models;
using QRPaymentSystem.Server.Domain.Models;

namespace QRPaymentSystem.Server.Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> FindByCredentialsAsync(LoginModel userCredentials)
        {
            User user = await _userManager.FindByNameAsync(userCredentials.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, userCredentials.Password))
                return user;
            else
                return null;
        }

        public async Task<IdentityResult> Register(RegistrationModel userCredentials)
        {
            var user = new User(userCredentials.Username)
            {
                FirstName = userCredentials.FirstName,
                LastName = userCredentials.LastName
            };

            return await _userManager.CreateAsync(user, userCredentials.Password);
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }
    }
}
