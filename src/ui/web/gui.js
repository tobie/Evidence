function WebGUI(doc) {
  this.doc = doc || document;
}

WebGUI.displayName = 'WebGUI';

(function(p) {
  function build() {
    this.element = this.doc.createElement('div');
    this.element.id = 'evidence';
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
  
  function addListElement(testcase) {
    this.testcase = new ListElement(testcase.name).build();
    this.suite.appendChild(this.testcase);
  }
  
  function addList(suite) {
    this.suite = new List(suite.name).build().appendTo(this.element);
  }
  
  p.addListElement = addListElement;
  p.addList = addList;
  p.build = build;
  p.appendTo = appendTo;
})(WebGUI.prototype);