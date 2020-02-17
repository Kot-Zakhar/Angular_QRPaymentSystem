namespace QRPaymentSystem.Server.Application.Models
{
    public class RegistrationModel : LoginModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}