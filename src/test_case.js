function TestCase(methodName) {
  this._methodName = methodName;
  this.name = methodName;
}

(function() {
  function extend(name, methods) {
    function TestCaseSubclass(methodName) {
      TestCase.call(this, methodName);
    }
    
    if (!methods) {
      methods = name;
      name = getNameFromFile();
    }
    
    chain(TestCaseSubclass, this);
    TestCaseSubclass.displayName = name;
    TestCaseSubclass.extend = extend;
    
    for(var prop in methods) {
      TestCaseSubclass.prototype[prop] = methods[prop];
    }
    TestCase.subclasses.push(TestCaseSubclass);
    return TestCaseSubclass;
  }
  
  // Mixin Assertions
  function AssertionsMixin() {}
  AssertionsMixin.prototype = Assertions;
  TestCase.prototype = new AssertionsMixin();
  TestCase.constructor = TestCase;
  
  TestCase.displayName = 'TestCase';
  TestCase.extend      = extend;
  TestCase.subclasses  = [];
  TestCase.defaultTimeout = 10000;
})();

(function(p) {
  function run(result) {
    this._result = result;
    defer(this.next, this);
  }
  function next() {
    try {
      if (this._nextAssertions) {
        this._result.resumeTest(this);
        this._nextAssertions(this);
      } else {
        /*this._globalProperties = objectKeys(global);*/
        this._result.startTest(this);
        this.setUp(this);
        this[this._methodName](this);
      }
    } catch(e) {
      this._filterException(e);
    } finally {
      if (this._paused) {
        this._result.pauseTest(this);
      } else {
        try {
          this.tearDown(this);
        } catch(e) {
          this._filterException(e);
        } finally {
          this._nextAssertions = null;
          this._result.stopTest(this);
          this.parent.next();
        }
      }
    }
  }
  
  function _filterException(e) {
    // Check e.name for cross-frame support.
    var name = e.name;
    switch(name) {
      case 'AssertionFailedError':
        this._result.addFailure(this, e);
        break;
      case 'AssertionSkippedError':
        this._result.addSkip(this, e);
        break;
      default:
        this._result.addError(this, e);
    }
  }
  
  function pause(assertions) {
    this._paused = true;
    var self = this;
    if (assertions) { this._nextAssertions = assertions; }
    self._timeoutId = global.setTimeout(function() {
      self.resume(function() {
        self.fail('Test timed out. Testing was not resumed after being paused.');
      });
    }, TestCase.defaultTimeout);
  }
  
  function resume(assertions) {
    if (this._paused) { // avoid race conditions
      this._paused = false;
      global.clearTimeout(this._timeoutId);
      if (assertions) { this._nextAssertions = assertions; }
      this.next();
    }
  }
  
  function size() {
    return 1;
  }
  
  function toString() {
    return this.constructor.displayName + '#' + this.name;
  }
  
  function addAssertion() {
    this._result.addAssertion();
  }
  
  p.run              = run;
  p.next             = next;
  p.addAssertion     = addAssertion;
  p._filterException = _filterException;
  p.pause            = pause;
  p.resume           = resume;
  p.size             = size;
  p.toString         = toString;
  p.setUp            = function() {};
  p.tearDown         = function() {};
})(TestCase.prototype);
