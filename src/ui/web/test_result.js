function WebTestResult() {
  TestResult.call(this);
}

chain(WebTestResult, TestResult);
WebTestResult.displayName = 'WebTestResult';

(function(p) {
  var _super = TestResult.prototype;
  
  function addAssertion() {
    this.assertionCount++;
    this.updateResults();
  }
  
  function addSkip(testcase, msg) {
    _super.addSkip.call(this, testcase, msg);
    this.updateResults();
    this.setLevel(Logger.WARN);
    this.updateStatus('Skipping testcase ' + testcase + ': ' + msg.message);
  }
  
  function addFailure(testcase, msg) {
    _super.addFailure.call(this, testcase, msg);
    this.updateResults();
    this.setLevel(Logger.ERROR);
    this.updateStatus(testcase + ': ' + msg.message + ' ' + msg.template, msg.args);
  }
  
  function addError(testcase, error) {
    _super.addError.call(this, testcase, error);
    this.updateResults();
    this.setLevel(Logger.ERROR);
    this.updateStatus(testcase + ' threw an error. ' + error);
  }
  
  function startTest(testcase) {
    _super.startTest.call(this, testcase);
    this.updateStatus('Started testcase ' + testcase + '.');
    this.gui.addListElement(testcase);
  }
  
  function stopTest(testcase) {
    this.updateProgressBar();
    this.updateStatus('Completed testcase ' + testcase + '.');
  }
  
  function pauseTest(testcase) {
    this.updateStatus('Paused testcase ' + testcase + '...');
  }
  
  function restartTest(testcase) {
    this.updateStatus('Restarted testcase ' + testcase + '.');
  }
  
  function startSuite(suite) {
    if (!this.size) {
      this.size = suite.size();
    }
    this.gui.addList(suite);
    this.updateStatus('Started suite ' + suite + '.');
  }
  
  function stopSuite(suite) {
    this.updateStatus('Completed suite ' + suite + '.');
  }
  
  function start(t0) {
    _super.start.call(this, t0);
    this.gui = new WebGUI(document);
    this.gui.build().appendTo(document.body);
    this.updateResults();
  }
  
  function stop(t1) {
    _super.stop.call(this, t1);
    this.updateStatus('Completed tests in ' + ((t1 - this.t0)/1000) + 's.');
  }
  
  function updateResults() {
    this.gui.results.update(this + '.');
  }
  
  function updateStatus(txt) {
    this.gui.status.update(txt);
  }
  
  function updateProgressBar() {
    this.gui.progressBar.update(this.testCount/this.size);
  }
  
  function setLevel(level) {
    this.gui.progressBar.setLevel(level);
    this.gui.testcase.setLevel(level);
  }
  
  p.updateResults = updateResults;
  p.updateStatus  = updateStatus;
  p.updateProgressBar = updateProgressBar;
  p.setLevel      = setLevel;
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
})(WebTestResult.prototype);


