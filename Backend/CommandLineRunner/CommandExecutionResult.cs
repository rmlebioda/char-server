using CliWrap;

namespace CommandLineRunner;

public record CommandExecutionResult(CommandResult CommandResult, string Output);