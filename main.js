var wordCounter = {};
function advanceDefinition(arg) {
  var node = $(arg);
  var text = node.text().toLowerCase();
  console.log(typeof defs[text]);
  if (defs[text] instanceof Array) {
    wordCounter[text] = (wordCounter[text] + 1) % defs[text].length;
    var newHint = defs[text][wordCounter[text]];
    node.attr('aria-label', newHint);
  }
}
$(document).ready(function () {

  $('span').each(function (a, b) {
    var node = $(b);
    var text = node.text().toLowerCase();
    node.attr('onclick', 'advanceDefinition(this)');
    node.addClass('hint--bounce hint--bottom hint--medium defined-word');
    if (defs[text]) {
      wordCounter[text] = 0;
      if (typeof defs[text] === 'string') {
        node.attr('aria-label', defs[text]);
      } else {
        var arr = defs[text];
        node.attr('aria-label', arr[0]);
      }
    } else {
      node.attr('aria-label', 'Not yet defined');
    }
  });
});
