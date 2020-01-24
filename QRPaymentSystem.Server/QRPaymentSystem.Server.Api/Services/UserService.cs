using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using QRPaymentSystem.Server.Api.Models.ApiModels;
using QRPaymentSystem.Server.Api.Models.DbModels;

namespace QRPaymentSystem.Server.Api.Services
{
    public class UserService
    {
        private UserManager<IdentityProfile> _userManager;

        public UserService(UserManager<IdentityProfile> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityProfile> FindByCredentialsAsync(LoginModel userCredentials)
        {
            IdentityProfile user = await _userManager.FindByNameAsync(userCredentials.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, userCredentials.Password))
                return user;
            else
                return null;
        }

        public async Task<IdentityResult> Register(RegisterModel userCredentials)
        {
            var user = new IdentityProfile(userCredentials.Username)
            {
                FirstName = userCredentials.FirstName,
                LastName = userCredentials.LastName
            };

            return await _userManager.CreateAsync(user, userCredentials.Password);
        }

        public async Task<IdentityProfile> GetByUsernameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }
    }
}
