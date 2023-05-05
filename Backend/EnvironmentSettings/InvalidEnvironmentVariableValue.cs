using System.Runtime.Serialization;

namespace EnvironmentSettings;

[Serializable]
public class InvalidEnvironmentVariableValue : Exception
{
    public InvalidEnvironmentVariableValue(string variableName, string? variableValue, string expectedMessage) :
        base($"Invalid environment variable `{variableName}` value: `{variableValue ?? "<null>"}`. {expectedMessage}")
    {
    }

    public InvalidEnvironmentVariableValue()
    {
    }

    protected InvalidEnvironmentVariableValue(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public InvalidEnvironmentVariableValue(string? message) : base(message)
    {
    }

    public InvalidEnvironmentVariableValue(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}