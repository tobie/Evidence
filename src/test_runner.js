function TestRunner() {
}

TestRunner.displayName = 'TestRunner';

(function(p) {
  function run(suite) {
    var self = this,
        result = self._makeResult();
    Evidence.currentResult = result;
    this._suite = suite;
    self.start(result);
    suite.run(result, function(result) {
      self.stop(result);
    });
    return result;
  }
  
  function _makeResult() {
    return new TestResult();
  }
  
  function start(result) {
    result.start();
  }
  
  function stop(result) {
    result.stop();
  }
  
  p.start = start;
  p.stop = stop;
  p.run = run;
  p._makeResult = _makeResult;
})(TestRunner.prototype);
