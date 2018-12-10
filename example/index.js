'use strict';
var hideAd = function() {};
(function() {
    var showing = false;
    var adManager = new AFP.AdManager();
    var adName = null;
    adManager.init('google', function() {
        console.log('ad manager inited!!!');
        
        hideAd = function() {
            if (!adName) {
                adName = adManager.createAd({
                    id: 'ca-pub-9274896770936398',
                    parentNode: document.getElementById('ad-container'),
                    slot: '1422226952',
                    visible: true,
                    width: 320,
                    height: 50,
                    responsive: false,
                    banner: true,
                    align: 'center',
                })
            }
            
            if (showing) {
                adManager.hideAd(adName);
                showing = false;
            } else {
                adManager.showAd(adName);
                showing = true;
            }
        }
    })
}())

