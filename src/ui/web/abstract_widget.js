function AbstractWidget(doc) {
  this.doc = doc || document;
}

AbstractWidget.displayName = 'Widget';

(function(p) {
  function escapeHTML(html) {
    return (html + '').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }
  
  function toElement() {
    return this.element;
  }
  
  function appendChild(child) {
    var element = child && child.toElement ? child.toElement() : child;
    this.element.appendChild(element);
    return child;
  }
  
  p.appendChild = appendChild;
  p.escapeHTML = escapeHTML;
  p.toElement = toElement;
})(AbstractWidget.prototype);