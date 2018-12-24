(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AFP = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var AdManager = require('./src/Ad.js');
var GoogleAdManager = require('./src/GoogleAd.js');
var WechatAdManager = require('./src/WechatAd.js');
module.exports = {
    AdManager: AdManager,
    GoogleAdManager: GoogleAdManager,
    WechatAdManager: WechatAdManager,
};
},{"./src/Ad.js":2,"./src/GoogleAd.js":3,"./src/WechatAd.js":4}],2:[function(require,module,exports){
"use strict";

var AdManager = function() {};

var proto = {
    constructor: AdManager,
    disabled: false,

    init: function(options, callback) {
        this.inited = false;
        this.options = options;
        this._adIndex = 0;
        this._adCache = {};

        if (this.disabled) {
            callback && callback();
            return;
        }

        var Me = this;
        this.onInit(function(err) {
            Me.inited = true;
            callback && callback(err);
        });
    },

    // user implement
    onInit: function(callback) {
        setTimeout(function() {
            callback(null);
        }, 60);
    },

    getAd: function(name) {
        return this._adCache[name];
    },

    createAd: function(options, name) {
        if (this.disabled) return;
        name = name || this._generateName();
        var ad = this.doCreateAd(options, name);
        this._adCache[name] = ad;
        return name;
    },

    // user implement
    doCreateAd: function(options) {
        return {};
    },

    // user implement
    showAd: function(name, callback) {
        if (this.disabled) {
            callback && callback();
            return;
        };
        this.doShowAd(name, callback);
    },

    doShowAd: function(name, callback) {
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60);
        }
    },

    // user implement
    hideAd: function(name, callback) {
        if (this.disabled) {
            callback && callback();
            return;
        };
        this.doHideAd(name, callback);
    },

    doHideAd: function(name, callback) {
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60);
        }
    },

    _generateName: function() {
        return 'ad_' + (this._adIndex++);
    },
};

for (var p in proto) {
    AdManager.prototype[p] = proto[p];
}

module.exports = AdManager;

},{}],3:[function(require,module,exports){
"use strict";

/*
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- game-banner -->
<ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:50px"
     data-ad-client="ca-pub-9274896770936398"
     data-ad-slot=""1422226952""></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
*/

// var adManager = new AFP.AdManager();
// adManager.init("google", function() {
//     var clientId = "ca-pub-9274896770936398";
//     var slot = "1422226952";
//     var name = adManager.createAd({
//         container: document.getElementById('ad-container'),
//         id: clientId,
//         slot: slot,
//         width: 500,
//         height: 100,
//         responsive: false,
//         banner: true,
//     });
// });

//
// adManager.createAd({....}, 'my-ad-1');
// adManager.createAd({....}, 'my-ad-2');
//
// adManager.hideAd('my-ad-1');
// adManager.showAd('my-ad-2');
var AdManager = require('./Ad.js');

var GoogleAdManager = function () {};

var proto = {
    constructor: GoogleAdManager,

    onInit: function(callback) {
        // var options = this.options;
        this.zIndex = 999998;
        var Me = this;

        var ads = window['adsbygoogle'] = window['adsbygoogle'] || [];
        // window['adsbygoogle'].push({});

        var isAdsenseNotLoaded = !ads || typeof ads.loaded === 'undefined';

        if (isAdsenseNotLoaded) {
            var jsSrc = /* <str> */ "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" /* </str> */;
            Me.includeJS(jsSrc, function () {
                callback && callback();
            });
        } else {
            callback && callback();
        }
    },

    // options
    doCreateAd: function(options, name) {
        var Me = this;
        var container = options.container || options.parentNode;

        if (!container) {
            container = this.createContainer();
        } else if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        if (options.containerStyle) {
            for (var p in options.containerStyle) {
                container.style[p] = options.containerStyle[p];
            }
        }

        var ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.setAttribute("data-ad-client", options.id);
        ins.setAttribute("data-ad-slot", options.slot);

        container.appendChild(ins);

        var width = options.width;
        var height = options.height;
        var align = options.align;
        var valign = options.valign;

        if (options.responsive) {
            ins.style.cssText = "display:block";
            ins.setAttribute("data-full-width-responsive", "true");
            ins.setAttribute("data-ad-format", "auto");
        } else {

            if (options.banner) {
                ins.style.cssText = "display:inline-block;width:" + width + "px;height:" + height + "px";
                // ins.setAttribute("data-ad-format", options.format);
            } else {
                ins.style.cssText = "display:inline-block;width:" + width + "px;height:" + height + "px";
                // ins.setAttribute("data-ad-format", options.format);
            }

            if (align === "center") {
                container.style.width = width + "px";
                container.style.height = height + "px";
                container.style.left = "50%";
                container.style.marginLeft = -(width / 2) + "px";
            } else if (align === "right") {
                container.style.right = "0px";
            }

            if (valign === "top") {
                container.style.top = "0px";
            } else if (valign === "bottom") {
                container.style.bottom = "0px";
            }
        }
        this.hideContainer(container);

        window['adsbygoogle'].push({});

        var adInfo = {
            name: name,
            options: options,
            contianer: container,
        };
        return adInfo;
    },

    doShowAd: function(name, callback) {
        var adInfo = this._adCache[name];
        if (adInfo.contianer) {
            this.showContainer(adInfo.contianer);
        }
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60)
        }
    },
    doHideAd: function (name, callback) {
        var adInfo = this._adCache[name];
        if (adInfo.contianer) {
            this.hideContainer(adInfo.contianer);
        }
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60)
        }
    },
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////

    createContainer: function (cssText) {
        var dom = document.createElement("div");
        if (this.zIndex || this.zIndex === 0) {
            dom.style.zIndex = this.zIndex;
        }
        document.body.appendChild(dom);
        return dom;
    },

    getContainer: function (name) {
        var adInfo = this._adCache[name];
        return adInfo.contianer || null;
    },

    hideContainer: function (contianer) {
        contianer.style.display = "none";
    },

    showContainer: function (contianer) {
        contianer.style.display = "block";
    },

    includeJS: function (src, onload, onerror) {

        var script = document.createElement("script");
        // script.type = "text/javascript";
        // script.charset = "UTF-8";
        // script.defer = true;
        script.async = true;

        var done = false;
        script.onload = function (event) {
            if (done) {
                return;
            }
            done = true;
            if (onload) {
                onload(event);
            }
        };
        script.onerror = function (event) {
            if (onerror) {
                onerror(event);
            }
        };

        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        head.insertBefore(script, head.firstChild);

        script.src = src;

        return script;
    },

};

for (var p in AdManager.prototype) {
    GoogleAdManager.prototype[p] = AdManager.prototype[p];
}

for (var p in proto) {
    GoogleAdManager.prototype[p] = proto[p];
}

module.exports = GoogleAdManager;


},{"./Ad.js":2}],4:[function(require,module,exports){
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

    doCreateAd: function (options, name) {
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

    doShowAd: function (name, callback) {
        var ad = this._adCache[name];
        ad.show().then(function() {
            callback && callback(null);
        }).catch(function(err) {
            callback && callback(err);
        })
    },

    doHideAd: function (name, callback) {
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

},{"./Ad.js":2}]},{},[1])(1)
});
