using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace QRPaymentSystem.Server.Api.Models.ApiModels
{
    public class FormModel
    {
        public List<FormField<object>> Fields { get; }

        public FormModel(object formGroupObject) {
            Type type = formGroupObject.GetType();
            if (!type.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormGroupAttribute)))
                throw new Exception("Trying to make form out of not FormGroup object");
            
            Fields = new List<FormField<object>>();

            IEnumerable<PropertyInfo> formFieldsProperty = type.GetProperties()
                .Where(prop => prop.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormFieldAttribute)));

            foreach (var formField in formFieldsProperty) {
                Fields.Add(new FormField<object>(formField) {
                    Value = formField.GetValue(formGroupObject)
                });
            }
        }
    }
}