using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
        public AuthController(IConfiguration configuration, AuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel userCredentials)
        {
            if (userCredentials == null)
            {
                return BadRequest("Invalid request");
            }

            var user = _authService.FindUser(userCredentials);

            if (user == null)
                return Unauthorized();

            var token = _authService.Authorize(user);

            return Ok(new {token = token});
        }
    }
}