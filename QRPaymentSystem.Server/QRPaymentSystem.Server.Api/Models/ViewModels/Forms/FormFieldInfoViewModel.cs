using System;
using System.Linq;
using System.Reflection;

namespace QRPaymentSystem.Server.Api.Models.ViewModels.Forms
{
    public class FormFieldInfoViewModel
    {
        public string Key { get; set; }
        public string Label { get; set; }
        public string Comment { get; set; }
        public bool Required { get; set; }
        public bool Editable { get; set; }
        public FormFieldType Type { get; set; }

        public FormFieldInfoViewModel(PropertyInfo property) {
            if (!property.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormFieldAttribute)))
                throw new Exception("Trying to create formField from non-FormField object");

            var attr = property.GetCustomAttribute(typeof(FormFieldAttribute)) as FormFieldAttribute;
            
            this.Key = property.Name;
            this.Label = attr.Label;
            this.Required = attr.Required;
            this.Editable = attr.Editable;
            this.Comment = attr.Comment;
            this.Type = new FormFieldType(){
                Name = attr.JsTypeName,
                AllowedValues = property.PropertyType.IsEnum ? property.PropertyType.GetEnumNames() : null,
            };
        }
    }
}