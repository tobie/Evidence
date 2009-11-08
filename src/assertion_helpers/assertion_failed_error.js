function AssertionFailedError(message, template, args) {
  this.message = message;
  this.template = template || '';
  this.args = args;
}

AssertionFailedError.displayName = 'AssertionFailedError';

(function(p) {
  p.name = 'AssertionFailedError';
})(AssertionFailedError.prototype);
