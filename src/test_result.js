function TestResult() {
  this.testCount      = 0;
  this.assertionCount = 0;
  this.skipCount      = 0;
  this.skips          = [];
  this.failureCount   = 0;
  this.failures       = [];
  this.errors         = [];
  this.errorCount     = 0;
  this.testCount      = 0;
}

TestResult.displayName = 'TestResult';

(function(p) {
  function addAssertion() {
    this.assertionCount++;
  }
  
  function addSkip(testcase, reason) {
    this.skipCount++;
    this.skips.push(reason);
  }
  
  function addFailure(testcase, reason) {
    this.failureCount++;
    this.failures.push(reason);
  }
  
  function addError(testcase, error) {
    this.errorCount++;
    this.errors.push(error);
  }
  
  function startTest(testcase) {
    this.testCount++;
  }
  
  function stopTest(testcase) {}
  
  function pauseTest(testcase) {}
  
  function restartTest(testcase) {}
  
  function startSuite(suite) {}
  
  function stopSuite(suite) {}
  
  function start(t0) {
    this.t0 = t0;
  }
  
  function stop(t1) {
    this.t1 = t1;
  }
  
  function toString() {
    return this.testCount      + ' tests, ' +
           this.assertionCount + ' assertions, ' +
           this.failureCount   + ' failures, ' +
           this.errorCount     + ' errors, ' +
           this.skipCount      + ' skips';
  }
  
  p.addAssertion  = addAssertion;
  p.addSkip       = addSkip;
  p.addFailure    = addFailure;
  p.addError      = addError;
  p.startTest     = startTest;
  p.stopTest      = stopTest;
  p.pauseTest     = pauseTest;
  p.restartTest   = restartTest;
  p.startSuite    = startSuite;
  p.stopSuite     = stopSuite;
  p.start         = start;
  p.stop          = stop;
  p.toString      = toString;
})(TestResult.prototype);