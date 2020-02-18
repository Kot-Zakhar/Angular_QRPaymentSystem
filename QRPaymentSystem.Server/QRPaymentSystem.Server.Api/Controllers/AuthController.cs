using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QRPaymentSystem.Server.Domain.Models;
using QRPaymentSystem.Server.Application.Services;
using QRPaymentSystem.Server.Application.Models;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private IAuthService _authService;
        private IUserService _userService;

        public AuthController(IConfiguration configuration, IAuthService authService, IUserService userService)
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

            User user = await _userService.FindByCredentialsAsync(userCredentials);

            if (user == null)
                return BadRequest("Invalid credentials.");

            AuthorizationResult result = _authService.Authorize(user);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationModel userCredentials)
        {
            if (!_authService.AreCredentialsValid(userCredentials))
                return BadRequest("Invalid credentials.");

            IdentityResult identityResult = await _userService.Register(userCredentials);

            if (!identityResult.Succeeded)
                return BadRequest(identityResult.Errors);

            return await Login(userCredentials);
        }
    }
}