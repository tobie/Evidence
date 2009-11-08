function PopupLogger(level) {
  Logger.call(this, level);
}

chain(PopupLogger, Logger);
PopupLogger.displayName = 'PopupLogger';

(function(p) {
  var BASIC_STYLES = 'color: #333; background-color: #fff; font-family: monospace; border-bottom: 1px solid #ccc;';
  var STYLES = {
    WARN:     'color: #000; background-color: #fc6;',
    ERROR:    'color: #f00; background-color: #fcc;',
    CRITICAL: 'color: #fff; background-color: #000;'
  };
  
  function _cleanup(html) {
    return html.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/[\n\r]+/, '<br />');
  }
  
  function _makePopup() {
    var popup = global.open('','popup','height=400,width=400');
    var doc = popup.document;
    doc.write('<!doctype html>\
               <html lang="en">\
                 <head>\
                   <meta charset="utf-8">\
                   <title>Console</title>\
                 </head>\
                 <body><div id="evidence_console"></div></body>\
               </html>');
    doc.close();
    popup.focus();
    return popup;
  }
  
  function _appendLine(level, msg) {
    this.popup = this.popup || this._makePopup();
    var levelName = Logger.LEVELS[level];
    
    var html = '<div style="';
    html += BASIC_STYLES;
    html += STYLES[levelName] || '';
    html += '">';
    if (level > Logger.INFO) {
      html += '<span style="font-weight: bold;">';
      html += levelName;
      html += ':</span> ';
    }
    html += _cleanup(msg);
    html += '</div>';
    var doc = this.popup.document,
        div = doc.createElement('div');
    div.innerHTML = html;
    html = div.firstChild;
    div = null;
    doc.getElementById('evidence_console').appendChild(html);
  }
  
  function log(level, msg, params) {
    level = level || Logger.NOTSET;
    if (level >= this.level) {
      if (params) {
        msg = UI.printf(msg, params);
      }
      this._appendLine(level, msg);
    }
  }
  
  p.log = log;
  p._makePopup = _makePopup;
  p._appendLine = _appendLine;
})(PopupLogger.prototype);