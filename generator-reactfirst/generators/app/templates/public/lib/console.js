(function(window, document, undefined) {
  var _target_ = document.querySelectorAll('#g-debug')[0];
  var _controller_ = document.querySelectorAll('.g-debug-wrap .controller')[0];
  var _clean_ = document.querySelectorAll('.g-debug-wrap .clean')[0];
  var _refresh_ = document.querySelectorAll('.g-debug-wrap .refresh')[0];
  var _back_ = document.querySelectorAll('.g-debug-wrap .back')[0];
  var _wrap_ = document.querySelectorAll('.g-debug-wrap')[0];

  var originLogger = window.console.log;

  // store original functions
  var original = {
    console: {
      log: console.log,
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    window: {
      onerror: window.onerror
    },
    pos: {
      x: 0,
      y: 0
    },
    wrapTop: 0
  }

  var fnDelegate = function() {
    original.console.log.apply(window.console, arguments)
    logger.log(arguments);
  }

  var hook = function() {
    window.console.log = fnDelegate;
    window.console.error = fnDelegate;
    window.console.info = fnDelegate;
    window.console.debug = fnDelegate;
    window.console.warn = fnDelegate;
    window.onerror = function(message, url, lineNumber) {
      logger.log([message, url, lineNumber], true);
    }
  }

  _controller_.addEventListener('touchstart', function(e) {
    original.pos.y = e.touches[0].clientY;
    original.wrapTop = _wrap_.offsetTop;
  });
  _controller_.addEventListener('touchmove', function(e) {
    e.preventDefault();
    var clientY = e.touches[0].clientY;
    var offsetTop = (original.wrapTop + clientY - original.pos.y) + 'px';
    _wrap_.style.top = offsetTop;
  });
  _clean_.addEventListener('click', function(e) {
    e.preventDefault();
    _target_.value = '';
  });
  console.log(_refresh_)
  _refresh_.addEventListener('click', function(e) {
    e.preventDefault();
    location.reload();
  });
  _back_.addEventListener('click', function(e) {
    e.preventDefault();
    // console.log(/baidu/gmi.test(document.documentElement.innerHTML));
    history.go(-1);
  });

  // _wrap_.classList.remove('g-hide');

  var logger = {
    log: function(args, error) {

      args = Array.prototype.slice.call(args);

      var out = args[0];

      if (error) {
        out = args.join(',');
      } else {
        out = args.join(' ');

        // for (var i = 1, len = args.length; i < len; i++) {
        //     var token = args[i];
        //     out = out.replace(/\%s/i, token);
        // }

      }

      _target_.value += out + '\r\n';
      _target_.scrollTop = _target_.scrollHeight;
    }
  }

  // window.__open_console__ = function() {
  hook();
  //     _wrap_.classList.remove('g-hide');
  // }

})(window, document);
