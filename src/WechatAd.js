var AdManager = require('./Ad.js');
var WechatAdManager = function () { }
var proto = {
    windowWidth: null,
    windowHeight: null,
    onInit: function (callback) {
        var err = null;
        if (!wx.createBannerAd) {
            err = '微信版本过低';
        } else {
            var systemInfo = wx.getSystemInfoSync();
            this.windowWidth = systemInfo.windowWidth;
            this.windowHeight = systemInfo.windowHeight;
        }
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

    doCreateAd: function (options) {
        var windowWidth = this.windowWidth;
        var windowHeight = this.windowHeight;

        var adUnitId = options.adUnitId;
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
            style: {
                left: 1,
                top: 1,
                width: width,
                height: height,
            }
        });
        var Me = this;
        ad.onResize(function(res) {
            Me.alginAd(ad, {
                width: res.width,
                height: res.height,
                left: style.left,
                top: style.top,
                align: style.align,
                valign: style.valign,
            });
        })
        return ad;
    },

    parsePercentile: function (value) {
        return parseFloat(value.slice(0, -1)) / 100;
    },

    showAd: function (name, callback) {
        var ad = this._adCache[name];
        ad.show().then(function() {
            callback(null);
        }).catch(function(err) {
            callback(err);
        })
    },

    hideAd: function (name, callback) {
        var ad = this._adCache[name];
        ad.hide().then(function() {
            callback(null);
        }).catch(function(err) {
            callback(err);
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
