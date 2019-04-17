// declare namespace AFP {
//     export class AdManager {
//         init(type: string, callback)
        // createAd(options: {
        //     parentNode?,
        //     name?: string,
        //     id: string,
        //     slot: string,
        //     width: number,
        //     height: number,
        //     responsive?: boolean,
        //     banner?: boolean,
        //     align?: string,
        // }): string
//         showAd(name)
//         hideAd(name)
//     }
// }
declare namespace AFP {
    export class AdManager {
        inited: boolean;
        init(options, callback?);
        createAd(options, name?);
        showAd(name, callback?);
        hideAd(name, callback?);
    }

    export interface GoogleAdManagerOptions {
    }
    export interface GoogleAdOptions {
        parentNode?,
        name?: string,
        id?: string,
        slot?: string,
        width?: number,
        height?: number,
        containerStyle?: any,
        responsive?: boolean,
        banner?: boolean,
        align?: string,
    }
    export class GoogleAdManager extends AdManager {
    }

    export interface WechatAdManagerOptions {
    }
    export interface WechatAdOptions {
        adUnitId?,
        appSid?,
        immediateAlign?: boolean,
        style?: {
            /** e.g. 200 or '50%' */
            width: number | string,
            /** e.g. 200 or '50%' */
            height: number | string,
            left?: number,
            top?: number,
            align?: 'center' | 'left' | 'right',
            valign?: 'center' | 'top' | 'bottom',
        }
    }
    export class WechatAdManager extends AdManager {
    }
}