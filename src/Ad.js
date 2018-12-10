"use strict";

var AdManager = function() {};

var proto = {
    constructor: AdManager,

    init: function(options, callback) {
        var Me = this;
        this.inited = false;
        this._adIndex = 0;
        this._adCache = {};
        this.options = options;
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

    createAd: function(options, name) {
        name = name || this._generateName();
        var ad = this.doCreateAd(options);
        this._adCache[name] = ad;
        return name;
    },

    // user implement
    doCreateAd: function(options) {
        return {};
    },

    // user implement
    showAd: function(name, callback) {
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60);
        }
        return true;
    },

    // user implement
    hideAd: function(name, callback) {
        if (callback) {
            setTimeout(function() {
                callback(null);
            }, 60);
        }
        return true;
    },

    _generateName: function() {
        return 'ad_' + (this._adIndex++);
    },
};

for (var p in proto) {
    AdManager.prototype[p] = proto[p];
}

module.exports = AdManager;