function WebGUI(doc) {
  this.doc = doc || document;
}

WebGUI.displayName = 'WebGUI';

(function(p) {
  var PREFIX = 'evidence';

  function build() {
    this.element = this.doc.createElement('div');
    this.element.id = PREFIX;
    new WebDisplay('User agent string', global.navigator.userAgent).build().appendTo(this.element)
    this.status = new WebDisplay('Status', 'Idle.').build().appendTo(this.element)
    this.progressBar = new ProgressBar(300).build().appendTo(this.element)
    this.results = new WebDisplay('Results', '').build().appendTo(this.element)
    return this;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function addLi(testname, failure) {
    
  }
  
  p.build = build;
  p.appendTo = appendTo;
})(WebGUI.prototype);