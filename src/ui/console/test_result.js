function ConsoleTestResult(logger) {
  TestResult.call(this);
  this.logger = logger;
}

chain(ConsoleTestResult, TestResult);
ConsoleTestResult.displayName = 'ConsoleTestResult';

(function(p) {
  var _super = TestResult.prototype;
  
  function addAssertion() {
    this.assertionCount++;
  }
  
  function addSkip(testcase, msg) {
    _super.addSkip.call(this, testcase, msg);
    this.logger.warn('Skipping testcase ' + testcase + ': ' + msg.message);
  }
  
  function addFailure(testcase, msg) {
    _super.addFailure.call(this, testcase, msg);
    this.logger.error(testcase + ': ' + msg.message + ' ' + msg.template, msg.args);
  }
  
  function addError(testcase, error) {
    _super.addError.call(this, testcase, error);
    this.logger.error(testcase + ' threw an error. ' + error);
  }
  
  function startTest(testcase) {
    _super.startTest.call(this, testcase);
    this.logger.debug('Started testcase ' + testcase + '.');
  }
  
  function stopTest(testcase) {
    this.logger.debug('Completed testcase ' + testcase + '.');
  }
  
  function pauseTest(testcase) {
    this.logger.info('Paused testcase ' + testcase + '.');
  }
  
  function resumeTest(testcase) {
    this.logger.info('Restarted testcase ' + testcase + '.');
  }
  
  function startSuite(suite) {
    this.logger.info('Started suite ' + suite + '.');
  }
  
  function stopSuite(suite) {
    this.logger.info('Completed suite ' + suite + '.');
  }
  
  function start(t0) {
    _super.start.call(this, t0);
    this.logger.info('Started tests.');
  }
  
  function stop(t1) {
    _super.stop.call(this, t1);
    this.logger.info('Completed tests in ' + ((t1 - this.t0)/1000) + 's.');
    this.logger.info(this.toString() + '.');
  }
  
  p.addAssertion  = addAssertion;
  p.addSkip       = addSkip;
  p.addFailure    = addFailure;
  p.addError      = addError;
  p.startTest     = startTest;
  p.stopTest      = stopTest;
  p.pauseTest     = pauseTest;
  p.resumeTest   = resumeTest;
  p.startSuite    = startSuite;
  p.stopSuite     = stopSuite;
  p.start         = start;
  p.stop          = stop;
})(ConsoleTestResult.prototype);


