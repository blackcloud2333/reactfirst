;
(function() {

  var reg = /^(https?:\/\/|\/)(m\.quanmin\.tv|time\.quanmin\.tv|static\.geetest\.com|api\.geetest\.com|static\/|dev\.quanmin\.tv|test-m\.quanmin\.tv)/i;
  var createMethod = Document.prototype.createElement;
  var checkTags = ["SCRIPT", "IFRAME"];

  // var __define_setter__ = function(script) {
  //   var src = '';
  //   Object.defineProperty(script, 'src', {
  //     get: function() {
  //       return src;
  //     },
  //     set: function(url) {
  //       if (reg.test(url)) {
  //         src = url.replace(/^http:/, 'https:');
  //       }
  //       script.setAttribute('src', src);
  //     }
  //   });

  //   var _setAttribute = script.setAttribute;
  //   script.setAttribute = function(key, value) {
  //     _setAttribute.apply(script, [key, value]);
  //   }
  // }

  // document.createElement = function() {
  //   var element = createMethod.apply(document, arguments);
  //   // if (checkTags.indexOf(element.tagName) > -1) {
  //   //   __define_setter__(element);
  //   // }
  //   return element;
  // };

  function getSrcOfTag (markup) {
    var matched = markup.match(/\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s>]*))/i);
    for (var i = 1; i <= 3; i++) {
      if (matched[i]) {
        return matched[i];
      }
    }
    return '';
  }

  var writeMethod = Document.prototype.write;

  document.write = function (markup) {
    var markupStr = markup;
    if (/^<\s*script.+>.*<\/\s*script\s*>$/i.test(markup)) {
      var src = getSrcOfTag(markup);
      if (reg.test(src)) {
        markupStr = markupStr.replace(/http:/, 'https:');
      }
    }
    writeMethod.call(document, [markupStr]);
  };

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var nodes = mutation.addedNodes;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (checkTags.indexOf(node.tagName) > -1 && node.src) {
          if (reg.test(node.src)) {
            // node.src = node.src.replace(/^http:/, 'https:');
          } else {
            // node.parentNode.removeChild(node);
            // 游戏中心frame会载入其他脚本，有问题，这个版本删除
          }
        }
      }
    });
  });

  observer.observe(document, {
    subtree: true,
    childList: true
  });

})();
