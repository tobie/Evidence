function WebGUI(doc) {
  AbstractWidget.call(this, doc);
}

chain(WebGUI, AbstractWidget);
WebGUI.displayName = 'WebGUI';

(function(p) {
  function build() {
    this.element = this.doc.createElement('div');
    this.element.id = 'evidence';
    this.appendChild(new LabelledText('User agent string').update(global.navigator.userAgent))
    this.status      = this.appendChild(new LabelledText('Status').update('Idle.'));
    this.progressBar = this.appendChild(new ProgressBar(300));
    this.results     = this.appendChild(new LabelledText('Results'));
    return this;
  }
  
  
  function updateResults(txt) {
    txt = this.appendFullStop(txt);
    this.results.update(txt);
    return this;
  }
  
  function updateStatus(txt) {
    txt = this.appendFullStop(txt);
    this.status.update(txt);
    return this;
  }
  
  function updateProgressBar(ratio) {
    this.progressBar.update(ratio);
    return this;
  }
  
  function setLevel(level) {
    this.progressBar.setLevel(level);
    return this;
  }
  
  function appendFullStop(txt) {
    return (txt + '').replace(/\.?\s*$/, '.');
  }
  
  p.build = build;
  p.updateResults = updateResults;
  p.updateStatus = updateStatus;
  p.updateProgressBar = updateProgressBar;
  p.setLevel = setLevel;
  p.appendFullStop = appendFullStop;
})(WebGUI.prototype);