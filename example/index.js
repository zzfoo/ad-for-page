'use strict';
var switchAdState = function() {};
(function() {
    // var showing = false;
    // var adManager = new AFP.AdManager();
    // var adName = null;
    // adManager.init('google', function() {
    //     console.log('ad manager inited!!!');
        
    //     hideAd = function() {
    //         if (!adName) {
    //             adName = adManager.createAd({
    //                 id: 'ca-pub-9274896770936398',
    //                 parentNode: document.getElementById('ad-container'),
    //                 slot: '1422226952',
    //                 visible: true,
    //                 width: 320,
    //                 height: 50,
    //                 responsive: false,
    //                 banner: true,
    //                 align: 'center',
    //             })
    //         }
            
    //         if (showing) {
    //             adManager.hideAd(adName);
    //             showing = false;
    //         } else {
    //             adManager.showAd(adName);
    //             showing = true;
    //         }
    //     }
    // })
    var showing = false;
    var adManager = new AFP.GoogleAdManager();
    var adName = null;
    adManager.init(null, function() {
        console.log('ad manager inited!!!');

        switchAdState = function() {
            if (!adName) {
                adName = adManager.createAd({
                    id: 'ca-pub-9274896770936398',
                    parentNode: document.getElementById('ad-container'),
                    slot: '8680117483',
                    // visible: true,
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

    // var adForPageManager = new AFP.WechatAdManager();
    // var adName = null;
    // adForPageManager.init(null, function() {
    //     adName = adForPageManager.createAd({
    //         adUnitId: '',
    //         style: {
    //             width: '100%',
    //             height: 200,
    //             valign: 'bottom',
    //             align: 'center',
    //         }
    //     })
    //     adForPageManager.showAd(adName);
    // });
}())

