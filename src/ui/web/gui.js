function WebGUI(doc) {
  AbstractWidget.call(this, doc);
  this._build();
}

chain(WebGUI, AbstractWidget);
WebGUI.displayName = 'WebGUI';

(function(p) {
  function _build() {
    this.element = this.doc.createElement('div');
    this.element.id = 'evidence';
    this.appendChild(new LabelledText('User agent string').setContent(global.navigator.userAgent).draw())
    this.status      = this.appendChild(new LabelledText('Status'));
    this.progressBar = this.appendChild(new ProgressBar(300));
    this.results     = this.appendChild(new LabelledText('Results'));
    return this;
  }
  
  function draw() {
    defer(function() {
      this.status.draw();
      this.progressBar.draw();
      this.results.draw();
    }, this);
  }
  
  function setResults(txt) {
    txt = this._appendFullStop(txt);
    this.results.setContent(txt);
    return this;
  }
  
  function setStatus(txt) {
    txt = this._appendFullStop(txt);
    this.status.setContent(txt);
    this.draw();
    return this;
  }
  
  function setProgress(ratio) {
    this.progressBar.setValue(ratio);
    return this;
  }
  
  function setLevel(level) {
    this.progressBar.setLevel(level);
    return this;
  }
  
  function _appendFullStop(txt) {
    return (txt + '').replace(/\.?\s*$/, '.');
  }
  
  p._build = _build;
  p.setResults = setResults;
  p.setStatus = setStatus;
  p.setProgress = setProgress;
  p.setLevel = setLevel;
  p._appendFullStop = _appendFullStop;
  p.draw = draw;
})(WebGUI.prototype);