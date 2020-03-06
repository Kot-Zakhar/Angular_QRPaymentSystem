using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Api.Models.QueryModels;
using QRPaymentSystem.Server.Api.Models.ViewModels;
using QRPaymentSystem.Server.Application.Services;
using QRPaymentSystem.Server.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MoneyAccountController : ControllerBase
    {
        private readonly IMoneyAccountService _moneyAccountService;
        private readonly IUserService _userService;

        public MoneyAccountController(IMoneyAccountService moneyAccountService, IUserService userService)
        {
            _moneyAccountService = moneyAccountService;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult CreateUserMoneyAccount([FromBody]MoneyAccountCreateQueryModel accountQueryModel) {
            System.Security.Claims.Claim userIdClaim = this.User.Claims.FirstOrDefault(claim => claim.Type == "sub");
            Guid userId;
            if (!Guid.TryParse(userIdClaim?.Value, out userId)) {
                return BadRequest("Invalid user id");
            }

            User user = _userService.GetById(userId);
            if (user == null)
                return BadRequest("User is not registered");

            if (!accountQueryModel.IsValid())
                return BadRequest("Invalid request.");




            // TODO: where should this transformation from queryModel into domain model be?
            var account = new MoneyAccount() {
                Name = accountQueryModel.Name,
                OwnerIdentityId = userId,
                Owner = user,
            };
            
            account = _moneyAccountService.CreateUserMoneyAccount(account);

            if (account == null)
                return BadRequest();
            else
                return Ok(new MoneyAccountViewModel(account));
        }

        [HttpGet]
        public ActionResult<IList<MoneyAccountViewModel>> GetUserMoneyAccounts() {
            System.Security.Claims.Claim userIdClaim = this.User.Claims.FirstOrDefault(claim => claim.Type == "sub");

            Guid userId;
            
            if (!Guid.TryParse(userIdClaim?.Value, out userId)) {
                return BadRequest("Invalid user id");
            }

            IList<MoneyAccountViewModel> accounts = _moneyAccountService.GetByOwnerId(userId).AsEnumerable().Select(acc => new MoneyAccountViewModel(acc)).ToList();

            return Ok(accounts);
        }

        // [HttpPut("{id}")]
        // public IActionResult UpdateUserAsset(string id, [FromBody] AssetUpdateQueryModel asset) {
        //     return Ok(asset);
        // }
    }
}