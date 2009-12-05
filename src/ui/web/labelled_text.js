function LabelledText(label, doc) {
  AbstractWidget.call(this, doc)
  this.label = label;
  this.element = this.doc.createElement('p');
}

chain(LabelledText, AbstractWidget);
LabelledText.displayName = 'LabelledText';

(function(p) {
  function setContent(content) {
    this._content = this.escapeHTML(content);
    this._content = TEMPLATE.replace('{{ label }}', this.label).replace('{{ content }}', content);
    return this;
  }
  
  function draw() {
    this.element.innerHTML = this._content;
    return this;
  }
  
  var TEMPLATE =  '<strong>{{ label }}:</strong> {{ content }}';
  
  p.setContent = setContent;
  p.draw = draw;
})(LabelledText.prototype);