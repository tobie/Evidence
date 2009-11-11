function WebTestRunner(logger) {
  TestRunner.call(this);
  this.logger = logger;
}

chain(WebTestRunner, TestRunner);
WebTestRunner.displayName = 'WebTestRunner';

(function(p) {
  function _makeResult() {
    return new WebTestResult();
  }
  
  p._makeResult = _makeResult;
})(WebTestRunner.prototype);
