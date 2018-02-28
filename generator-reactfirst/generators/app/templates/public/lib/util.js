
var util = {
  getParameterByName: function(name, url) {
    var url = url || window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  queryToJSON: function(url) {
    var url = url || location.href;
    var ret = {};
    var data = url.match(/\?(.+)/);
    if (!data) {
      return;
    }
    if (data.length !== 2) {
      return;
    }
    data = data[1];
    data = data.split('&');

    for (var i = 0, len = data.length; i < len; i++) {
      var temp = data[i];
      temp = temp.split('=');
      ret[temp[0]] = temp[1];
    }
    return ret;
  },
  getCookie: function(key) {
    var cookies = document.cookie.split(/\s*;\s*/);
    for (var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i].split('=');
      if (key == cookie[0]) {
        return cookie[1];
      }
    }
    return null;
  },
  isDev: function() {
    var pDebug = util.getParameterByName('debug'),
      pDev = util.getParameterByName('dev');
    if (pDebug !== null || (pDev !== null && pDev === 1) || /test-m\.quanmin\.tv/.test(location.hostname)) {
      return true
    }
    return false;
  },
  parseAvatar: function(str, level,other) {
    if (!str) return QMTV.DEFAULT_AVATAR;
    var levelMap = {
      1: 'small', //70x70
      2: 'normal', //240x240
      3: 'big' //750x750
    };
    var reg = /^a:/;
    if (!level || !levelMap[level]) level = 1;
    if (reg.test(str)) {
      str = str.replace(reg, '//aimg.shouyintv.cn/');
      str += '-' + levelMap[level];
    }
    reg = /^c:/;
    if (reg.test(str)) {
      str = str.replace(reg, '//c.img.shouyintv.cn/');
      str += '-' + levelMap[level];
    }
    reg = /^i:/;
    if (reg.test(str)) {
      str = str.replace(reg, '//i.img.shouyintv.cn/');
      str += '-' + levelMap[level];
    }
    return str;
  }
};

window.__util__ = util;

