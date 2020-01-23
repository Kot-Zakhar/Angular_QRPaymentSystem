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


        public async Task<IdentityProfile> Register(RegisterModel userCredentials)
        {
            IdentityProfile user = await _userManager.FindByNameAsync(userCredentials.Username);

            if (user != null)
                return null;

            user = new IdentityProfile(userCredentials.Username)
            {
                FirstName = userCredentials.FirstName,
                LastName = userCredentials.LastName
            };

            IdentityResult result = await _userManager.CreateAsync(user, userCredentials.Password);

            return result.Succeeded ? user : null;
        }
    }
}
