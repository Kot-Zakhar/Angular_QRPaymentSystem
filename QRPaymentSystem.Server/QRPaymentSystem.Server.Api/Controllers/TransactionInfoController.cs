using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QRPaymentSystem.Server.Api.Services;
using AuthorizationResult = QRPaymentSystem.Server.Api.Models.ApiModels.AuthorizationResult;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionInfoController : ControllerBase
    {
        private readonly TransactionInfoService _transactionInfoService;
        
        public TransactionInfoController(TransactionInfoService transactionInfoService)
        {
            _transactionInfoService = transactionInfoService;
        }

        [HttpGet("example"), Authorize]
        public ActionResult<string> Get()
        {
            return "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhODliNjIwMS03MWU4LTRjODItYjAyMy1jM2JhZDgxZGYwMzUiLCJhdWQiOiI3N2RlYjE1Yy0xMDhiLTQzNDAtYWYzNi03OThlOGJjY2Q3ODciLCJhbXQiOiIxIiwiY3VyIjoiRVUiLCJpYXQiOjE1MTYyMzkwMjIsImp0aSI6IjdhMzA1YWUyLTM0MDItNDExMy1hN2JhLWMyM2Q1ZGNkN2I5OSIsImlzcyI6ImE4OWI2MjAxLTcxZTgtNGM4Mi1iMDIzLWMzYmFkODFkZjAzNSIsInF0eSI6IjEwIn0.YRjcVq3ivNOvhqt0umfD5rXTTb7rETJXtL67m7r_eFl-ZhyEr7GZIn5Bzw3S3UgI5tVFGa5dKitp4glbLyKSng";
        }

        [HttpGet("validate"), Authorize]
        public IActionResult Validate([FromBody] string token)
        {
            if (_transactionInfoService.Validate(token))
                return Ok();
            else
                return StatusCode(406);// Not Acceptable
        }

    }
}