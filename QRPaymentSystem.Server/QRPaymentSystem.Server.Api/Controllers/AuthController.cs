using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRPaymentSystem.Server.Api.Models.ApiModels;
using QRPaymentSystem.Server.Api.Models.DbModels;
using QRPaymentSystem.Server.Api.Services;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private AuthService _authService;
        private UserService _userService;

        public AuthController(IConfiguration configuration, AuthService authService, UserService userService)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userCredentials)
        {
            if (!_authService.AreCredentialsValid(userCredentials))
                return BadRequest("Invalid credentials.");

            IdentityProfile user = await _userService.FindByCredentialsAsync(userCredentials);

            if (user == null)
                return BadRequest("Invalid credentials.");

            AuthorizationResult result = _authService.Authorize(user);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel userCredentials)
        {
            if (!_authService.AreCredentialsValid(userCredentials))
                return BadRequest("Invalid credentials.");

            IdentityResult identityResult = await _userService.Register(userCredentials);

            if (!identityResult.Succeeded)
                return BadRequest(identityResult.Errors);

            return await Login(new LoginModel
            {
                Username = userCredentials.Username,
                Password = userCredentials.Password
            });
        }
    }
}