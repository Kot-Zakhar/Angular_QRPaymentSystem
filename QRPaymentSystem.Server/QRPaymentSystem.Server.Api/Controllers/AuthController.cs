using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRPaymentSystem.Server.Api.Models.ApiModels;
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
        public IActionResult Login([FromBody] LoginModel userCredentials)
        {
            if (!_authService.AreCredentialsValid(userCredentials))
                return BadRequest("Invalid credentials.");

            var user = _authService.Find(userCredentials);

            if (user == null)
                return BadRequest("Invalid credentials.");

            var result = _authService.Authorize(user);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel userCredentials)
        {
            if (!_authService.AreCredentialsValid(userCredentials))
                return BadRequest("Invalid credentials.");

            var user = await _userService.Register(userCredentials);

            if (user == null)
                return BadRequest("Invalid credentials.");

            var result = _authService.Authorize(user);

            return Ok(result);
        }
    }
}