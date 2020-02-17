using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Api.Models.ViewModels;
using QRPaymentSystem.Server.Api.Models.ViewModels.Forms;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    // [Authorize]
    // public class TransactionController : ControllerBase
    // {
    //     private readonly TransactionInfoService _transactionInfoService;
        
    //     public TransactionController(TransactionInfoService transactionInfoService)
    //     {
    //         _transactionInfoService = transactionInfoService;
    //     }

    //     [HttpPost("{type}")]
    //     public async Task<IActionResult> CreateTransactionJwt(string type, [FromBody]NewTransferViewModel newTransferModel)
    //     {
    //         return Ok(new { jwtTransaction = "hello world" });
    //     }

    // }
}