using System.Collections.Generic;

[System.AttributeUsage(System.AttributeTargets.Property, Inherited = false, AllowMultiple = true)]

public class FormFieldAttribute: System.Attribute
{
    // TODO: add order field
    public string Label { get; set; }
    public bool Required { get; set; }
    public bool Editable { get; set; }
    public bool Display { get; set; }
    public string JsTypeName { get; set; }
    public string[] AllowedValues { get; set; }
    public bool AllowMultipleValues { get; set; }
    public string Comment { get; set; }

    public FormFieldAttribute(
        string label = null,
        bool required = false,
        bool editable = false,
        bool display = true,
        string jsTypeName = "text",
        string[] allowedValues = null,
        bool allowMultipleValues = false,
        string comment = null
    ) {
        Label = label;
        Required = required;
        Editable = editable;
        Display = display;
        JsTypeName = jsTypeName;
        AllowedValues = allowedValues;
        AllowMultipleValues = allowMultipleValues;
        Comment = comment;
    }
}