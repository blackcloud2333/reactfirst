{%html lang='zh-cmn-Hans'%}
{% head %}
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,user-scalable=no,minimal-ui">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta name="full-screen" content="yes">
<meta name="browsermode" content="application">
<meta name="x5-fullscreen" content="true">
<meta name="x5-page-mode" content="app">
<meta name="keywords" content="{{ keywords }}">
<meta name="description" content="{{ desc }}">
{% if not hideFragment %}
<meta name="fragment" content="!">
{% endif %}
<meta name="baidu-site-verification" content="8mMfo26kqk">
<meta name="360-site-verification" content="7d7e8ef8f5db30a7e51669b47a977067">
{% title %}{{((title ) if title )}}{% endtitle %}
<link rel="dns-prefetch" href="//a.img.shouyingtv.cn"/>
<link rel="dns-prefetch" href="//g.alicdn.com"/>
<link rel="dns-prefetch" href="//hm.baidu.com"/>
<link rel="dns-prefetch" href="//image.quanmin.tv"/>
<link rel="dns-prefetch" href="//snap.quanmin.tv"/>
<link rel="dns-prefetch" href="//uimg.quanmin.tv"/>
<link rel="dns-prefetch" href="//udata-10009275.image.myqcloud.com"/>
<link href="/public/img/favicon.ico" type="image/x-icon" rel="icon">
<link href="/public/img/favicon.ico" type="image/x-icon" rel="shortcut icon">
<script src="/public/lib/flexible.js?__inline"></script>
<script src="/public/lib/flexible_css.js?__inline"></script>
<script src="../lib/redirect.inline.js?__inline"></script>
<link rel="stylesheet" href="/public/lib.css">
<script>
  window.QMTV = {{ QMTV | dump | safe }};
</script>

<script>
  var _hmt = window._hmt || [];
  (function () {
    var hm = document.createElement("script");
    {% if hmsrc %}
    hm.src = "{{hmsrc}}";
    {% else%}
    hm.src = "//hm.baidu.com/hm.js?63d2da29d5f9eb3559db793b4f7b0283";
    {% endif %}
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
{% endhead %}
{% body %}
<div id="main" class="main">
  {% block content %}{% endblock %}
</div>
<script src="/public/lib.js"></script>
<script>
  (function(){
    var bp = document.createElement('script');
    bp.async = 'async';
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
</script>
<script>
  (function(){
    var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?30a58ccc8f4c42921ac20d3c9b7c8c87":"https://jspassport.ssl.qhimg.com/11.0.1.js?30a58ccc8f4c42921ac20d3c9b7c8c87";
    document.write('<script src="' + src + '" id="sozz" async="async"><\/script>');
  })();
</script>
<!-- build v2 -->
{% endbody %}
{%endhtml%}
