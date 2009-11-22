function Logger(level) {
  if (typeof level !== 'undefined') {
    this.level = level;
  }
}

Logger.displayName = 'Logger';
Logger.LEVELS = ['NOTSET', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'];
Logger.CRITICAL = 5;
Logger.ERROR    = 4;
Logger.WARN     = 3;
Logger.INFO     = 2;
Logger.DEBUG    = 1;
Logger.NOTSET   = 0;

(function(p) {
  function critical(template, params) {
    this.log(Logger.CRITICAL, template, params);
  }
  
  function error(template, params) {
    this.log(Logger.ERROR, template, params);
  }

  function warn(template, params) {
    this.log(Logger.WARN, template, params);
  }
  
  function info(template, params) {
    this.log(Logger.INFO, template, params);
  }
  
  function debug(template, params) {
    this.log(Logger.DEBUG, template, params);
  }
  
  function group(title) {
    this.prefix += '    ';
    //global.console.group(title);
  }
  
  function groupEnd() {
    //global.console.groupEnd();
    this.prefix = this.prefix.substr(0, this.prefix.length - 4);
  }
  
  function log(level, template, params) {
    level = level || Logger.NOTSET;
    var c = global.console;
    
    var method = Logger.LEVELS[level].toLowerCase();
    if (method === 'critical') { method = 'error'; }
    method = (method in c) ? method : 'log';
    template = this.prefix + template;
    if (level >= this.level) {
      if (params) {
        params = params.slice(0);
        params.unshift(template);
        c[method].apply(c, params);
      } else {
        c[method](template);
      }
    }
  }
  
  p.prefix   = '';
  p.group    = group;
  p.groupEnd = groupEnd;
  p.log      = log;
  p.critical = critical;
  p.error    = error;
  p.warn     = warn;
  p.info     = info;
  p.debug    = debug;
  p.level    = 0;
})(Logger.prototype);