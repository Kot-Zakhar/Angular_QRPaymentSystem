using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QRPaymentSystem.Server.Api.Models.Enums;
using QRPaymentSystem.Server.Api.Models.ViewModels;
using QRPaymentSystem.Server.Api.Models.ViewModels.Forms;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FormController: ControllerBase
    {
        [HttpGet("{type}")] 
        public ActionResult<FormInfoViewModel> GetTransactionForm(string type)
        {
            switch (type) {
                case "transfer":
                    return new FormInfoViewModel(typeof(NewTransferViewModel));
                default:
                    return BadRequest("Wrong form type.");
            }
        }
    }
}