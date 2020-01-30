using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;

namespace QRPaymentSystem.Server.Api.Models.ApiModels
{
    public class FormField<T>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public T Value { get; set; }
        public bool Required { get; set; }
        public bool Editable { get; set; }
        public bool Display { get; set; }

        public FormField(MemberInfo member) {
            if (!member.GetCustomAttributes().Any(attr => attr.GetType().Name == nameof(FormFieldAttribute)))
                throw new Exception("Trying to create formField from non-FormField object");

            var attr = member.GetCustomAttribute(typeof(FormFieldAttribute)) as FormFieldAttribute;
            
            this.Name = member.Name;
            this.DisplayName = attr.DisplayName;
            this.Required = attr.Required;
            this.Editable = attr.Editable;
            this.Display = attr.Display;
        }
    }
}