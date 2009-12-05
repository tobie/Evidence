function TestSuite(name, tests) {
  this.name = name;
  this._tests = [];
  if (tests) {
    this.push.apply(this, tests);
  }
}

TestSuite.displayName = 'TestSuite';

(function(p) {
  function run(result, callback) {
    this._index = 0;
    this._callback = callback || function() {};
    result.startSuite(this);
    this.next(result);
    return result;
  }
  
  function next(result) {
    var self = this,
        next = self._tests[self._index];
    if (next) {
      self._index++;
      next.run(result, function(result) { 
        self.next(result);
      });
    } else {
      result.stopSuite(self);
      self._callback(result);
    }
  }
  
  function push() {
    for (var i = 0, length = arguments.length; i < length; i++) {
      this._tests.push(arguments[i]);
    }
  }
  
  function addTest(test) {
    this._tests.push(test);
  }
  
  function addTests(tests) {
    for (var i = 0, length = tests.length; i < length; i++) {
      this._tests.push(tests[i]);
    }
  }
  
  function size() {
    var tests  = this._tests,
        length = tests.length,
        sum    = 0;
        
    for (var i = 0; i < length; i++) {
      sum += tests[i].size();
    }
    return sum;
  }
  
  function isEmpty() {
    return this.size() === 0;
  }
  
  function toString() {
    return this.name;
  }
  
  p.run  = run;
  p.next = next;
  p.push = push;
  p.size = size;
  p.isEmpty = isEmpty;
  p.toString = toString;
})(TestSuite.prototype);