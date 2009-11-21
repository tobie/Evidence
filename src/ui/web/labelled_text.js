function LabelledText(label, doc) {
  AbstractWidget.call(this, doc)
  this.label = label;
  this.element = this.doc.createElement('p');
}

chain(LabelledText, AbstractWidget);
LabelledText.displayName = 'LabelledText';

(function(p) {
  function update(content) {
    content = this.escapeHTML(content);
    content = TEMPLATE.replace('{{ label }}', this.label).replace('{{ content }}', content);
    defer(function() { this.element.innerHTML = content; }, this);
    return this;
  }
  
  var TEMPLATE =  '<strong>{{ label }}:</strong> {{ content }}';
  
  p.update = update;
})(LabelledText.prototype);