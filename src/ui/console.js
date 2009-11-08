var Console = {};

//= require "console/logger"
Console.Logger = Logger;
//= require "console/popup_logger"
Console.PopupLogger = PopupLogger;
//= require "console/command_line_logger"
Console.CommandLineLogger = CommandLineLogger;
//= require "console/test_runner"
Console.TestRunner = ConsoleTestRunner;
//= require "console/test_result"
Console.TestResult = ConsoleTestResult;