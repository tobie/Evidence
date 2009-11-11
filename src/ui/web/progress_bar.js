function ProgressBar(width, doc) {
  this.width = width;
  this.level = 0;
  this.doc = doc || document;
}

ProgressBar.displayName = 'ProgressBar';

(function(p) {
  function build() {
    this.element = this.createDiv(this.width);
    this.element.id = 'evidence_progress_bar_container';
    this.progressBar = this.createDiv(0);
    this.progressBar.id = 'evidence_progress_bar';
    this.element.appendChild(this.progressBar);
    return this;
  }
  
  function createDiv(width) {
    var element = this.doc.createElement('div');
    element.style.width = width + 'px';
    return element;
  }
  
  function appendDiv(width) {
    var element = this.createDiv(width);
    this.element.appendChild(element);
    return element;
  }
  
  function appendTo(container) {
    container.appendChild(this.element);
    return this;
  }
  
  function update(ratio) {
    var value = Math.floor(ratio * this.width);
    this.progressBar.style.width = value + 'px';
    return this;
  }
  
  function setStatus(level) {
    if (level > this.level) {
      this.level = level;
      this.progressBar.className = (Logger.LEVELS[level] || '').toLowerCase();
    }
    return this;
  }
  
  p.build = build;
  p.createDiv = createDiv;
  p.appendDiv = appendDiv;
  p.update = update;
  p.setStatus = setStatus;
  p.appendTo = appendTo;
})(ProgressBar.prototype);