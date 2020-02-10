using System;
using System.Collections.Generic;

namespace QRPaymentSystem.Server.Api.Models.ViewModels.Forms
{
    public class FormFieldType
    {
        public string Name { get; set; }
        public IEnumerable<string> AllowedValues { get; set; }
    }
}