$(document).ready(function () {
  $('span').each(function (a, b) {
    var node = $(b);
    var text = node.text().toLowerCase();
    node.addClass('hint--bounce hint--bottom hint--medium defined-word');
    if (defs[text]) {
      if (typeof defs[text] === 'string') {
        node.attr('aria-label', defs[text]);
      } else {
        var arr = defs[text];
        var rand = Math.floor(Math.random() * (arr.length));
        node.attr('aria-label', arr[rand]);
      }
    } else {
      node.attr('aria-label', 'Not yet defined');
    }
  });
});
