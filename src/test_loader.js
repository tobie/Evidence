function TestLoader() {
}

TestLoader.displayName = 'TestLoader';

(function(p) {
  function loadTestsFromTestCase(testcaseClass) {
    var suite = new TestSuite(testcaseClass.displayName),
        props = this.getTestCaseNames(testcaseClass);
    for (var i=0; i < props.length; i++) {
      suite.push(new testcaseClass(props[i]));
    }
    return suite;
  }
  
  function loadTestsFromTestCases(testcases) {
    var suite = new TestSuite(getNameFromFile());
    for (var i = 0; i < testcases.length; i++) {
      var testcase = testcases[i];
      var subSuite = defaultLoader.loadTestsFromTestCase(testcase);
      if (!subSuite.isEmpty()) { suite.push(subSuite); }
    }
    return suite;
  }
  
  function getTestCaseNames(testcaseClass) {
    var results = [],
        proto = testcaseClass.prototype,
        prefix = this.testMethodPrefix;
        
    for (var property in proto) {
      if (property.indexOf(prefix) === 0) {
        results.push(property);
      }
    }
    return results.sort();
  }
  
  function loadRegisteredTestCases() {
    return loadTestsFromTestCases(TestCase.subclasses);
  }
  
  p.loadTestsFromTestCase = loadTestsFromTestCase;
  p.loadRegisteredTestCases = loadRegisteredTestCases;
  p.loadTestsFromTestCases = loadTestsFromTestCases;
  p.testMethodPrefix = 'test';
  p.getTestCaseNames = getTestCaseNames;

})(TestLoader.prototype);