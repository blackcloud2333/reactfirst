/**
 * Webview bridge
 * Author:Wilson Xiong
 * Date:2016/12/9
 * Mail:xiongwenjun@qmtv.com
 */
(function(window, document) {

  var noop = function() {}

  var __log__ = function() {
    var msgArr = Array.prototype.slice.call(arguments);
    msgArr.unshift('[qmtvJsBridge]');
    console.log(msgArr.join(' '));
  }

  var UA = navigator.userAgent;

  var ENV = {
    IS_ANDROID: /Android/i.test(UA),
    IS_IOS: /iPhone/i.test(UA)
  }

  var PLATFORM = {
    'OLD': 0,
    'SY': 1
  }

  var OLD_IOS_CALLBACK_NAME = '_iosWebviewCallback';

  var BRIDGE_KEYS = {
    'OLD': 'jsActionDelegate',
    'SY': 'sylive'
  }

  /**
   * All command define in here,
   * the 'process' be able to compatible with ios webview,
   * for the moment,call the bridge command can't with 'apply' on ios webview.
   * fuck the ios webview.
   */
  var COMMAND_CONFIG = {
    'downloadAPK_new': {
      platform: PLATFORM.OLD,
      process: function(entry, data) {
        return entry.downloadAPK_new(data.title, data.url);
      }
    },
    'deviceString': {
      platform: PLATFORM.OLD
    },
    'currentRoomID': {
      platform: PLATFORM.OLD
    },
    'isLogin': {
      platform: PLATFORM.OLD
    },
    'appUserInfo': {
      platform: PLATFORM.OLD
    },
    'invokeNativeLoginEvent': {
      platform: PLATFORM.OLD
    },
    'onCallUserInfo': {
      platform: PLATFORM.SY
    },
    'share': {
      platform: PLATFORM.SY,
      process: function(entry, data) {
        return entry.share('2', data);
      }
    },
    'openUrl': {
      platform: PLATFORM.OLD,
      process: function(entry, data) {
        return entry.openUrl(data.url);
      }
    },
    'invokeNativePay':{
      platform: PLATFORM.OLD
    },
    'shareTo': {
      platform: PLATFORM.OLD
    },
    'shareApp': {
      platform: PLATFORM.OLD,
      process: function(entry, data) {
        return entry.shareApp(data.type, data.title, data.desc, data.link, data.imgUrl);
      }
    },
    'onZmxyAuthAppInfo': {
      callbackName: 'zmxyAuthCallback',
      process: function(entry, data) {
        entry['onZmxyAuthAppInfo'](data.app_id, data.params, data.sign)
      },
      platform: PLATFORM.SY
    },
    'showAlertWithString': {
      platform: PLATFORM.OLD,
      process: function(entry, data) {
        entry.showAlertWithString(data.message)
      }
    },
    'toast': {
      platform: PLATFORM.OLD,
      process: function(entry, data) {
        entry.toast(data)
      }
    }
  }

  var STATES = {
    'UNINITIALIZED': 0,
    'DETECTING': 1,
    'LOADED': 2,
    'FAILED': 3
  }


  var DETECT_DELAY = 1000;

  var DETECT_TIME = 3;

  var STATE = STATES.UNINITIALIZED;

  var __global__ = window;

  var __store__ = {
    'ready': []
  }

  var __callbacks__ = {}

  var bridge = function() {}

  bridge.generate = function(name, cb) {
    __callbacks__[name] = cb;
    window._iosWebviewCallback = function(name, val) {
      __log__(name, val);
      __callbacks__[name] && __callbacks__[name](val);
      // cb && cb(val);
    }
  }

  bridge.generateCallback = function(cb) {
    var callbackName = 'bridge_callback_' + (Math.random() * 1000 | 0);
    window[callbackName] = function() {
      console.log('callback1');
      var args = Array.prototype.slice.call(arguments);
      console.log('callback2');
      cb.apply(window, args);
      console.log('callback3');

      // delete window[callbackName]
    }
    return callbackName;
  }

  bridge.generateSy = function(name, cb) {
    window[name] = function() {
      __log__(name, 'executed, argument length is', arguments.length);
      delete window[name];
      cb.apply(__global__, Array.prototype.slice.call(arguments));
    }
  }

  /**
   * Execute command on Webview bridge entry
   * @param  {String}     name    command name
   * @param  {Array}      params  pass arguemnts to bridge command
   * @param  {Function}   cb      command callback
   * @return {void}
   */
  bridge.execute = function(name, params, cb) {
    console.table(window.jsActionDelegate)
    cb = cb || noop;

    params = params || [];

    if (!(name in COMMAND_CONFIG))
      return

    var config = COMMAND_CONFIG[name],
      isOld = config.platform === PLATFORM.OLD,
      isSy = config.platform === PLATFORM.SY,
      bridgeKey, entry;

    switch (config.platform) {
      case PLATFORM.OLD:
        bridgeKey = BRIDGE_KEYS.OLD;
        break;
      case PLATFORM.SY:
        bridgeKey = BRIDGE_KEYS.SY;
        break;
      default:
        break;
    }


    __log__('bridge key is', bridgeKey);

    if (!(bridgeKey in __global__)) {
      __log__(bridgeKey, 'not exists');
      return;
    }

    entry = __global__[bridgeKey] || {};

    if (!(name in entry)) {
      __log__(name, 'not exists on', bridgeKey);
      return;
    }

    if (isOld && ENV.IS_ANDROID && cb) {
      __log__('is android');
      if (config.process) {
        cb(config.process(entry, params));
      } else {
        cb(entry[name]());
      }
      return;
    }

    if (isOld && ENV.IS_IOS && cb) {
      __log__('is ios');
      bridge.generate(name, cb);
      if (config.process) {
        config.process(entry, params);
      } else {
        entry[name]();
      }
      return;
    }

    if (isSy) {
      __log__('is sy');
      bridge.generateSy(config.callbackName, cb);
      config.process(entry, params);
      return;
    }

  }

  bridge.ready = function(fn) {
    if (STATE === STATES.LOADED) {
      fn(false);
    } else if (STATE === STATES.FAILED) {
      fn(true);
    } else {
      __store__.ready.push(fn);
    }
  }

  bridge.emit = function(err, name) {
    var readyCallbacks = __store__.ready;
    for (var i in readyCallbacks) {
      var cb = readyCallbacks[i];
      cb(err, null);
    }
  }

  bridge.fail = function() {
    STATE = STATES.FAILED;
    bridge.emit(true, 'ready');
  }

  bridge.detect = function() {

    STATE = STATES.DETECTING;

    var count = 0;

    return (function() {

      var loop = function() {

        ++count;

        setTimeout(function() {
          check();
        }, DETECT_DELAY);

      }

      var check = function() {
        if (count > DETECT_TIME) {
          bridge.fail();
        } else if (BRIDGE_KEYS.OLD in __global__ || BRIDGE_KEYS.SY in __global__) {
          STATE = STATES.LOADED;
          bridge.emit(false, 'ready');
        } else {
          loop();
        }
      }

      loop()

    })();

  }

  bridge.detect();

  window.qmtvJsBridge = bridge;

})(window, document);
