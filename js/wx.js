! function (a, b) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function () {
        return b(a)
    }) : b(a, !0)
}(this, function (a, b) {

    function c(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function (a) {
            g(b, a, d)
        }) : j(b, d)
    }

    function d(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.on(b, function (a) {
            d && d.trigger && d.trigger(a), g(b, a, c)
        }) : d ? j(b, d) : j(b, c)
    }

    function e(a) {
        return a = a || {}, a.appId = E.appId, a.verifyAppId = E.appId, a.verifySignType = "sha1", a.verifyTimestamp = E.timestamp + "", a.verifyNonceStr = E.nonceStr, a.verifySignature = E.signature, a
    }

    function f(a) {
        return {
            timeStamp: a.timestamp + "",
            nonceStr: a.nonceStr,
            "package": a.package,
            paySign: a.paySign,
            signType: a.signType || "SHA1"
        }
    }

    function g(a, b, c) {
        var d, e, f;
        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", E.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
        case "ok":
            c.success && c.success(b);
            break;
        case "cancel":
            c.cancel && c.cancel(b);
            break;
        default:
            c.fail && c.fail(b)
        }
        c.complete && c.complete(b)
    }

    function h(a, b) {
        var e, f, c = a,
            d = p[c];
        return d && (c = d), e = "ok", b && (f = b.indexOf(":"), e = b.substring(f + 1), "confirm" == e && (e = "ok"), "failed" == e && (e = "fail"), -1 != e.indexOf("failed_") && (e = e.substring(7)), -1 != e.indexOf("fail_") && (e = e.substring(5)), e = e.replace(/_/g, " "), e = e.toLowerCase(), ("access denied" == e || "no permission to execute" == e) && (e = "permission denied"), "config" == c && "function not exist" == e && (e = "ok"), "" == e && (e = "fail")), b = c + ":" + e
    }

    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b) d = a[b], e = o[d], e && (a[b] = e);
            return a
        }
    }

    function j(a, b) {
        if (!(!E.debug || b && b.isInnerInvoke)) {
            var c = p[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }

    function k() {
        0 != D.preVerifyState && (u || v || E.debug || "6.0.2" > z || D.systemType < 0 || A || (A = !0, D.appId = E.appId, D.initTime = C.initEndTime - C.initStartTime, D.preVerifyTime = C.preVerifyEndTime - C.preVerifyStartTime, H.getNetworkType({
            isInnerInvoke: !0,
            success: function (a) {
                var b, c;
                D.networkType = a.networkType, b = "http://open.weixin.qq.com/sdk/report?v=" + D.version + "&o=" + D.preVerifyState + "&s=" + D.systemType + "&c=" + D.clientVersion + "&a=" + D.appId + "&n=" + D.networkType + "&i=" + D.initTime + "&p=" + D.preVerifyTime + "&u=" + D.url, c = new Image, c.src = b
            }
        })))
    }

    // 获取当前时间
    function l() {
        return (new Date()).getTime();
    }

    function m(b) {
        // w - 微信内置浏览器，
        // a - window
        // b - 参数
        // q - window.document
        w && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
    }

    function n() {
        H.invoke || (
                H.invoke = function (b, c, d) {
                    a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
                },
                H.on = function (b, c) {
                    a.WeixinJSBridge && WeixinJSBridge.on(b, c)
            });
    }

    var o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    A,
    B,
    C,
    D,
    E, // 注入的配置
    F,
    G,
    H;

    // window 中不存在jWeixin，对o进行赋值
    // o 的作用：保存js函数 和 原生方法 之间的关系
    if (!a.jWeixin)
        return o = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest"
        },
    //p 的作用：保存 原生方法 和 js函数 之间的关系
    p = function () {
        var b, a = {};
        for (b in o) a[o[b]] = b;
        return a;
    }(),
    // window.document
    q = a.document,
    // window.document.title
    r = q.title,
    // userAgent 声明了浏览器用于 HTTP 请求的用户代理头的值。
    s = navigator.userAgent.toLowerCase(),
    // platform  声明了运行浏览器的操作系统和（或）硬件平台。
    t = navigator.platform.toLowerCase(),
    // 是 mac 还是 windows ？
    u = !(!t.match("mac") && !t.match("win")),
    // 微信调试模式 ？
    v = -1 != s.indexOf("wxdebugger"),
    // 微信内置浏览器 ？
    w = -1 != s.indexOf("micromessenger"),
    // Android ？
    x = -1 != s.indexOf("android"),
    // iOS ？
    y = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"),
    // https://gist.github.com/wjp2013/fff34c063cf0cf227d65 可查看
    // Android： micromessenger/5.0.1.352   iOS： micromessenger/5.0
    // 版本号
    z = function () {
        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : "";
    }(),
    A = !1, //false
    B = !1, //false
    C = {
        initStartTime: l(), // 开始初始化时间
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
    },
    D = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        preVerifyState: 1,
        systemType: y ? 1 : x ? 2 : -1, // ios 1, android 2, 其他 3
        clientVersion: z,  // 版本号
        url: encodeURIComponent(location.href)  // 当前 url
    },
    E = {},
    F = {
        _completes: []
    },
    G = {
        state: 0,
        data: {}
    },
    // 当 WeixinJSBridgeReady时，设置 initEndTime
    m(function () {
        C.initEndTime = l();
    }),
    H = {
        // 通过config接口注入权限验证配置
        // wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: '', // 必填，公众号的唯一标识
        //     timestamp: , // 必填，生成签名的时间戳
        //     nonceStr: '', // 必填，生成签名的随机串
        //     signature: '',// 必填，签名，见附录1
        //     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });
        config: function (a) {
                E = a,
                j("config", a);
                var b = E.check === !1 ? !1 : !0;
                m(function () {
                    var a, d, e;
                    if (b) c(o.config, {
                        verifyJsApiList: i(E.jsApiList)
                    }, function () {
                        F._complete = function (a) {
                            C.preVerifyEndTime = l(), G.state = 1, G.data = a
                        }, F.success = function () {
                            D.preVerifyState = 0
                        }, F.fail = function (a) {
                            F._fail ? F._fail(a) : G.state = -1
                        };
                        var a = F._completes;
                        return a.push(function () {
                            k()
                        }), F.complete = function () {
                            for (var c = 0, d = a.length; d > c; ++c) a[c]();
                            F._completes = []
                        }, F
                    }()), C.preVerifyStartTime = l();
                    else {
                        for (G.state = 1, a = F._completes, d = 0, e = a.length; e > d; ++d) a[d]();
                        F._completes = []
                    }
                }), E.beta && n()
            },
            ready: function (a) {
                0 != G.state ? a() : (F._completes.push(a), !w && E.debug && a())
            },
            error: function (a) {
                "6.0.2" > z || B || (B = !0, -1 == G.state ? a(G.data) : F._fail = a)
            },
            checkJsApi: function (a) {
                var b = function (a) {
                    var c, d, b = a.checkResult;
                    for (c in b) d = p[c], d && (b[d] = b[c], delete b[c]);
                    return a
                };
                c("checkJsApi", {
                    jsApiList: i(a.jsApiList)
                }, function () {
                    return a._complete = function (a) {
                        if (x) {
                            var c = a.checkResult;
                            c && (a.checkResult = JSON.parse(c))
                        }
                        a = b(a)
                    }, a
                }())
            },
            onMenuShareTimeline: function (a) {
                d(o.onMenuShareTimeline, {
                    complete: function () {
                        c("shareTimeline", {
                            title: a.title || r,
                            desc: a.title || r,
                            img_url: a.imgUrl || "",
                            link: a.link || location.href,
                            type: a.type || "link",
                            data_url: a.dataUrl || ""
                        }, a)
                    }
                }, a)
            },
            onMenuShareAppMessage: function (a) {
                d(o.onMenuShareAppMessage, {
                    complete: function () {
                        c("sendAppMessage", {
                            title: a.title || r,
                            desc: a.desc || "",
                            link: a.link || location.href,
                            img_url: a.imgUrl || "",
                            type: a.type || "link",
                            data_url: a.dataUrl || ""
                        }, a)
                    }
                }, a)
            },
            onMenuShareQQ: function (a) {
                d(o.onMenuShareQQ, {
                    complete: function () {
                        c("shareQQ", {
                            title: a.title || r,
                            desc: a.desc || "",
                            img_url: a.imgUrl || "",
                            link: a.link || location.href
                        }, a)
                    }
                }, a)
            },
            onMenuShareWeibo: function (a) {
                d(o.onMenuShareWeibo, {
                    complete: function () {
                        c("shareWeiboApp", {
                            title: a.title || r,
                            desc: a.desc || "",
                            img_url: a.imgUrl || "",
                            link: a.link || location.href
                        }, a)
                    }
                }, a)
            },
            onMenuShareQZone: function (a) {
                d(o.onMenuShareQZone, {
                    complete: function () {
                        c("shareQZone", {
                            title: a.title || r,
                            desc: a.desc || "",
                            img_url: a.imgUrl || "",
                            link: a.link || location.href
                        }, a)
                    }
                }, a)
            },
            startRecord: function (a) {
                c("startRecord", {}, a)
            },
            stopRecord: function (a) {
                c("stopRecord", {}, a)
            },
            onVoiceRecordEnd: function (a) {
                d("onVoiceRecordEnd", a)
            },
            playVoice: function (a) {
                c("playVoice", {
                    localId: a.localId
                }, a)
            },
            pauseVoice: function (a) {
                c("pauseVoice", {
                    localId: a.localId
                }, a)
            },
            stopVoice: function (a) {
                c("stopVoice", {
                    localId: a.localId
                }, a)
            },
            onVoicePlayEnd: function (a) {
                d("onVoicePlayEnd", a)
            },
            uploadVoice: function (a) {
                c("uploadVoice", {
                    localId: a.localId,
                    isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                }, a)
            },
            downloadVoice: function (a) {
                c("downloadVoice", {
                    serverId: a.serverId,
                    isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                }, a)
            },
            translateVoice: function (a) {
                c("translateVoice", {
                    localId: a.localId,
                    isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                }, a)
            },
            chooseImage: function (a) {
                c("chooseImage", {
                    scene: "1|2",
                    count: a.count || 9,
                    sizeType: a.sizeType || ["original", "compressed"],
                    sourceType: a.sourceType || ["album", "camera"]
                }, function () {
                    return a._complete = function (a) {
                        if (x) {
                            var b = a.localIds;
                            b && (a.localIds = JSON.parse(b))
                        }
                    }, a
                }())
            },
            previewImage: function (a) {
                c(o.previewImage, {
                    current: a.current,
                    urls: a.urls
                }, a)
            },
            uploadImage: function (a) {
                c("uploadImage", {
                    localId: a.localId,
                    isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                }, a)
            },
            downloadImage: function (a) {
                c("downloadImage", {
                    serverId: a.serverId,
                    isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
                }, a)
            },
            getNetworkType: function (a) {
                var b = function (a) {
                    var c, d, e, b = a.errMsg;
                    if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c;
                    else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                        a.networkType = e;
                        break;
                    default:
                        a.errMsg = "getNetworkType:fail"
                    }
                    return a
                };
                c("getNetworkType", {}, function () {
                    return a._complete = function (a) {
                        a = b(a)
                    }, a
                }())
            },
            openLocation: function (a) {
                c("openLocation", {
                    latitude: a.latitude,
                    longitude: a.longitude,
                    name: a.name || "",
                    address: a.address || "",
                    scale: a.scale || 28,
                    infoUrl: a.infoUrl || ""
                }, a)
            },
            getLocation: function (a) {
                a = a || {}, c(o.getLocation, {
                    type: a.type || "wgs84"
                }, function () {
                    return a._complete = function (a) {
                        delete a.type
                    }, a
                }())
            },
            hideOptionMenu: function (a) {
                c("hideOptionMenu", {}, a)
            },
            showOptionMenu: function (a) {
                c("showOptionMenu", {}, a)
            },
            closeWindow: function (a) {
                a = a || {}, c("closeWindow", {}, a)
            },
            hideMenuItems: function (a) {
                c("hideMenuItems", {
                    menuList: a.menuList
                }, a)
            },
            showMenuItems: function (a) {
                c("showMenuItems", {
                    menuList: a.menuList
                }, a)
            },
            hideAllNonBaseMenuItem: function (a) {
                c("hideAllNonBaseMenuItem", {}, a)
            },
            showAllNonBaseMenuItem: function (a) {
                c("showAllNonBaseMenuItem", {}, a)
            },
            scanQRCode: function (a) {
                a = a || {}, c("scanQRCode", {
                    needResult: a.needResult || 0,
                    scanType: a.scanType || ["qrCode", "barCode"]
                }, function () {
                    return a._complete = function (a) {
                        var b, c;
                        y && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                    }, a
                }())
            },
            openProductSpecificView: function (a) {
                c(o.openProductSpecificView, {
                    pid: a.productId,
                    view_type: a.viewType || 0,
                    ext_info: a.extInfo
                }, a)
            },
            addCard: function (a) {
                var e, f, g, h, b = a.cardList,
                    d = [];
                for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                    card_id: g.cardId,
                    card_ext: g.cardExt
                }, d.push(h);
                c(o.addCard, {
                    card_list: d
                }, function () {
                    return a._complete = function (a) {
                        var c, d, e, b = a.card_list;
                        if (b) {
                            for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                            a.cardList = b, delete a.card_list
                        }
                    }, a
                }())
            },
            chooseCard: function (a) {
                c("chooseCard", {
                    app_id: E.appId,
                    location_id: a.shopId || "",
                    sign_type: a.signType || "SHA1",
                    card_id: a.cardId || "",
                    card_type: a.cardType || "",
                    card_sign: a.cardSign,
                    time_stamp: a.timestamp + "",
                    nonce_str: a.nonceStr
                }, function () {
                    return a._complete = function (a) {
                        a.cardList = a.choose_card_info, delete a.choose_card_info
                    }, a
                }())
            },
            openCard: function (a) {
                var e, f, g, h, b = a.cardList,
                    d = [];
                for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                    card_id: g.cardId,
                    code: g.code
                }, d.push(h);
                c(o.openCard, {
                    card_list: d
                }, a)
            },
            chooseWXPay: function (a) {
                c(o.chooseWXPay, f(a), a)
            }
    }, b && (a.wx = a.jWeixin = H), H
});
