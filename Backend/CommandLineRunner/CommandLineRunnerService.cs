using System.Text;
using CliWrap;
using Microsoft.Extensions.Logging;

namespace CommandLineRunner;

public static class CommandLineRunnerService
{
    public static async Task<CommandExecutionResult> ExecuteCommandAsync(ILogger logger,
        string command,
        IList<string> arguments,
        bool mustReturnZeroCode)
    {
        logger.LogTrace("Executing command, input: {Input}", GetInput(command, arguments));
        var output = new StringBuilder();
        var wrapper = Cli.Wrap(command)
            .WithArguments(arguments)
            .WithStandardErrorPipe(PipeTarget.ToStringBuilder(output))
            .WithStandardOutputPipe(PipeTarget.ToStringBuilder(output));
        if (!mustReturnZeroCode)
            wrapper = wrapper.WithValidation(CommandResultValidation.None);
        CommandResult result;
        try
        {
            result = await wrapper.ExecuteAsync();
        }
        catch (Exception e)
        {
            throw new Exception(
                "Command failed due to error, check inner exception for input." + Environment.NewLine + "Output: " +
                Environment.NewLine + output, e);
        }
        finally
        {
            logger.LogTrace("Command output: {Output}", output);
        }

        return new CommandExecutionResult(result, output.ToString());
    }

    private static string GetInput(string cmd, IEnumerable<string> args)
    {
        return cmd + " " + string.Join(" ", args);
    }
}