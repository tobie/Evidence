//= require "assertion_helpers/assertion_skipped_error"
Evidence.AssertionSkippedError = AssertionSkippedError;
//= require "assertion_helpers/assertion_failed_error"
Evidence.AssertionFailedError = AssertionFailedError;
//= require "assertion_helpers/assertion_message"
Evidence.AssertionMessage = AssertionMessage;

var Assertions = (function() {
  function _assertExpression(expression, message, template) {
    /*for (var i=0; i < 100000; i++) {
      (function(){})()
    }*/
    if (expression) {
      this.addAssertion();
    } else {
      var args = Array.prototype.slice.call(arguments, 3);
      throw new AssertionFailedError(message, template, args);
    }
  }
  
  function skip(message) {
    throw new AssertionSkippedError(message || 'Skipped!');
  }
  
  function fail(message) {
    this._assertExpression(false, message || 'Flunked!');
  }
  
  function assert(test, message) {
    this._assertExpression(
      !!test,
      message || 'Failed assertion.',
      'Expected %o to evaluate to true.', test
    );
  }
  
  function refute(test, message) {
    this._assertExpression(
      !test,
      message || 'Failed refutation.',
      'Expected %o to evaluate to false.', test
    );
  }
  
  function assertTrue(test, message) {
    this._assertExpression(
      (test === true),
      message || 'Failed assertion.',
      'Expected %o to be true.', test
    );
  }
  
  function refuteTrue(test, message) {
    this._assertExpression(
      (test !== true),
      message || 'Failed refutation.',
      'Expected %o to not be true.', test
    );
  }
  
  function assertNull(test, message) {
    this._assertExpression(
      (test === null),
      message || 'Failed assertion.',
      'Expected %o to be null.', test
    );
  }
  
  function refuteNull(test, message) {
    this._assertExpression(
      (test !== null),
      message || 'Failed refutation.',
      'Expected %o to not be null.', test
    );
  }
  
  function assertUndefined(test, message) {
    this._assertExpression(
      (typeof test === 'undefined'),
      message || 'Failed assertion.',
      'Expected %o to be undefined.', test
    );
  }
  
  function refuteUndefined(test, message) {
    this._assertExpression(
      (typeof test !== 'undefined'),
      message || 'Failed refutation.',
      'Expected %o to not be undefined.', test
    );
  }
  
  function assertFalse(test, message) {
    this._assertExpression(
      (test === false),
      message || 'Failed assertion.',
      'Expected %o to be false.', test
    );
  }
  
  function refuteFalse(test, message) {
    this._assertExpression(
      (test !== false),
      message || 'Failed refutation.',
      'Expected %o to not be false.', test
    );
  }

  function assertEqual(expected, actual, message) {
    this._assertExpression(
      (expected == actual),
      message || 'Failed assertion.',
      'Expected %o to be == to %o.', actual, expected
    );
  }
  
  function refuteEqual(expected, actual, message) {
    this._assertExpression(
      (expected != actual),
      message || 'Failed refutation.',
      'Expected %o to be != to %o.', actual, expected
    );
  }
  
  function assertIdentical(expected, actual, message) {
    this._assertExpression(
      (expected === actual),
      message || 'Failed assertion.',
      'Expected %o to be === to %o.', actual, expected
    );
  }
  
  function refuteIdentical(expected, actual, message) {
    this._assertExpression(
      (expected !== actual),
      message || 'Failed refutation.',
      'Expected %o to be !== to %o.', actual, expected
    );
  }
  
  function assertIn(property, object, message) {
    this._assertExpression(
      (property in object),
      message || 'Failed assertion.',
      'Expected "%s" to be a property of %o.', property, object
    );
  }
  
  function refuteIn(property, object, message) {
    this._assertExpression(
      !(property in object),
      message || 'Failed refutation.',
      'Expected "%s" to not be a property of %o.', property, object
    );
  }
  
  return {
    _assertExpression: _assertExpression,
    skip: skip,
    assert: assert,
    refute: refute,
    assertNot: refute,    
    assertTrue: assertTrue,
    assertNull: assertNull,
    assertUndefined: assertUndefined,
    assertFalse: assertFalse,
    assertIdentical: assertIdentical,
    refuteIdentical: refuteIdentical,
    assertEqual: assertEqual,
    refuteEqual: refuteEqual,
    assertIn: assertIn,
    refuteIn: refuteIn,
    fail: fail,
    flunk: fail
  };
})();