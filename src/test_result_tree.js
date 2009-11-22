function TestResultTree(name) {
  this.testCount      = 0;
  this.assertionCount = 0;
  this.skipCount      = 0;
  this.skips          = [];
  this.failureCount   = 0;
  this.failures       = [];
  this.errors         = [];
  this.errorCount     = 0;
  this.testCount      = 0;
  this.name = name;
}

chain(TestResultTree, TestResult);
TestResultTree.displayName = 'TestResultTree';

(function(p) {
  function addAssertion() {
    var node = this.currentNode;
    do {
      node.assertionCount++;
    } while (node = node.parent);
  }
  
  function addSkip(testcase, reason) {
    var node = this.currentNode;
    do {
      node.skipCount++;
      node.skips.push(reason);
    } while (node = node.parent);
  }
  
  function addFailure(testcase, reason) {
    var node = this.currentNode;
    do {
      node.failureCount++;
      node.failures.push(reason);
    } while (node = node.parent);
  }
  
  function addError(testcase, error) {
    var node = this.currentNode;
    do {
      node.errorCount++;
      node.errors.push(error);
    } while (node = node.parent);
  }
  
  function startTest(testcase) {
    var node = this.createChildNode(testcase.name);
    do {
      node.testCount++;
    } while (node = node.parent);
  }
  
  function stopTest(testcase) {
    this.currentNode = this.currentNode.parent || this;
  }
  
  function startSuite(suite) {
    this.createChildNode(suite.name);
  }
  
  function stopSuite(suite) {
    this.currentNode = this.currentNode.parent || this;
  }
  
  function start(t0) {
    this.t0 = t0;
    this.currentNode = this;
  }
  
  function stop(t1) {
    this.t1 = t1;
    this.currentNode = null;
  }
  
  function toString() {
    var results = '';
    if (this.children) {
      results += this.testCount;
      results += ' tests, ';
    }
    return results +
           this.assertionCount + ' assertions, ' +
           this.failureCount   + ' failures, ' +
           this.errorCount     + ' errors, ' +
           this.skipCount      + ' skips';
  }
  
  function createChildNode(name) {
    var node = new this.constructor(name);
    this.currentNode.appendChild(node);
    this.currentNode = node;
    return node;
  }
  
  function appendChild(child) {
    this.children = this.children || [];
    this.children.push(child);
    child.parent = this;
  }
  
  function toASCIITree(prefix) {
    var str     = '',
        results = this.toString(),
        name    = this.name || 'Test results',
        childLength = this.children && this.children.length,
        rest,
        max;
    
    prefix = prefix || '';
    max = 100 - results.length - prefix.length;
    max = Math.max(max, 0);
    
    if (name.length > max) {
      name = '...' + name.substr(name.length - max + 3);
    }
    
    rest = (max - name.length);
    str += name;
    str += ' ';
    for (var i = 0; i < rest; i++) { str += '_'; }
    str += ' ';
    str += results;
    
    if (this.errorCount > 0) {
      str += ' E';
    } else if (this.failureCount > 0) {
      str += ' F';
    } else if (this.skipCount > 0) {
      str += ' S';
    }
    
    str += '\n';
    
    if (childLength) {
      for (var i = 0; i < childLength; i++) {
        str += prefix;
        if (i == childLength - 1) { // last
          str += '\'-- ';
          str += this.children[i].toASCIITree(prefix + '    ');
          str += prefix;
          str += '\n';
        } else {
          str += '|-- ';
          str += this.children[i].toASCIITree(prefix + '|   ');
        }
      }
    }
    return str;
  }
  
  p.toASCIITree   = toASCIITree;
  p.createChildNode = createChildNode;
  p.appendChild   = appendChild;
  p.addAssertion  = addAssertion;
  p.addSkip       = addSkip;
  p.addFailure    = addFailure;
  p.addError      = addError;
  p.startTest     = startTest;
  p.stopTest      = stopTest;
  p.startSuite    = startSuite;
  p.stopSuite     = stopSuite;
  p.start         = start;
  p.stop          = stop;
  p.toString      = toString;
})(TestResultTree.prototype);