var userAgent = navigator.userAgent;
var isHPVIEW = __util__.getParameterByName('type') === 'HPView';
var $BODY = $(document.body);
var $ROOT = $('html');
var $WINDOW = $(window);
var UIWIDTH = 750;

var regexs = {
    ie: /msie\s\d+\.\d+/i,
    ie8: /msie\s8\.\d+/i,
    ie9: /msie\s9\.\d+/i,
    ie10: /msie\s10\.\d+/i,
    ie11: /Trident\/7\.0/i,
    edge: /Edge\/\d+.\d+/i,
    wechat: /MicroMessenger/i
}
var Device = {
    isIE: function() {
        for (var i in regexs) {
            var r = regexs[i];
            if (r.test(userAgent))
                return true
        }
        return false;
    },
    isIE8: function() {
        return regexs.ie8.test(userAgent);
    },
    isIE9: function() {
        return regexs.ie9.test(userAgent);
    },
    isIE10: function() {
        return regexs.ie10.test(userAgent);
    },
    lt11: function() {
        return (regexs.ie10.test(userAgent)) || (regexs.ie9.test(userAgent)) || (regexs.ie8.test(userAgent));
    },
    isEdge: function() {
        return regexs.edge.test(userAgent);
    },
    isWeChat: function() {
        return regexs.wechat.test(userAgent);
    },
    getPixelRadio: function() {
        return window.devicePixelRatio || 1;
    },
    calcRootSize: function() {
        var availWidth = window.screen.availWidth;
        var $width = $WINDOW.width();
        var deviceWidth;
        if(availWidth < $width) {
           deviceWidth = availWidth;
        } else {
           deviceWidth = $width;
        }
        var rootSize = 100 * deviceWidth / UIWIDTH;
        $ROOT.css({
            'font-size': rootSize + 'px'
        });
        if (!window._resizeListener_) {
            $(window).on('resize', function() {
                Device.calcRootSize(true)
            });
            window._resizeListener_ = true;
            setTimeout(function() {
                $(window).trigger('resize')
            }, 500)
        }
    },
    inFrame: function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
};

window.Device = Device;
