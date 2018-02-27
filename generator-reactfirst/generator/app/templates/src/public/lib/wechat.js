(function(window, document) {
  var IS_WECHAT = /MicroMessenger/i.test(navigator.userAgent);
  var deferred = $.Deferred();
  var WX_JS_SDK_URL = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
  var WX_CODE = '';

  var Wechat = {
    IS_WECHAT:IS_WECHAT
  };

  Wechat.getOpenId = function() {

    var deferred = $.Deferred();

    if (!IS_WECHAT) {
      deferred.reject();
      return deferred;
    }

    if (/\&op\=/.test(location.search)) {
      var rOp = /&op\=([^&]+)/ig;
      var opArr = rOp.exec(location.search);
      if (opArr.length === 2) {
        window.__op__ = opArr[1];
        deferred.resolve(window.__op__);
      }
      return deferred
    }

    WX_CODE = $.getParams('code') || '';

    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {
        p: {
          code: WX_CODE,
          url: location.href.replace(/#.+/, '')
        },
        os: 9
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      url: '/oath/mp',
      success: function(res) {

        if (!res.data.op) {
          console.log('pre redirect' + '->' + QMTV.WECHAT_ACCESS_URL)
          location.href = QMTV.WECHAT_ACCESS_URL;
          return;
        }

        location.href = location.href + '&op=' + res.data.op;

        window.__op__ = res.data.op;

        deferred.resolve(window.__op__);
      },
      error: function() {
        deferred.reject();
      }
    })

    return deferred.promise();

  }

  Wechat.config = function() {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {
        p: {
          url: location.href.replace(/#.+/, '')
        },
        os: 9
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      url: '/oath/jssdkParams',
      success: function(res) {

        var wxOption = res.data;

        // console.log(wxOption.appId + ' - ' + wxOption.timestamp + ' - ' + wxOption.nonceStr + ' - ' + wxOption.signature);

        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wxOption.appId, // 必填，公众号的唯一标识
          timestamp: wxOption.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxOption.nonceStr, // 必填，生成签名的随机串
          signature: wxOption.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareQZone', 'onMenuShareWeibo', 'onMenuShareQQ', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        Wechat.setShare();

        deferred.resolve();
      }
    })
  }

  Wechat.setShare = function(info) {

    if (!('wx' in window))
      return

    var info = info || {};
    var dftInfo = {
      title: '全民直播_做年轻人爱看的直播',
      desc: '全民直播_做年轻人爱看的直播',
      link: 'http://m.quanmin.tv',
      imgUrl: 'http://m.quanmin.tv/static/images/logo.png'
    }
    var option = $.extend({}, dftInfo, info);
    wx.ready(function() {
      wx.onMenuShareTimeline(option);
      wx.onMenuShareAppMessage(option);
      wx.onMenuShareQQ(option);
      wx.onMenuShareWeibo(option);
      wx.onMenuShareQZone(option);
    });
  }


  Wechat.init = function() {
    $.loadScript(WX_JS_SDK_URL)
      .then(function() {
        Wechat.config();
      });
    return deferred.promise();
  }

  window.Wechat = Wechat;

})(window, document);
