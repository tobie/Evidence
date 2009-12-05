function AsciiViewBuilder(result) {
  this.prefix = '';
  this._result = result;
}

AsciiViewBuilder.name = AsciiViewBuilder.displayName = 'AsciiViewBuilder';

(function(p) {
  
  function draw() {
     return this._build(this._result);
  }
  
  function _build(r) {
     var rString = r.toString(),
         max = 100 - rString.length - this.prefix.length,
         str = r.name || 'Anonymous TestSuite';
         
     str = this._truncate(str, max);
     str += ' ' + this._times('.', max - str.length) + ' ';
     str += rString;
     str += this._displayStatus(r)
     str += '\n';
     
     var length = r.children ? r.children.length : 0,
         i;
     for (i = 0; i < length; i++) {
       if (i === length - 1) { // last
         str += this._buildChild('    ', '\'-- ', r.children[i], this.prefix + '\n');
       } else {
         str += this._buildChild('|   ', '|-- ', r.children[i]);
       }
     }
     return str;
  }
  
  function _buildChild(modifier, prefix, child, suffix) {
    var str, original = this.prefix;
    suffix = suffix || '';
    this.prefix += modifier;
    str = original + prefix + this._build(child) + suffix;
    this.prefix = original;
    return str;
  }
  
  function _truncate(str, size) {
    size = Math.max(size, 0);
    if (str.length > size) {
      return '...' + str.substr(str.length - size + 3);
    }
    return str;
  }
  
  function _times(c, times) {
    var str = '';
    for (var i = 0; i < times; i++) { str += c; }
    return str;
  }
  
  function _displayStatus(r) {
    if (r.children) { return ''; }
    if (r.errorCount > 0) { return ' E'; }
    if (r.failureCount > 0) { return ' F'; }
    if (r.skipCount > 0) { return ' S'; }
    return '';
  }
  
  p.draw = draw;
  p._build = _build;
  p._buildChild = _buildChild;
  p._displayStatus = _displayStatus;
  p._times = _times;
  p._truncate = _truncate;
})(AsciiViewBuilder.prototype); 