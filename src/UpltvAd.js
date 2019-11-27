var AdManager = require('./Ad.js');
var UpltvAdManager = function () { }
var proto = {

  doCreateAd: function (options) {
    var ad = options.adUnitId
    return ad;
  },

  doShowAd: function (name, callback) {
    const upltv = window['upltv'];
    upltv.showBannerAdAtBottom(name)
  },

  doHideAd: function (name, callback) {
    const upltv = window['upltv'];
    upltv.hideBannerAdAtBottom();
  },
};
for (var p in AdManager.prototype) {
  UpltvAdManager.prototype[p] = AdManager.prototype[p];
}

for (var p in proto) {
  UpltvAdManager.prototype[p] = proto[p];
}
module.exports = UpltvAdManager;
