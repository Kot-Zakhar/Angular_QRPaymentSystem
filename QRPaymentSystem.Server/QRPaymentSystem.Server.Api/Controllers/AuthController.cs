using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Mvc;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/_configuration")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IClientRequestParametersProvider _clientRequestParametersProvider;

        public AuthController(IClientRequestParametersProvider clientRequestParametersProvider){
            _clientRequestParametersProvider = clientRequestParametersProvider;
        }

        [HttpGet("{clientId}")]
        public IActionResult GetClientRequestParameters([FromRoute]string clientId) {
            var parameters = _clientRequestParametersProvider.GetClientParameters(HttpContext, clientId);
            return Ok(parameters);
        }
    }
}