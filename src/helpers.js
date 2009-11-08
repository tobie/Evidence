var FILE_REGEXP = /.*?\/(\w+\.html)(.*)/;

function getNameFromFile() {
  return (global.location || '').toString().replace(FILE_REGEXP, '$1');
}

function chain(subclass, superclass) {
  function Subclass() {}
  Subclass.prototype = superclass.prototype;
  subclass.prototype = new Subclass();
  subclass.prototype.constructor = subclass;
  return subclass;
}

function defer(block, context) {
  if ('setTimeout' in global) {
    window.setTimeout(function() { 
      block.call(context);
    }, 10);
  } else {
    block.call(context);
  }
}