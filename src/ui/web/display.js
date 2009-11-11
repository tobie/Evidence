function WebDisplay(label, content, doc) {
  this.labelText = label;
  this.contentText = content
  this.id = 'evidence_' + label.replace(/\s/g, '_').toLowerCase();
  this.doc = doc || document;
}

WebDisplay.displayName = 'WebDisplay';

(function(p) {
  function build() {
    this.element = this.doc.createElement('p');
    this.label = this.appendElement('strong', this.labelText + ':');
    var space = this.doc.createTextNode(' ');
    this.element.appendChild(space)
    this.content = this.appendElement('span', this.contentText);
    this.content.id = this.id;
    return this;
  }
  
  function createElement(tagName, content) {
    var element = this.doc.createElement(tagName);
    content = this.doc.createTextNode(content || '');
    element.appendChild(content);
    return element;
  }
  
  function appendElement(tagName, content) {
    var element = this.createElement(tagName, content);
    this.element.appendChild(element);
    return element;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function update(content) {
    this.content.removeChild(this.content.firstChild);
    content = this.doc.createTextNode(content);
    this.content.appendChild(content);
    return this;
  }
  
  p.build = build;
  p.createElement = createElement;
  p.appendElement = appendElement;
  p.update = update;
  p.appendTo = appendTo;
})(WebDisplay.prototype);