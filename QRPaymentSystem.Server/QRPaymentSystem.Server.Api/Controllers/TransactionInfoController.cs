using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Api.Services;
using QRPaymentSystem.Server.Api.Models.ApiModels;
using QRPaymentSystem.Server.Api.Models.DbModels;
using System.Threading.Tasks;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionInfoController : ControllerBase
    {
        private readonly TransactionInfoService _transactionInfoService;
        
        public TransactionInfoController(TransactionInfoService transactionInfoService)
        {
            _transactionInfoService = transactionInfoService;
        }

        [HttpGet("example")]
        public ActionResult<string> Get()
        {
            return _transactionInfoService.Encode(null);
        }

        // [HttpPost("decode")]
        // public ActionResult<FormField<object>> Decode([FromBody]string token) {
        //     SecurityToken transactionInfo = _transactionInfoService.Decode(token);
        //     return Ok(transactionInfo);
        // }

        [HttpGet("getform")]
        public async Task<ActionResult<FormModel>> GetForm([FromQuery]string encodedTransaction) {
            try
            {
                TransactionInfo transactionInfo = await _transactionInfoService.GetTransactionInfo(encodedTransaction);
                return new FormModel(transactionInfo);
            }
            catch (InvalidTransactionInfoException ex)
            {
                return BadRequest(ex);
            }

        }
    }
}