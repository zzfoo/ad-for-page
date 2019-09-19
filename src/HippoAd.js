var AdManager = require('./Ad.js');
var HippoAdManager = function () { }
var proto = {
  HippoAdSDK: null,
  onInit: function (callback) {
    var options = this.options
    this.HippoAdSDK = options.HippoAdSDK
    var adIds = options.adIds
    HippoAdSDK.initBannerAd(adIds, function(hippoPlacementId, success) {
      var err = success ? null : 'HippoAdSDK initBannerAd err'
      callback(err);
    });
  },

  doCreateAd: function (options, name) {
    var ad = options.adId
    return ad;
  },

  doShowAd: function (name, callback) {
    var ad = this._adCache[name];
    this.manager.HippoAdSDK.showBannerAd(ad, function( success, errorMessage) {
      var err = success ? null : errorMessage
      callback(err)
    });
  },

  doHideAd: function (name, callback) {
    var ad = this._adCache[name];
    this.manager.HippoAdSDK.hideBannerAd(ad);
    setTimeout(function () {
      callback && callback(null)
    }, 10);
  },
};
for (var p in AdManager.prototype) {
  HippoAdManager.prototype[p] = AdManager.prototype[p];
}

for (var p in proto) {
  HippoAdManager.prototype[p] = proto[p];
}
module.exports = HippoAdManager;
