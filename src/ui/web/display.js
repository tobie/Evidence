function WebDisplay(label, content, doc) {
  this.label = label;
  this.content = content
  this.doc = doc || document;
}

WebDisplay.displayName = 'WebDisplay';

(function(p) {
  function build() {
    this.element = this.doc.createElement('p');
    this.update(this.content);
    return this;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function update(content) {
    content = content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    content = TEMPLATE.replace('{{ label }}', this.label).replace('{{ content }}', content);
    this.element.innerHTML = content;
    return this;
  }
  
  var TEMPLATE =  '<strong>{{ label }}:</strong> {{ content }}';
  
  p.build = build;
  p.update = update;
  p.appendTo = appendTo;
})(WebDisplay.prototype);