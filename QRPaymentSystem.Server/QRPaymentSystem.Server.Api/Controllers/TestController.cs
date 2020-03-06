using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using QRPaymentSystem.Server.Api.Models.QueryModels;
using QRPaymentSystem.Server.Api.Models.ViewModels;
using QRPaymentSystem.Server.Application.Services;
using QRPaymentSystem.Server.Domain.Models;
using QRPaymentSystem.Server.Repository;

namespace QRPaymentSystem.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController: ControllerBase
    {
        private readonly IMoneyAccountService _moneyAccountService;
        private readonly IMoneyAccountRepository _moneyAccountRepository;
        private readonly IUserRepository _userRepository;

        public TestController(IMoneyAccountRepository moneyAccountRepository, IUserRepository userRepository, IMoneyAccountService moneyAccountService)
        {
            _moneyAccountRepository = moneyAccountRepository;
            _userRepository = userRepository;
            _moneyAccountService = moneyAccountService;
        }

        [HttpGet("moneyAccounts")]
        public ActionResult<IList<MoneyAccountViewModel>> GetMoneyAccounts([FromQuery]string owner) {
            if (String.IsNullOrEmpty(owner))
                return Ok(_moneyAccountRepository.GetAll().ToList());
            
            return Ok(_moneyAccountService.GetByOwnerId(Guid.Parse(owner)).ToList());
        }
        [HttpGet("users")] 
        public ActionResult GetUsers([FromQuery] string id)
        {
            Guid realId;
            if (Guid.TryParse(id, out realId))
                return Ok(new UserViewModel(_userRepository.GetById(realId)));

            return Ok(_userRepository.GetAll().Select(u => new UserViewModel(u)));
        }

        [HttpPost("users")]
        public ActionResult<UserViewModel> CreateUser([FromBody] UserQueryModel userQueryModel) {
            var user = new User {
                FirstName = userQueryModel.FirstName,
                LastName = userQueryModel.LastName
            };

            var savedUser = _userRepository.Create(user);

            return new UserViewModel(savedUser);
        }
    }
}