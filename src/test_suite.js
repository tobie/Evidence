function TestSuite(name, tests) {
  this.name = name;
  this._tests = [];
  if (tests) {
    this.push.apply(this, tests);
  }
}

TestSuite.displayName = 'TestSuite';

(function(p) {
  function run(result) {
    this._index = 0;
    this._result = result;
    result.startSuite(this);
    this.next();
    return result;
  }
  
  function next() {
    var next = this._tests[this._index];
    if (next) {
      this._index++;
      next.run(this._result);
    } else {
      this._result.stopSuite(this);
      if (this.parent) {
        this.parent.next();
      } else {
        this._result.stop(new Date());
      }
    }
  }
  
  function push() {
    for (var i = 0, length = arguments.length; i < length; i++) {
      var test = arguments[i];
      test.parent = this;
      this._tests.push(test);
    }
  }
  
  function addTest(test) {
    test.parent = this;
    this._tests.push(test);
  }
  
  function addTests(tests) {
    for (var i = 0, length = tests.length; i < length; i++) {
      this.addTest(tests[i]);
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