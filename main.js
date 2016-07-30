var rightArrow = ' \u21AA';
function isPlural(arg) {
  return arg instanceof Array && arg.length > 1;
}
function advanceDefinition(arg) {
  'use strict';
  var node = $(arg);
  var text = node.text().toLowerCase();
  if (isPlural(defs[text])) {
    var count = parseInt(node.attr('data-count'));
    count = (count + 1) % defs[text].length;
    var newHint = defs[text][count];
    node.attr('data-count', String(count));
    node.attr('aria-label', newHint + rightArrow);
  }
}
$(document).ready(function () {
  'use strict';
  // make all keys lowercase
  for (var k in defs) {
    if (defs.hasOwnProperty(k)) {
      if (k !== k.toLowerCase()) {
        defs[k.toLowerCase()] = defs[k];
        delete defs[k];
      }
    }
  }

  // add in initial hints
  $('span.term').each(function (a, b) {
    var node = $(b);
    var text = node.text().toLowerCase();
    if (defs[text]) {
      node.attr('onclick', 'advanceDefinition(this)');
      node.addClass('hint--bounce hint--bottom hint--medium');
      node.attr('data-count', '0');
      if (isPlural(defs[text])) {
        node.attr('aria-label', defs[text][0] + rightArrow);
      } else {
        node.attr('aria-label', defs[text]);
      }
    }
  });
});
