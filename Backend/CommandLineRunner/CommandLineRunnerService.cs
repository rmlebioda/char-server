using System.Text;
using CliWrap;

namespace CommandLineRunner;

public static class CommandLineRunnerService
{
    public static async Task<CommandExecutionResult> ExecuteCommandAsync(string command,
        IEnumerable<string> arguments,
        bool mustReturnZeroCode)
    {
        var output = new StringBuilder();
        var wrapper = Cli.Wrap(command)
            .WithArguments(arguments)
            .WithStandardErrorPipe(PipeTarget.ToStringBuilder(output))
            .WithStandardOutputPipe(PipeTarget.ToStringBuilder(output));
        if (!mustReturnZeroCode)
            wrapper = wrapper.WithValidation(CommandResultValidation.None);
        var result = await wrapper.ExecuteAsync();
        return new CommandExecutionResult(result, output.ToString());
    }
}