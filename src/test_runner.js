function TestRunner() {
}

TestRunner.displayName = 'TestRunner';

(function(p) {
  function run(suite) {
    var result = this._makeResult();
    result.start(new Date());
    suite.run(result);
    return result;
  }
  
  function _makeResult() {
    return new TestResult();
  }
  
  p.run = run;
  p._makeResult = _makeResult;
})(TestRunner.prototype);
