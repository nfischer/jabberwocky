var wordCounter = {};
function advanceDefinition(arg) {
  var node = $(arg);
  var text = node.text().toLowerCase();
  if (defs[text] instanceof Array) {
    wordCounter[text] = (wordCounter[text] + 1) % defs[text].length;
    var newHint = defs[text][wordCounter[text]];
    node.attr('aria-label', newHint);
  }
}
$(document).ready(function () {
  // make all keys lowercase
  for (var k in defs) {
    if (defs.hasOwnProperty(k)) {
      if (k !== k.toLowerCase()) {
        defs[k.toLowerCase()] = defs[k];
        delete defs[k];
      }
    }
  }

  // add in link hints
  $('span.term').each(function (a, b) {
    var node = $(b);
    var text = node.text().toLowerCase();
    if (defs[text]) {
      node.attr('onclick', 'advanceDefinition(this)');
      node.addClass('hint--bounce hint--bottom hint--medium');
      wordCounter[text] = 0;
      if (typeof defs[text] === 'string') {
        node.attr('aria-label', defs[text]);
      } else {
        var arr = defs[text];
        node.attr('aria-label', arr[0]);
      }
    }
  });
});
