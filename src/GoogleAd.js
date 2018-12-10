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
    doCreateAd: function(options) {
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

        window['adsbygoogle'].push({});

        this._adCache[name] = {
            name: name,
            options: options,
            contianer: container,
        };

        return name;
    },

    showAd: function(name, callback) {
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
    hideAd: function (name) {
        var adInfo = this.getAd(name);
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

