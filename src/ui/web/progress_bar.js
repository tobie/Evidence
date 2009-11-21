function ProgressBar(width, doc) {
  this.width = width;
  this.level = 0;
  AbstractWidget.call(this, doc);
  this.build();
}

chain(ProgressBar, AbstractWidget);
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
  
  function update(ratio) {
    var value = Math.floor(ratio * this.width);
    defer(function() {
      this.progressBar.style.width = value + 'px';
    }, this);
    return this;
  }
  
  function setLevel(level) {
    if (level > this.level) {
      this.level = level;
      this.progressBar.className = (Logger.LEVELS[level] || '').toLowerCase();
    }
    return this;
  }
  
  p.build = build;
  p.createDiv = createDiv;
  p.update = update;
  p.setLevel = setLevel;
})(ProgressBar.prototype);