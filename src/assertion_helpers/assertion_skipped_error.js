function AssertionSkippedError(message) {
  this.message = message;
}

AssertionSkippedError.displayName = 'AssertionSkippedError';

(function(p) {
  p.name = 'AssertionSkippedError';
})(AssertionSkippedError.prototype);
