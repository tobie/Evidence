function AutoRunner() {
  if (global.console && global.console.log) {
    this.logger = Logger;
  } else if (Object.prototype.toString.call(global.environment) === '[object Environment]' && global.print) {
    // most probably Rhino
    this.logger = CommandLineLogger;
  } else {
    this.logger = PopupLogger;
  }
  this.autoRun   = true;
  this.verbosity = Logger.INFO;
  this.runner    = ConsoleTestRunner;
  //this.root = '/';
  //this.pages = []; // ????
}

(function() {
  function run(options) {
    var autoRunner = new this();
    options = options || autoRunner.retrieveOptions();
    autoRunner.processOptions(options);
    if (autoRunner.autoRun) { autoRunner.run() };
  }
  
  AutoRunner.run = run;
  AutoRunner.displayName = 'AutoRunner';
  AutoRunner.LOGGERS = {
    console:      Logger,
    popup:        PopupLogger,
    command_line: CommandLineLogger
  };
  
  AutoRunner.RUNNERS = {
    console: ConsoleTestRunner
  };
})();

(function(p) {
  function run() {
    var logger = new this.logger(this.verbosity),
        runner = new this.runner(logger),
        suite = defaultLoader.loadRegisteredTestCases();
    if (suite._tests.length <= 1) {
      suite = suite._tests[0];
    }
    return runner.run(suite);
  }
  
  function processQueryString(str) {
    var results = {};
    str = (str + '').match(/^(?:[^?#]*\?)([^#]+?)(?:#.*)?$/);
    str = str && str[1];
    
    if (!str) { return results; }
    
    var pairs = str.split('&'),
        length = pairs.length;
    if (!length) { return results; }
    
    for (var i = 0; i < length; i++) {
      var pair  = pairs[i].split('='),
          key   = decodeURIComponent(pair[0]),
          value = pair[1];
      value = value ? decodeURIComponent(value) : true;
      results[key] = value;
    }
    return results;
  }
  
  function processArguments(args) { // RHINO
    var results = {};
    
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg.indexOf('-') === 0) {
        var value = args[i + 1];
        if (value && value.indexOf('-') !== 0) {
          i++;
        } else {
          value = true;
        }
        results[arg.substr(1)] = value;
      }
    }
    return results;
  }
  
  function retrieveOptions() {
    if (global.location) {
      return this.processQueryString(global.location);
    } 
    if (global.arguments) {
      return this.processArguments(global.arguments);
    }
    return {};
  }
  
  function processOptions(options) {
    for(var key in options) {
      var value = options[key];
      switch(key) {
        case 'timeout':
          TestCase.defaultTimeout = global.parseFloat(value) * 1000;
          break;
        case 'run':
          this.autoRun = value === 'false' ? false : true;
          break;
        case 'logger':
          this.logger = AutoRunner.LOGGERS[value];
          break;
        case 'verbosity':
          var i = global.parseInt(value);
          this.verbosity = global.isNaN(i) ? Logger[value] : i;
          break;
        case 'runner':
          this.runner = AutoRunner.RUNNERS[value];
          break;
      }
    }
  }
  
  p.run = run;
  p.processQueryString = processQueryString;
  p.processArguments = processArguments;
  p.retrieveOptions = retrieveOptions;
  p.processOptions = processOptions;
})(AutoRunner.prototype);