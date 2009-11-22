function CommandLineLogger(level) {
  Logger.call(this, level);
}

chain(CommandLineLogger, Logger);
CommandLineLogger.displayName = 'CommandLineLogger';

(function(p) {
  
  function log(level, msg, params) {
    level = level || Logger.NOTSET;
    if (level >= this.level) {
      var prefix = this.prefix;
      if (level > Logger.INFO) {
        prefix += Logger.LEVELS[level]+ ': ';
      }
      if (params) {
        msg = UI.printf(msg, params);
      }
      global.print(prefix + msg);
    }
  }
  
  p.log = log;
})(CommandLineLogger.prototype);