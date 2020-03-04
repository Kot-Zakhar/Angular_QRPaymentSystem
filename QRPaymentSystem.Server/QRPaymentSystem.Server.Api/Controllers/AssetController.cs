using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Api.Models.QueryModels;
using System.Linq;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : ControllerBase
    {
        // public UserManager<User> UserManager { get; }

        public AssetController(/* UserManager<User> userManager */)
        {
            // UserManager = userManager;
        }

        [HttpGet]
        public IActionResult GetUserAssets() {
            
            // var userId = this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Ok(this.User.Claims.Single(claim => claim.Type == "sub").Value);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserAsset(string id, [FromBody] AssetUpdateQueryModel asset) {
            return Ok(asset);
        }
    }
}