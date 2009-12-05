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
  
  function run(result, callback) {
    this._result = result;
    this._callback = callback || function() {};
    defer(function() { this.next(result); }, this);
  }
  
  function next(result) {
    try {
      if (this._nextAssertions) {
        result.resumeTest(this);
        this._nextAssertions(this);
      } else {
        result.startTest(this);
        this.setUp(this);
        this[this._methodName](this);
      }
    } catch(e) {
      this._filterException(e);
    } finally {
      if (this._paused) {
        result.pauseTest(this);
      } else {
        try {
          this.tearDown(this);
        } catch(e) {
          this._filterException(e);
        } finally {
          this._nextAssertions = null;
          result.stopTest(this);
          this._callback(result);
        }
      }
    }
  }
  
  function _filterException(e) {
    // Check e.name for cross-frame support.
    var name = e.name,
        result = this._result;
    switch(name) {
      case 'AssertionFailedError':
        result.addFailure(this, e);
        break;
      case 'AssertionSkippedError':
        result.addSkip(this, e);
        break;
      default:
        result.addError(this, e);
    }
  }
  
  function pause(assertions) {
    var self = this;
    this._paused = true;
    if (assertions) { self._nextAssertions = assertions; }
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
      this.next(this._result);
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
