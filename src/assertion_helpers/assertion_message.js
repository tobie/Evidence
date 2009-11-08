function AssertionMessage(message, template, args) {
  this.message = message.replace(/%/g, '%%');
  this.template = template || '';
  this.args = args;
}

AssertionMessage.displayName = 'AssertionMessage';

(function(p) {
  function toString() {
    return UI.printf(this.message + this.template, this.args);
  }
  p.toString = toString;
})(AssertionMessage.prototype);
