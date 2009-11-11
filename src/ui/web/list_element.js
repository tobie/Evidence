function ListElement(name, doc) {
  this.name = name;
  this.doc = doc || document;
  this.level = 0;
}

ListElement.displayName = 'ListElement';

(function(p) {

  function build() {
    this.element = this.doc.createElement('li');
    var name = this.name.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    this.element.innerHTML = TEMPLATE.replace('{{ name }}', name);
    return this;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function setLevel(level) {
    if (level > this.level) {
      this.element.className = (Logger.LEVELS[level] || '').toLowerCase();;
      this.level = level;
      if (level > Logger.WARN) {
        this.element.firstChild.firstChild.checked = true;
      }
    }
    this.parent.setLevel(level);
  }
  
  var TEMPLATE = '<label><input type="checkbox" /> {{ name }}</label>';
  
  p.build = build;
  p.setLevel = setLevel;
  p.appendTo = appendTo;
})(ListElement.prototype);