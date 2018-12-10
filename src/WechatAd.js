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

    doCreateAd: function (options) {
        var windowWidth = this.windowWidth;
        var windowHeight = this.windowHeight;

        var adUnitId = options.adUnitId;
        var style = options.style;
        var width = style.width;
        var height = style.height;
        var align = style.align;
        var valign = style.valign;
        if (!width || !height) {
            throw new Error('need width and height');
        }
        if (typeof width !== 'number') {
            width = this.parsePercentile(width) * windowWidth;
        }
        if (typeof height !== 'number') {
            height = this.parsePercentile(height) * windowHeight;
        }

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
            left = option.left || 0;
        }

        var top;
        if (valign) {
            if (align === 'center') {
                top = (windowHeight - height) / 2;
            } else if (align === 'bottom') {
                top = windowHeight - height;
            } else if (align === 'top') {
                top = 0;
            }
        } else {
            top = options.top || 0;
        }

        var ad = wx.createBannerAd({
            adUnitId: adUnitId,
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        });
        return ad;
    },

    parsePercentile: function (value) {
        return parseFloat(value.slice(0, -1)) / 100;
    },

    showAd: function (name, callback) {
        var ad = this._adCahe[name];
        ad.show().then(function() {
            callback(null);
        }).catch(function(err) {
            callback(err);
        })
    },

    hideAd: function (name, callback) {
        var ad = this._adCahe[name];
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
