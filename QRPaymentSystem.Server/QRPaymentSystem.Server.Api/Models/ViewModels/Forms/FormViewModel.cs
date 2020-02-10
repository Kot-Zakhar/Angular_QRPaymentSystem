using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace QRPaymentSystem.Server.Api.Models.ViewModels.Forms
{
    public class FormViewModel<T> : FormInfoViewModel
    {
        public T Data;

        // this constructor fills Fields array of base class with description of fields and stores formGroupObject in Data object
        public FormViewModel(T formGroupObject): base(formGroupObject.GetType())
        {
            IEnumerable<PropertyInfo> formFieldsProperty = GetFormFieldProperties(formGroupObject.GetType());

            foreach (var formField in formFieldsProperty) {
                Fields.Add(new FormFieldViewModel<object>(formField, formField.GetValue(formGroupObject)));
            }
        }
    }
}