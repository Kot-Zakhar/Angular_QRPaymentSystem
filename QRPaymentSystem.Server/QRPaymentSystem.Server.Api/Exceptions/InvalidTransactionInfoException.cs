[System.Serializable]
public class InvalidTransactionInfoException : System.Exception
{
    public InvalidTransactionInfoException() { }
    public InvalidTransactionInfoException(string message) : base(message) { }
    public InvalidTransactionInfoException(string message, System.Exception inner) : base(message, inner) { }
    protected InvalidTransactionInfoException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}