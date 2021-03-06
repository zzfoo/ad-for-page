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
        ad.name = name;
        this._adCache[name] = ad;
        return name;
    },

    // user implement
    doCreateAd: function(options, name) {
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
