import axios from 'axios';
import qs from 'qs';

const wx = require('weixin-js-sdk');

// 获取微信参数
function getConfig () {
    // 注意： 如果你的vue项目，路由没有开启history 模式,也就是你的url上面包含“#”，这个时候要从后端正确获取签名，就需要去掉url上#后面的字符。（url去掉’#’hash部分，可用location.href.split('#')[0]）
    let url = encodeURIComponent(window.location.href.split('#')[0]); // 获取锚点之前的链接
    return new Promise((resolve) => {
        axios({
            method: 'post',
            url: `https://www.forguo.cn/api/weixin/share`,
            data: qs.stringify({
                url
            })
        }).then(response => {
            let res = response.data;
            resolve(res);
        }, (err) => {
            console.log(err);
            axios({
                method: 'post',
                url: `//server.forguo.cn/wxShare`,
                data: qs.stringify({
                    url
                })
            }).then(res => {
                let data = res.data;
                resolve(data);
            }, (e) => {
                console.log(e);
            });
        });
    });
}

async function wxInit (shareData) {
    let res = await getConfig();
    const data = res.data;
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
            // 'checkJsApi',
            // 'hideAllNonBaseMenuItem',
            // 'hideOptionMenu'
        ]
    });
    // wx.hideOptionMenu();
    wx.ready(function () {
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);
        // wx.hideOptionMenu();
        // wx.hideAllNonBaseMenuItem({
        //    success: function () {}
        // });
    });
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res);
    });
}

export {
    wxInit,
    wx
};
