//= require "ui/console"
var UI = (function() {
  function printf(template, args, inspector) {
    var parts = [],
        regexp = /(^%|.%)([a-zA-Z])/,        
        args = args.splice(0); // clone args

    inspector = inspector || String;

    if (template.length <= 0) {
      return '';
    }
    while (m = regexp.exec(template)) {
      var match = m[0], index = m.index, type, arg;

      if (match.indexOf('%%') === 0) {
        parts.push(template.substr(0, index));
        parts.push(match.substr(1));
      } else {
        parts.push(template.substr(0, match.indexOf('%' === 0) ? index + 1 : index));
        type = m[2];
        arg = args.shift();
        arg = inspector(arg, type);
        parts.push(arg);
      }
      template = template.substr(index + match.length);
    }
    parts.push(template);
    return parts.join('');
  }
  
   return {
     printf: printf,
     Console: Console
   };
})();