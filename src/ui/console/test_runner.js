function ConsoleTestRunner(logger) {
  TestRunner.call(this);
  this.logger = logger;
}

chain(ConsoleTestRunner, TestRunner);
ConsoleTestRunner.displayName = 'ConsoleTestRunner';

(function(p) {
  function _makeResult() {
    return new ConsoleTestResult(this.logger);
  }
  
  p._makeResult = _makeResult;
})(ConsoleTestRunner.prototype);
