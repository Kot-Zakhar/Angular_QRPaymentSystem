using System.Reflection;

namespace QRPaymentSystem.Server.Api.Models.ViewModels.Forms
{
    public class FormFieldViewModel<T>: FormFieldInfoViewModel
    {
        public T Value { get; set; }
        public FormFieldViewModel(PropertyInfo member, T value) : base(member)
        {
            Value = value;
        }
    }
}