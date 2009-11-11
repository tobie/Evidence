function List(name, doc) {
  this.name = name;
  this.doc = doc || document;
  this.level = 0;
}

List.displayName = 'List';

(function(p) {

  function build() {
    this.element = this.doc.createElement('div');
    this.element.className = 'suite';
    var name = this.name.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    this.element.innerHTML = TEMPLATE.replace('{{ name }}', name);
    return this;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function appendChild(child) {
    this.children = this.children || [];
    this.children.push(child);
    child.parent = this;
    this.element.lastChild.appendChild(child.element);
    return this;
  }
  
  function setLevel(level) {
    if (level > this.level) {
      this.element.className = 'suite ' + (Logger.LEVELS[level] || '').toLowerCase();;
      this.element.lastChild.style.display = '';
      this.level = level;
      if (level > Logger.WARN) {
        this.element.firstChild.firstChild.firstChild.checked = true;
      }
      if (this.parent) {
        this.parent.setLevel(level);
      }
    }
  }
  
  var TEMPLATE = '<h3><label><input type="checkbox" /> {{ name }}</label></h3><ul style="display: none;"></ul>';
  
  p.build = build;
  p.setLevel = setLevel;
  p.appendTo = appendTo;
  p.appendChild = appendChild;
})(List.prototype);