function WebTestResult(name) {
  TestResultTree.call(this, name);
  this.pageCount = 0;
}

chain(WebTestResult, TestResultTree);
WebTestResult.displayName = 'WebTestResult';

(function(p) {
  var _super = TestResultTree.prototype;
  
  function addAssertion() {
    _super.addAssertion.call(this);
    this.gui.updateResults(this);
  }
  
  function addSkip(testcase, msg) {
    _super.addSkip.call(this, testcase, msg);
    var gui = this.gui;
    gui.updateResults(this);
    gui.setLevel(Logger.WARN);
    gui.updateStatus('Skipping testcase ' + testcase + ': ' + msg.message);
  }
  
  function addFailure(testcase, msg) {
    _super.addFailure.call(this, testcase, msg);
    var gui = this.gui;
    gui.updateResults(this);
    gui.setLevel(Logger.ERROR);
    gui.updateStatus(testcase + ': ' + msg.message + ' ' + msg.template, msg.args);
  }
  
  function addError(testcase, error) {
    _super.addError.call(this, testcase, error);
    var gui = this.gui;
    gui.updateResults(this);
    gui.setLevel(Logger.ERROR);
    gui.updateStatus(testcase + ' threw an error. ' + error);
  }
  
  function startTest(testcase) {
    _super.startTest.call(this, testcase);
    this.gui.updateStatus('Started testcase ' + testcase);
  }
  
  function stopTest(testcase) {
    _super.stopTest.call(this, testcase);
    var gui = this.gui;
    gui.updateProgressBar(this.getRatio());
    gui.updateStatus('Completed testcase ' + testcase);
  }
  
  function pauseTest(testcase) {
    this.gui.updateStatus('Paused testcase ' + testcase + '...');
  }
  
  function resumeTest(testcase) {
    this.gui.updateStatus('Resumed testcase ' + testcase);
  }
  
  function startSuite(suite) {
    _super.startSuite.call(this, suite);
    if (!this.size) { this.size = suite.size(); }
    this.gui.updateStatus('Started suite ' + suite);
  }
  
  function stopSuite(suite) {
    _super.stopSuite.call(this, suite);
    this.gui.updateStatus('Completed suite ' + suite);
  }
  
  function loadPage(page) {
    this.gui.updateStatus('Loading page ' + page.location.pathname + '...');
  }
  
  function startPage(page, suite) {
    this.pageSize = suite.size();
    this.previousTestCount = this.testCount;
    this.gui.updateStatus('Loaded page ' + page.location.pathname);
  }
  
  function stopPage(page) {
    this.pageCount++;
    this.gui.updateStatus('Finished page ' + page.location.pathname);
  }
  
  function getRatio() {
    if (!this.pageSize) {
      return this.testCount / this.size;
    }
    var pageRatio = (this.testCount - this.previousTestCount) / this.pageSize;
    return (pageRatio + this.pageCount) / this.size;
  }
  
  function start() {
    _super.start.call(this);
    var gui = new WebGUI(document);
    this.gui = gui;
    document.body.appendChild(gui.build().toElement());
    gui.updateResults(this);
  }
  
  function stop() {
    _super.stop.call(this);
    this.gui.updateStatus('Completed tests in ' + ((this.t1 - this.t0)/1000) + 's');

    var builder = new AsciiViewBuilder();
    console.log(builder.build(this))
  }
  
  p.getRatio      = getRatio;
  p.addAssertion  = addAssertion;
  p.addSkip       = addSkip;
  p.addFailure    = addFailure;
  p.addError      = addError;
  p.startTest     = startTest;
  p.stopTest      = stopTest;
  p.pauseTest     = pauseTest;
  p.resumeTest    = resumeTest;
  p.startSuite    = startSuite;
  p.stopSuite     = stopSuite;
  p.loadPage      = loadPage;
  p.startPage     = startPage;
  p.stopPage      = stopPage;
  p.start         = start;
  p.stop          = stop;
})(WebTestResult.prototype);


