/*  evidence.js, version <%= EVIDENCE_VERSION %>
 *  
 *  Copyright (c) 2009 Tobie Langel (http://tobielangel.com)
 *
 *  evidence.js is freely distributable under the terms of an MIT-style license.
 *--------------------------------------------------------------------------*/
 
(function(global) {
  var originalEvidence = global.Evidence,
      originalOnload   = global.onload;
  
  /**
  * Evidence(tests) -> Evidence.TestResult
  * Library namespace. Doubles-up as a shortcut for
  * running tests and collect tests results.
  *
  **/
  function Evidence() {
    TestCase.extend.apply(TestCase, arguments);
  }
  
  /**
  * Evidence.noConflict() -> evidence
  * Restores the global namespace and returns the evidence object.
  *
  **/
  function noConflict() {
    global.Evidence = originalEvidence;
    return Evidence;
  }
  
  Evidence.noConflict = noConflict;
  Evidence.VERSION    = '<%= EVIDENCE_VERSION %>';
  
  //= require "helpers"
  //= require "assertions"
  Evidence.Assertions = Assertions;
  //= require "test_case"
  Evidence.TestCase = TestCase;
  //= require "test_suite"
  Evidence.TestSuite = TestSuite;
  //= require "test_runner"
  Evidence.TestRunner = TestRunner;
  //= require "test_loader"
  Evidence.TestLoader = TestLoader;
  //= require "auto_runner"
  Evidence.AutoRunner = AutoRunner;
  //= require "test_result"
  Evidence.TestResult = TestResult;
  //= require "test_result_tree"
  Evidence.TestResultTree = TestResultTree;
  //= require "ui"
  Evidence.UI = UI;

  var defaultLoader = new TestLoader();
  Evidence.defaultLoader = defaultLoader;
  
  global.Evidence = Evidence;
  
  if (global.location) {
    global.onload = function() {
      if (typeof originalOnload === 'function') {
        originalOnload.call(global);
      }
      AutoRunner.run();
    };
  } else if (global.arguments) {
    var runtime = java.lang.Runtime.getRuntime();
    var thread = new java.lang.Thread(function() {
      AutoRunner.run();
    });
    runtime.addShutdownHook(thread);
  }

})(this);
