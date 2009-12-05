function ProgressBar(width, doc) {
  this._width = width;
  this._level = 0;
  AbstractWidget.call(this, doc);
  this._build();
}

chain(ProgressBar, AbstractWidget);
ProgressBar.displayName = 'ProgressBar';

(function(p) {
  function _build() {
    this.element = this._createDiv(this.width);
    this.element.id = 'evidence_progress_bar_container';
    this.progressBar = this._createDiv(0);
    this.progressBar.id = 'evidence_progress_bar';
    this.element.appendChild(this.progressBar);
    return this;
  }
  
  function _createDiv(width) {
    var element = this.doc.createElement('div');
    element.style.width = width + 'px';
    return element;
  }
  
  function draw() {
    this.progressBar.style.width = this._value + 'px';
    var className = (Logger.LEVELS[this._level] || '').toLowerCase();
    this.progressBar.className = className;
    return this;
  }
  
  function setValue(ratio) {
    this._value = Math.floor(ratio * this._width);
    return this;
  }
  
  function setLevel(level) {
    if (level > this._level) {
      this._level = level;
    }
    return this;
  }
  
  p._build = _build;
  p._createDiv = _createDiv;
  p.draw = draw;
  p.setValue = setValue;
  p.setLevel = setLevel;
})(ProgressBar.prototype);