using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Domain.Models;
using System.IdentityModel.Tokens.Jwt;
using QRPaymentSystem.Server.Api.Models.QueryModels;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : ControllerBase
    {
        public UserManager<User> UserManager { get; }

        public AssetController(UserManager<User> userManager)
        {
            UserManager = userManager;
        }

        [HttpGet]
        public IActionResult GetUserAssets() {
            
            var userId = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(userId);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserAsset(string id, [FromBody] AssetUpdateQueryModel asset) {
            return Ok(asset);
        }
    }
}