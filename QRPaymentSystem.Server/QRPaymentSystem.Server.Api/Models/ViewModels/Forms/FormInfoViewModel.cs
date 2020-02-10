using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace QRPaymentSystem.Server.Api.Models.ViewModels.Forms
{
    public class FormInfoViewModel
    {
        public List<FormFieldInfoViewModel> Fields { get; protected set; } = new List<FormFieldInfoViewModel>();

        // this constructor fills Fields array with objects, wich contain both description and values from formGroutObject
        public FormInfoViewModel(object formGroupObject)
        {
            IEnumerable<PropertyInfo> formGroupProperties = GetFormFieldProperties(formGroupObject.GetType());

            foreach (var formGroupProperty in formGroupProperties) {
                Fields.Add(new FormFieldViewModel<object>(formGroupProperty, formGroupProperty.GetValue(formGroupObject)));
            }
        }

        // this constructor fills Fields array with objects, wich contain only description
        public FormInfoViewModel(Type formGroupType)
        {
            IEnumerable<PropertyInfo> formGroupProperties = GetFormFieldProperties(formGroupType);

            foreach (var formGroupProperty in formGroupProperties) {
                Fields.Add(new FormFieldInfoViewModel(formGroupProperty));
            }
        }

        protected IEnumerable<PropertyInfo> GetFormFieldProperties(Type formGroupType)
        {
            if (!formGroupType.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormGroupAttribute)))
                throw new Exception("Trying to make form out of not FormGroup object");

            return formGroupType.GetProperties()
                .Where(prop => prop.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormFieldAttribute)));
        }
    }
}