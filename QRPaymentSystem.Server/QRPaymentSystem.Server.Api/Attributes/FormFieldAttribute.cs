[System.AttributeUsage(System.AttributeTargets.Field | System.AttributeTargets.Property, Inherited = false, AllowMultiple = true)]

public class FormFieldAttribute: System.Attribute
{
    public string DisplayName { get; set; }
    public bool Required { get; set; }
    public bool Editable { get; set; }
    public bool Display { get; set; }
    public FormFieldAttribute(
        string displayName = null,
        bool required = false,
        bool editable = false,
        bool display = true
    ) {
        DisplayName = displayName;
        Required = required;
        Editable = editable;
        Display = display;
    }
}