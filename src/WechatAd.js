var AdManager = require('./Ad.js');
var WechatAdManager = function() {}
var proto = {
    windowWidth: null,
    windowHeight: null,
    onInit: function(callback) {
        callback(err);
    },

    alginAd: function(ad, style) {
        var windowWidth = this.windowWidth;
        var windowHeight = this.windowHeight;
        var width = style.width;
        var height = style.height;
        var align = style.align;
        var valign = style.valign;
        var left;
        if (align) {
            if (align === 'center') {
                left = (windowWidth - width) / 2;
            } else if (align === 'right') {
                left = windowWidth - width;
            } else if (align === 'left') {
                left = 0;
            }
        } else {
            left = style.left || 0;
        }

        var top;
        if (valign) {
            if (valign === 'center') {
                top = (windowHeight - height) / 2;
            } else if (valign === 'bottom') {
                top = windowHeight - height;
            } else if (valign === 'top') {
                top = 0;
            }
        } else {
            top = style.top || 0;
        }
        ad.style.left = left;
        ad.style.top = top;
    },

    doCreateAd: function(options, name) {
        var wx = options.wx || window['wx']
        var systemInfo = wx.getSystemInfoSync();
        this.windowWidth = systemInfo.windowWidth;
        this.windowHeight = systemInfo.windowHeight;

        var windowWidth = this.windowWidth;
        var windowHeight = this.windowHeight;

        var adUnitId = options.adUnitId;
        var appSid = options.appSid;
        var style = options.style;
        var width = style.width;
        var height = style.height;

        if (typeof width === 'string') {
            width = this.parsePercentile(width) * windowWidth;
        }
        if (typeof height === 'string') {
            height = this.parsePercentile(height) * windowHeight;
        }

        var ad = wx.createBannerAd({
            adUnitId: adUnitId,
            appSid: appSid,
            style: {
                left: 1,
                top: 1,
                width: width,
                height: height,
            }
        });
        var Me = this;

        var onResize = options.onResize;
        ad.onResize(function(res) {
            Me.alginAd(ad, {
                width: res.width,
                height: res.height,
                left: style.left,
                top: style.top,
                align: style.align,
                valign: style.valign,
            });
            onResize && onResize.call(ad, res);
        });

        var onError = options.onError;
        ad.onError(function(err) {
            if (onError) {
                onError.call(ad, err);
            } else {
                console.warn(err);
            }
        });
        return ad;
    },

    parsePercentile: function(value) {
        return parseFloat(value.slice(0, -1)) / 100;
    },

    doShowAd: function(name, callback) {
        var ad = this._adCache[name];
        ad.show().then(function() {
            callback && callback(null);
        }).catch(function(err) {
            callback && callback(err);
        })
    },

    doHideAd: function(name, callback) {
        var ad = this._adCache[name];
        ad.hide().then(function() {
            callback && callback(null);
        }).catch(function(err) {
            callback && callback(err);
        })
    },
};
for (var p in AdManager.prototype) {
    WechatAdManager.prototype[p] = AdManager.prototype[p];
}

for (var p in proto) {
    WechatAdManager.prototype[p] = proto[p];
}
module.exports = WechatAdManager;
