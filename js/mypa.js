! function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var o = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}(function(e) {
    for (var t in e)
        if (Object.prototype.hasOwnProperty.call(e, t)) switch (typeof e[t]) {
            case "function":
                break;
            case "object":
                e[t] = function(t) {
                    var n = t.slice(1),
                        i = e[t[0]];
                    return function(e, t, o) {
                        i.apply(this, [e, t, o].concat(n))
                    }
                }(e[t]);
                break;
            default:
                e[t] = e[e[t]]
        }
    return e
}([function(e, t, n) {
        "use strict";
        n(169), window._to = {
            eventType: "click"
        };
        var i = n(147);
        i()
    }, function(e, t, n) {
        var i = n(19);
        e.exports = i
    }, function(e, t, n) {
        var i = n(20);
        e.exports = i
    }, function(e, t, n) {
        "use strict";
        var i = n(26);
        n(22), n(12), e.exports = i
    },
    [182, 18, 34],
    function(e, t, n) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            o = n(3),
            r = n(7),
            a = window,
            s = {
                "&#39;": "'",
                "&amp;": "&",
                "&gt;": ">",
                "&lt;": "<",
                "&quot;": '"'
            };
        e.exports = {
            winH: function() {
                return a.innerHeight
            },
            winW: function() {
                return a.innerWidth
            },
            appName: function c() {
                var c = (r.app || {}, r.app.name || "");
                return c.toLowerCase()
            },
            isIos: function() {
                return r.os && "ios" === r.os.name
            },
            alipayVer: function() {
                return r.app && r.app.version
            },
            isAndroid: function() {
                return r.os && "android" === r.os.name
            },
            csmobileUrl: function(e) {
                return window.MOBILE_SERVER + e
            },
            cschannelUrl: function(e) {
                return window.CHANNEL_SERVER + e
            },
            cliveUrl: function(e) {
                return window.CLIVE_SERVER + e
            },
            ua: function() {
                return navigator.userAgent.toLowerCase()
            },
            isAlipay: function() {
                return this.ua().indexOf("alipayclient") > -1
            },
            supportAlipayJSBridge: function() {
                return window.AlipayJSBridge
            },
            isAfwealth: function() {
                return this.ua().indexOf("afwealth") > -1
            },
            landing: function(e) {
                return "https://ds.alipay.com/?scheme=" + encodeURIComponent(e)
            },
            isHydrops: function(e) {
                if (!e) return !1;
                var t = /(_yinliu)/;
                return t.test(e)
            },
            appHttpRequest: function(e, t, n) {
                var i = {
                    url: e
                };
                "POST" === t && (i.method = "POST", i.data = n || "");
                try {
                    AlipayJSBridge.call("httpRequest", i, function(e) {
                        console.log(e)
                    })
                } catch (o) {}
            },
            parseStr2Json: function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        var n = e[t];
                        try {
                            e[t] = JSON.parse(n), "object" === ("undefined" == typeof n ? "undefined" : i(n)) && (e[t] = parseObj(n))
                        } catch (o) {}
                    }
                return e
            },
            escape: function(e) {
                var t = e ? e.replace(/<|>|'|"|&/g, function(e) {
                    var t = e.charCodeAt(0),
                        n = ["&#"];
                    return t = 32 == t ? 160 : t, n.push(t), n.push(";"), n.join("")
                }) : "";
                return t
            },
            unEscape: function(e) {
                if (!e) return "";
                var t = /&amp;/;
                t.test(e) && (e = e.replace(/&amp;/g, "&"));
                var n = document.createElement("div");
                return n.innerHTML = e, n.childNodes[0].nodeValue
            },
            unEscapeHtml: function(e) {
                if (null == e) return "";
                var t = new RegExp("(" + Object.keys(s).join("|") + ")", "g");
                return String(e).replace(t, function(e) {
                    return s[e]
                })
            },
            hackStressImgInKnowledge: function(e) {
                if ("android" === r.os.name) {
                    var t = e.find("img");
                    t.forEach(function(e) {
                        o(e).css({
                            "vertical-align": "top"
                        })
                    })
                }
            },
            imgLoad: function(e, t) {
                var n = this;
                if (!e || !e.length) return t && t();
                var i = [];
                e.each(function(e) {
                    i[e] = !1;
                    var o = new Image;
                    o.onabort = function() {
                        n._loadContent(i, e, t)
                    }, o.onerror = function() {
                        n._loadContent(i, e, t)
                    }, o.onload = function() {
                        n._loadContent(i, e, t)
                    }, o.src = this.src
                })
            },
            _loadContent: function(e, t, n) {
                e[t] = !0;
                var i = !0;
                e.forEach(function(e) {
                    e || (i = !1)
                }), i && n && n()
            },
            getLocation: function() {
                var e = {
                    province: "",
                    city: ""
                };
                return window.AlipayJSBridge ? AlipayJSBridge.call("getLocation", function(t) {
                    t.error ? (e.province = window.CHATCONFIG.province, e.city = window.CHATCONFIG.city) : (e.province = t.province, e.city = t.city ? t.city : t.province)
                }) : (e.province = window.CHATCONFIG.province, e.city = window.CHATCONFIG.city), e
            },
            messageStrToArr: function(e) {
                if (e) {
                    var t = /<\/section>/g,
                        n = t.test(e) ? e.replace(/<\/section>/g, "</section>@&@").replace(/<\/section>@&@$/g, "</section>") : e;
                    return n.split("@&@")
                }
                return []
            },
            chunk: function(e, t) {
                if (null == t || t < 1) return [];
                for (var n = [], i = 0, o = e.length; i < o;) n.push(Array.prototype.slice.call(e, i, i += t));
                return n
            },
            getUrlData: function(e) {
                var t = {},
                    n = "";
                return e = e ? e.substring(e.indexOf("?")) : location.search, e.slice(1).split("&").forEach(function(e) {
                    if (e = e.split("="), null != e[0] && null != e[1]) {
                        try {
                            n = decodeURI(e[1])
                        } catch (i) {
                            n = "", console.log("getUrlData", i)
                        }
                        t[e[0]] = n
                    }
                }), t
            },
            startApp: function(e) {
                e = decodeURI(e), e = encodeURI(e);
                var t = this;
                this.isAlipay() ? this.getStartupParams(function(n) {
                    "20000067" === n.appId ? t.pushWindowFn(e) : AlipayJSBridge.call("startApp", {
                        appId: "20000067",
                        param: {
                            url: e
                        },
                        closeCurrentApp: !1
                    }, function(e) {})
                }) : (e = "https://ds.alipay.com/?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20000067%26action%3DWebView%26url=" + e, window.location.href = e)
            },
            getStartupParams: function(e) {
                this.bridgeReady(function() {
                    AlipayJSBridge = AlipayJSBridge || {}, e && e(AlipayJSBridge.startupParams)
                })
            },
            bridgeReady: function(e) {
                document.addEventListener("AlipayJSBridgeReady", function() {
                    e && e()
                })
            },
            "goto": function(e, t) {
                var n = this.getUrlData("scene") || window.SCENE_CODE;
                if (t = t || {}, e) {
                    var i = o.extend({
                        readTitle: !0,
                        showOptionMenu: !1,
                        showToolBar: !1,
                        showLoading: !0,
                        showTitleBar: !0
                    }, t);
                    window.AlipayJSBridge && /https?/.test(e) && "app_authcenter" !== n && "app_paymentpage" !== n ? AlipayJSBridge.call("pushWindow", {
                        url: e,
                        param: i
                    }) : location.href = e
                }
            },
            pushWindowFn: function(e) {
                var t = this.getUrlData("scene") || window.SCENE_CODE;
                if ("undefined" != typeof AlipayJSBridge && "app_authcenter" !== t) try {
                    AlipayJSBridge.call("pushWindow", {
                        url: e,
                        param: {
                            readTitle: !0,
                            showOptionMenu: !1,
                            showToolBar: !1,
                            showLoading: !0,
                            showTitleBar: !0
                        }
                    })
                } catch (n) {} else window.location.href = e
            },
            supportKbase: function(e) {
                var t = e.find("script"),
                    n = 0,
                    i = t.length;
                if (i)
                    for (; n < i; n++) {
                        var r = t[n].src;
                        if (/(kbase-static)/.test(r)) {
                            var a = o("body").find("#J-kbaseStatic");
                            a.length && a.remove();
                            var s = document.createElement("script");
                            s.src = r, s.id = "J-kbaseStatic", s.charset = "utf-8", document.body.appendChild(s)
                        }
                    }
            }
        }
    },
    function(e, t) {
        "use strict";

        function n(e, t) {
            var n = t.context;
            if (t.beforeSend && t.beforeSend.call(n, e, t) === !1) return !1
        }

        function i(e, t, n, i) {
            var o = n.context,
                a = "success";
            n.success && n.success.call(o, e, a, t), i && i.resolveWith(o, [e, a, t]), r(a, t, n)
        }

        function o(e, t, n, i, o) {
            var a = i.context;
            i.error && i.error.call(a, n, t, e), o && o.rejectWith(a, [n, t, e]), r(t, n, i)
        }

        function r(e, t, n) {
            var i = n.context;
            n.complete && n.complete.call(i, t, e)
        }
        e.exports = {
            ajaxBeforeSend: n,
            ajaxSuccess: i,
            ajaxError: o
        }
    },
    function(e, t, n) {
        var i = n(11);
        e.exports = i
    },
    function(e, t, n) {
        "use strict";
        var i = n(1);
        n(2);
        var o = {
            init: function(e) {
                function t(e) {
                    a.handler.touchmove(e)
                }

                function n(e) {
                    a.handler.touchend(e), document.removeEventListener("touchmove", t, !1), document.removeEventListener("touchend", n, !1), document.removeEventListener("touchcancel", o, !1)
                }

                function o(e) {
                    a.handler.touchcancel(e), document.removeEventListener("touchmove", t, !1), document.removeEventListener("touchend", n, !1), document.removeEventListener("touchcancel", o, !1)
                }
                var r = this,
                    a = r[e],
                    s = function(r) {
                        var s = i(r);
                        s.data(e) || s.data(e, 1).forEach(function(e) {
                            e.addEventListener("touchstart", function(e) {
                                a.handler.touchstart(e), document.addEventListener("touchmove", t, !1), document.addEventListener("touchend", n, !1), document.addEventListener("touchcancel", o, !1)
                            }, !1)
                        })
                    };
                a.events.forEach(function(e) {
                    r.list[e] = s, i.fn[e] = function(t) {
                        return this.on(e, t)
                    }
                })
            },
            list: {}
        };
        i.gestures = o, e.exports = i
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(5),
            r = n(30),
            a = {
                changeParams: function(e) {
                    e = e || {};
                    var t, n = "";
                    for (t in e) "" !== n && (n += ","), n += '"' + t + '":' + e[t];
                    return {
                        params: "{" + n + "}"
                    }
                },
                seed: function(e, t, n, a, s) {
                    a = a || {};
                    var c = {
                        sid: SESSIONID
                    };
                    window.CHATCONFIG && (c.bizToken = window.CHATCONFIG.bizToken), a = i.extend(c, a), r[e] = r[e] || {};
                    var l = this;
                    i.ajax({
                        url: o.csmobileUrl("/seedRecord.json"),
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        data: i.extend({
                            eventName: r[e].en[t],
                            triggerPoint: r[e].tp[n]
                        }, l.changeParams(a) || {}),
                        timeout: 2e3,
                        complete: function(e) {
                            s && s(e)
                        }
                    })
                }
            };
        e.exports = a
    },
    function(e, t) {
        var n = function(e) {
            var t = {},
                n = e.match(/AliApp\S+\b\)/gi);
            return t.is = !!/(T-UA)|(TBIOS)|(WindVane)|(AliApp)/i.test(e), t.name = n ? n[0].match(/\(\w+\-*\w*/)[0].split("(")[1] : "", t.version = n ? n[0].match(/(\d+\.*)+/gi)[0] : "", t
        };
        e.exports = n
    },
    function(e, t, n) {
        function i(e) {
            return Object.prototype.toString.call(e)
        }

        function o(e) {
            return "[object Object]" === i(e)
        }

        function r(e) {
            return "[object Function]" === i(e)
        }

        function a(e, t, n) {
            for (var i = 0, o = e.length; i < o && t.call(e, e[i], i) !== !1; i++);
        }

        function s(e, t, n) {
            var a = r(t) ? t.call(null, n) : t;
            if (!a) return null;
            var s = {
                name: e,
                version: u,
                codename: ""
            };
            "android" === e && (s.type = n.indexOf("Mobi") > -1 ? "phone" : "pad"), "ios" === e && (s.type = n.indexOf("iPhone") > -1 ? "phone" : "pad");
            var c = i(a);
            if (a === !0) return s;
            if ("[object String]" === c) {
                if (n.indexOf(a) !== -1) return s
            } else {
                if (o(a)) return a.hasOwnProperty("version") && (s.version = a.version), s;
                if (a.exec) {
                    var l = a.exec(n);
                    if (l) return l.length >= 2 && l[1] ? s.version = l[1].replace(/_/g, ".") : s.version = u, s
                }
            }
        }

        function c(e, t, n, i) {
            var o = w;
            a(t, function(t) {
                var n = s(t[0], t[1], e);
                if (n) return o = n, !1
            }), n.call(i, o.name, o.version)
        }
        var l = {},
            u = "-1",
            d = navigator.userAgent || "",
            h = navigator.appVersion || "",
            p = navigator.vendor || "",
            f = (window.external, /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/),
            v = n(10),
            g = [
                ["wp", function(e) {
                    return e.indexOf("windows phone ") !== -1 ? /\bwindows phone (?:os )?([0-9.]+)/ : e.indexOf("xblwp") !== -1 ? /\bxblwp([0-9.]+)/ : e.indexOf("zunewp") !== -1 ? /\bzunewp([0-9.]+)/ : "windows phone"
                }],
                ["ios", function(e) {
                    return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : e.indexOf("iph os ") !== -1 ? /\biph os ([0-9_]+)/ : /\bios\b/
                }],
                ["yunos", /\baliyunos ([0-9.]+)/],
                ["android", /\bandroid[\/\- ]?([0-9.x]+)?/],
                ["linux", "linux"]
            ],
            m = [
                ["qq", /\bm?qqbrowser\/([0-9.]+)/],
                ["ie", f],
                ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
                ["uc", function(e) {
                    return e.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/ : e.indexOf("ucweb") >= 0 ? /\bucweb[\/]?([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/
                }],
                ["android", function(e) {
                    if (e.indexOf("android") !== -1) return /\bversion\/([0-9.]+(?: beta)?)/
                }],
                ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
                ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/]
            ],
            w = {
                name: "na",
                version: u
            },
            y = function(e) {
                e = (e || "").toLowerCase();
                var t = {};
                return c(e, g, function(e, n) {
                    var i = parseFloat(n);
                    t.os = {
                        name: e,
                        version: i,
                        fullVersion: n
                    }, t.os[e] = i
                }, t), c(e, m, function(e, n) {
                    var i = parseFloat(n);
                    t.browser = {
                        name: e,
                        version: i,
                        fullVersion: n
                    }, t.browser[e] = i
                }, t), t
            };
        l = y(d + " " + h + " " + p), l.parse = y, l._checkApp = v, l.app = l._checkApp(d), e.exports = l
    },
    function(e, t, n) {
        var i = n(13);
        e.exports = i
    },
    function(e, t, n) {
        "use strict";

        function i(e, t) {
            var n = e[d],
                i = n && c[n];
            if (t === a) return i || o(e);
            if (i) {
                if (t in i) return i[t];
                var r = u(t);
                if (r in i) return i[r]
            }
            return l.call(s(e), t)
        }

        function o(e, t, n) {
            var i = e[d] || (e[d] = ++s.uuid),
                o = c[i] || (c[i] = r(e));
            return t !== a && (o[u(t)] = n), o
        }

        function r(e) {
            var t = {};
            return s.each(e.attributes || h, function(e, n) {
                0 == n.name.indexOf("data-") && (t[u(n.name.replace("data-", ""))] = s.zepto.deserializeValue(n.value))
            }), t
        }
        var a, s = n(21),
            c = {},
            l = s.fn.data,
            u = s.camelCase,
            d = s.expando = "Zepto" + +new Date,
            h = [];
        s.fn.data = function(e, t) {
            return t === a ? s.isPlainObject(e) ? this.each(function(t, n) {
                s.each(e, function(e, t) {
                    o(n, e, t)
                })
            }) : 0 == this.length ? a : i(this[0], e) : this.each(function() {
                o(this, e, t)
            })
        }, s.fn.removeData = function(e) {
            return "string" == typeof e && (e = e.split(/\s+/)), this.each(function() {
                var t = this[d],
                    n = t && c[t];
                n && s.each(e || n, function(t) {
                    delete n[e ? u(this) : t]
                })
            })
        }, ["remove", "empty"].forEach(function(e) {
            var t = s.fn[e];
            s.fn[e] = function() {
                var n = this.find("*");
                return "remove" === e && (n = n.add(this)), n.removeData(), t.call(this)
            }
        }), e.exports = s
    },
    function(e, t, n) {
        var i = n(15);
        e.exports = i
    },
    function(e, t, n) {
        "use strict";
        var i = n(1);
        n(6);
        n(2), n(16), n(17), e.exports = i
    },
    function(e, t, n) {
        "use strict";
        var i = n(1),
            o = n(6);
        n(2);
        var r = 0,
            a = window.document,
            s = o.ajaxBeforeSend,
            c = o.ajaxSuccess,
            l = o.ajaxError;
        i.ajaxJSONP = function(e, t) {
            if (!("type" in e)) return i.ajax && i.ajax(e);
            var n, o, u = e.jsonpCallback,
                d = (i.isFunction(u) ? u() : u) || "jsonp" + ++r,
                h = a.createElement("script"),
                p = window[d],
                f = function(e) {
                    i(h).triggerHandler("error", e || "abort")
                },
                v = {
                    abort: f
                };
            return t && t.promise(v), i(h).on("load error", function(r, a) {
                clearTimeout(o), i(h).off().remove(), "error" != r.type && n ? c(n[0], v, e, t) : l(null, a || "error", v, e, t), window[d] = p, n && i.isFunction(p) && p(n[0]), p = n = void 0
            }), s(v, e) === !1 ? (f("abort"), v) : (window[d] = function() {
                n = arguments
            }, h.src = e.url.replace(/\?(.+)=\?/, "?$1=" + d), a.head.appendChild(h), e.timeout > 0 && (o = setTimeout(function() {
                f("timeout")
            }, e.timeout)), v)
        }, e.exports = i
    },
    function(e, t, n) {
        "use strict";

        function i() {}

        function o(e) {
            return e && (e = e.split(";", 2)[0]), e && (e == m ? "html" : e == g ? "json" : f.test(e) ? "script" : v.test(e) && "xml") || "text"
        }

        function r(e, t) {
            return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
        }

        function a(e) {
            e.processData && e.data && "string" != l.type(e.data) && (e.data = l.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = r(e.url, e.data), e.data = void 0)
        }

        function s(e, t, n, i) {
            return l.isFunction(t) && (i = n, n = t, t = void 0), l.isFunction(n) || (i = n, n = void 0), {
                url: e,
                data: t,
                success: n,
                dataType: i
            }
        }

        function c(e, t, n, i) {
            var o, r = l.isArray(t),
                a = l.isPlainObject(t);
            l.each(t, function(t, s) {
                o = l.type(s), i && (t = n ? i : i + "[" + (a || "object" == o || "array" == o ? t : "") + "]"), !i && r ? e.add(s.name, s.value) : "array" == o || !n && "object" == o ? c(e, s, n, t) : e.add(t, s)
            })
        }
        var l = n(1),
            u = n(6);
        n(2);
        var d, h, p = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            f = /^(?:text|application)\/javascript/i,
            v = /^(?:text|application)\/xml/i,
            g = "application/json",
            m = "text/html",
            w = /^\s*$/,
            y = u.ajaxBeforeSend,
            T = u.ajaxSuccess,
            b = u.ajaxError;
        l.ajaxSettings = {
            type: "GET",
            beforeSend: i,
            success: i,
            error: i,
            complete: i,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: g,
                xml: "application/xml, text/xml",
                html: m,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, l.ajax = function(e) {
            var t = l.extend({}, e || {}),
                n = l.Deferred && l.Deferred();
            for (d in l.ajaxSettings) void 0 === t[d] && (t[d] = l.ajaxSettings[d]);
            t.crossDomain || (t.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(t.url) && RegExp.$2 != window.location.host), t.url || (t.url = window.location.toString()), a(t), t.cache === !1 && (t.url = r(t.url, "_=" + Date.now()));
            var s = t.dataType,
                c = /\?.+=\?/.test(t.url);
            if ("jsonp" == s || c) return c || (t.url = r(t.url, t.jsonp ? t.jsonp + "=?" : t.jsonp === !1 ? "" : "callback=?")), l.ajaxJSONP(t, n);
            var u, p = t.accepts[s],
                f = {},
                v = function(e, t) {
                    f[e.toLowerCase()] = [e, t]
                },
                g = /^([\w-]+:)\/\//.test(t.url) ? RegExp.$1 : window.location.protocol,
                m = t.xhr(),
                C = m.setRequestHeader;
            if (n && n.promise(m), t.crossDomain || v("X-Requested-With", "XMLHttpRequest"), v("Accept", p || "*/*"), p && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), m.overrideMimeType && m.overrideMimeType(p)), (t.contentType || t.contentType !== !1 && t.data && "GET" != t.type.toUpperCase()) && v("Content-Type", t.contentType || "application/x-www-form-urlencoded"), t.headers)
                for (h in t.headers) v(h, t.headers[h]);
            m.setRequestHeader = v;
            var k = !("async" in t) || t.async;
            if (m.open(t.type, t.url, k), m.onreadystatechange = function() {
                    if (4 == m.readyState) {
                        m.onreadystatechange = i, clearTimeout(u);
                        var e, r = !1;
                        if (m.status >= 200 && m.status < 300 || 304 == m.status || 0 == m.status && "file:" == g) {
                            s = s || o(m.getResponseHeader("content-type")), e = m.responseText;
                            try {
                                "script" == s ? (0, eval)(e) : "xml" == s ? e = m.responseXML : "json" == s && (e = w.test(e) ? null : l.parseJSON(e))
                            } catch (a) {
                                r = a
                            }
                            r ? b(r, "parsererror", m, t, n) : T(e, m, t, n)
                        } else b(m.statusText || null, m.status ? "error" : "abort", m, t, n)
                    }
                }, y(m, t) === !1) return m.abort(), b(null, "abort", m, t, n), m;
            for (h in f) C.apply(m, f[h]);
            return t.timeout > 0 && (m.timeout = t.timeout, m.ontimeout = function() {
                m.onreadystatechange = i, m.abort(), b(null, "timeout", m, t, n)
            }), m.send(t.data ? t.data : null), m
        }, l.get = function() {
            return l.ajax(s.apply(null, arguments))
        }, l.post = function() {
            var e = s.apply(null, arguments);
            return e.type = "POST", l.ajax(e)
        }, l.getJSON = function() {
            var e = s.apply(null, arguments);
            return e.dataType = "json", l.ajax(e)
        }, l.fn.load = function(e, t, n) {
            if (!this.length) return this;
            var i, o = this,
                r = e.split(/\s/),
                a = s(e, t, n),
                c = a.success;
            return r.length > 1 && (a.url = r[0], i = r[1]), a.success = function(e) {
                o.html(i ? l("<div>").html(e.replace(p, "")).find(i) : e), c && c.apply(o, arguments)
            }, l.ajax(a), this
        };
        var C = encodeURIComponent;
        l.param = function(e, t) {
            var n = [];
            return n.add = function(e, t) {
                this.push(C(e) + "=" + C(t))
            }, c(n, e, t), n.join("&").replace(/%20/g, "+")
        }, e.exports = l
    },
    function(e, t, n) {
        var i = n(42);
        e.exports = i
    },
    function(e, t) {
        "use strict";
        var n = function() {
            function e(e) {
                return null == e ? String(e) : N[_.call(e)] || "object"
            }

            function t(t) {
                return "function" == e(t)
            }

            function n(e) {
                return null != e && e == e.window
            }

            function i(e) {
                return null != e && e.nodeType == e.DOCUMENT_NODE
            }

            function o(t) {
                return "object" == e(t)
            }

            function r(e) {
                return o(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
            }

            function a(e) {
                return "number" == typeof e.length
            }

            function s(e) {
                return I.call(e, function(e) {
                    return null != e
                })
            }

            function c(e) {
                return e.length > 0 ? w.fn.concat.apply([], e) : e
            }

            function l(e) {
                return e in A ? A[e] : A[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
            }

            function u(e) {
                return "children" in e ? k.call(e.children) : w.map(e.childNodes, function(e) {
                    if (1 == e.nodeType) return e
                })
            }

            function d(e, t) {
                return null == t ? w(e) : w(e).filter(t)
            }

            function h(e, n, i, o) {
                return t(n) ? n.call(e, i, o) : n
            }

            function p(e, t, n) {
                null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
            }

            function f(e, t) {
                var n = e.className,
                    i = n && n.baseVal !== g;
                return t === g ? i ? n.baseVal : n : void(i ? n.baseVal = t : e.className = t)
            }

            function v(e) {
                var t;
                try {
                    return e ? "true" == e || "false" != e && ("null" == e ? null : /^0/.test(e) || isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? w.parseJSON(e) : e : t) : e
                } catch (n) {
                    return e
                }
            }
            var g, m, w, y, T, b, C = [],
                k = C.slice,
                I = C.filter,
                E = window,
                S = E.document,
                x = {},
                A = {},
                O = /^\s*<(\w+|!)[^>]*>/,
                N = {},
                _ = N.toString,
                M = {},
                P = Array.isArray;
            return M.matches = function(e, t) {
                var n = S.createElement("div");
                if (!t || !e || 1 !== e.nodeType) return !1;
                var i = e.webkitMatchesSelector || e.matchesSelector;
                if (i) return i.call(e, t);
                var o, r = e.parentNode,
                    a = !r;
                return a && (r = n).appendChild(e), o = ~M.qsa(r, t).indexOf(e), a && n.removeChild(e), o
            }, T = function(e) {
                return e.replace(/-+(.)?/g, function(e, t) {
                    return t ? t.toUpperCase() : ""
                })
            }, b = function(e) {
                return I.call(e, function(t, n) {
                    return e.indexOf(t) == n
                })
            }, M.fragment = function(e, t) {
                var n, i, o = S.createElement("table"),
                    r = S.createElement("tr"),
                    a = {
                        tr: S.createElement("tbody"),
                        tbody: o,
                        thead: o,
                        tfoot: o,
                        td: r,
                        th: r,
                        "*": S.createElement("div")
                    },
                    s = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    c = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
                return c.test(e) && (n = w(S.createElement(RegExp.$1))), n || (e.replace && (e = e.replace(s, "<$1></$2>")), t === g && (t = O.test(e) && RegExp.$1), t in a || (t = "*"), i = a[t], i.innerHTML = "" + e, n = w.each(k.call(i.childNodes), function() {
                    i.removeChild(this)
                })), n
            }, M.Z = function(e, t) {
                return e = e || [], e.__proto__ = w.fn, e.selector = t || "", e
            }, M.isZ = function(e) {
                return e instanceof M.Z
            }, M.init = function(e, n) {
                var i;
                if (!e) return M.Z();
                if ("string" == typeof e)
                    if (e = e.trim(), "<" == e[0] && O.test(e)) i = M.fragment(e, RegExp.$1, n), e = null;
                    else {
                        if (n !== g) return w(n).find(e);
                        i = M.qsa(S, e)
                    }
                else {
                    if (t(e)) return w(S).ready(e);
                    if (M.isZ(e)) return e;
                    if (P(e)) i = s(e);
                    else if (o(e)) i = [e], e = null;
                    else if (O.test(e)) i = M.fragment(e.trim(), RegExp.$1, n), e = null;
                    else {
                        if (n !== g) return w(n).find(e);
                        i = M.qsa(S, e)
                    }
                }
                return M.Z(i, e)
            }, w = function(e, t) {
                return M.init(e, t)
            }, w.extend = function(e) {
                var t, n = function(e, t, i) {
                        for (m in t) i && (r(t[m]) || P(t[m])) ? (r(t[m]) && !r(e[m]) && (e[m] = {}), P(t[m]) && !P(e[m]) && (e[m] = []), n(e[m], t[m], i)) : t[m] !== g && (e[m] = t[m])
                    },
                    i = k.call(arguments, 1);
                return "boolean" == typeof e && (t = e, e = i.shift()), i.forEach(function(i) {
                    n(e, i, t)
                }), e
            }, M.qsa = function(e, t) {
                var n, o = "#" == t[0],
                    r = !o && "." == t[0],
                    a = o || r ? t.slice(1) : t,
                    s = /^[\w-]*$/.test(a);
                return i(e) && s && o ? (n = e.getElementById(a)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : k.call(s && !o ? r ? e.getElementsByClassName(a) : e.getElementsByTagName(t) : e.querySelectorAll(t))
            }, w.contains = function(e, t) {
                return e !== t && e.contains(t)
            }, w.type = e, w.isFunction = t, w.isWindow = n, w.isArray = P, w.isPlainObject = r, w.camelCase = T, w.trim = function(e) {
                return null == e ? "" : String.prototype.trim.call(e)
            }, w.uuid = 0, w.support = {}, w.expr = {}, w.map = function(e, t) {
                var n, i, o, r = [];
                if (a(e))
                    for (i = 0; i < e.length; i++) n = t(e[i], i), null != n && r.push(n);
                else
                    for (o in e) n = t(e[o], o), null != n && r.push(n);
                return c(r)
            }, w.each = function(e, t) {
                var n, i;
                if (a(e)) {
                    for (n = 0; n < e.length; n++)
                        if (t.call(e[n], n, e[n]) === !1) return e
                } else
                    for (i in e)
                        if (t.call(e[i], i, e[i]) === !1) return e; return e
            }, w.parseJSON = JSON.parse, w.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                N["[object " + t + "]"] = t.toLowerCase()
            }), w.fn = {
                forEach: C.forEach,
                reduce: C.reduce,
                push: C.push,
                sort: C.sort,
                indexOf: C.indexOf,
                concat: C.concat,
                map: function(e) {
                    return w(w.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return w(k.apply(this, arguments))
                },
                ready: function(e) {
                    var t = /complete|loaded|interactive/;
                    return t.test(S.readyState) ? e(w) : S.addEventListener("DOMContentLoaded", function() {
                        e(w)
                    }, !1), this
                },
                get: function(e) {
                    return e === g ? k.call(this) : this[e >= 0 ? e : e + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(e) {
                    return C.every.call(this, function(t, n) {
                        return e.call(t, n, t) !== !1
                    }), this
                },
                filter: function(e) {
                    return t(e) ? this.not(this.not(e)) : w(I.call(this, function(t) {
                        return M.matches(t, e)
                    }))
                },
                add: function(e, t) {
                    return w(b(this.concat(w(e, t))))
                },
                is: function(e) {
                    return this.length > 0 && M.matches(this[0], e)
                },
                not: function(e) {
                    var n = [];
                    if (t(e) && e.call !== g) this.each(function(t) {
                        e.call(this, t) || n.push(this)
                    });
                    else {
                        var i = "string" == typeof e ? this.filter(e) : a(e) && t(e.item) ? k.call(e) : w(e);
                        this.forEach(function(e) {
                            i.indexOf(e) < 0 && n.push(e)
                        })
                    }
                    return w(n)
                },
                has: function(e) {
                    return this.filter(function() {
                        return o(e) ? w.contains(this, e) : w(this).find(e).size()
                    })
                },
                eq: function(e) {
                    return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
                },
                first: function() {
                    var e = this[0];
                    return e && !o(e) ? e : w(e)
                },
                last: function() {
                    var e = this[this.length - 1];
                    return e && !o(e) ? e : w(e)
                },
                find: function(e) {
                    var t, n = this;
                    return t = "object" == typeof e ? w(e).filter(function() {
                        var e = this;
                        return C.some.call(n, function(t) {
                            return w.contains(t, e)
                        })
                    }) : 1 == this.length ? w(M.qsa(this[0], e)) : this.map(function() {
                        return M.qsa(this, e)
                    })
                },
                closest: function(e) {
                    return w(M.matches(this[0], e) ? this[0] : this.parents(e).get(0))
                },
                parents: function(e) {
                    for (var t = [], n = this; n.length > 0;) n = w.map(n, function(e) {
                        if ((e = e.parentNode) && !i(e) && t.indexOf(e) < 0) return t.push(e), e
                    });
                    return d(t, e)
                },
                parent: function(e) {
                    return d(b(this.pluck("parentNode")), e)
                },
                children: function(e) {
                    return d(this.map(function() {
                        return u(this)
                    }), e)
                },
                siblings: function(e) {
                    return d(this.map(function(e, t) {
                        return I.call(u(t.parentNode), function(e) {
                            return e !== t
                        })
                    }), e)
                },
                pluck: function(e) {
                    return w.map(this, function(t) {
                        return t[e]
                    })
                },
                show: function() {
                    var e = function(e) {
                        return getComputedStyle(e, "").getPropertyValue("display")
                    };
                    return this.each(function() {
                        if ("none" == this.style.display && (this.style.display = ""), "none" == e(this)) {
                            var t = function(t) {
                                var n, i;
                                return x[t] || (n = S.createElement(t), S.body.appendChild(n), i = e(n), n.parentNode.removeChild(n), "none" == i && (i = "block"), x[t] = i), x[t]
                            };
                            this.style.display = t(this.nodeName)
                        }
                    })
                },
                replaceWith: function(e) {
                    return this.before(e).remove()
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(e) {
                    return this.each(function() {
                        var t = w(this);
                        (e === g ? "none" == t.css("display") : e) ? t.show(): t.hide()
                    })
                },
                prev: function(e) {
                    return w(this.pluck("previousElementSibling")).filter(e || "*")
                },
                next: function(e) {
                    return w(this.pluck("nextElementSibling")).filter(e || "*")
                },
                html: function(e) {
                    return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
                        var n = this.innerHTML;
                        this.innerHTML = "", w(this).append(h(this, e, t, n))
                    })
                },
                text: function(e) {
                    return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                        this.textContent = e === g ? "" : "" + e
                    })
                },
                attr: function(e, t) {
                    var n;
                    return "string" == typeof e && t === g ? 0 == this.length || 1 !== this[0].nodeType ? g : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function(n) {
                        if (1 === this.nodeType)
                            if (o(e))
                                for (m in e) p(this, m, e[m]);
                            else p(this, e, h(this, t, n, this.getAttribute(e)))
                    })
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        1 === this.nodeType && p(this, e)
                    })
                },
                data: function(e, t) {
                    var n = /([A-Z])/g,
                        i = this.attr("data-" + e.replace(n, "-$1").toLowerCase(), t);
                    return null !== i ? v(i) : g
                },
                val: function(e) {
                    return 0 === arguments.length ? this[0] && (this[0].multiple ? w(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value) : this.each(function(t) {
                        this.value = h(this, e, t, this.value)
                    })
                },
                offset: function() {
                    if (0 == this.length) return null;
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + E.pageXOffset,
                        top: e.top + E.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(t, n) {
                    var i = function(e, t) {
                            var n = {
                                "column-count": 1,
                                columns: 1,
                                "font-weight": 1,
                                "line-height": 1,
                                opacity: 1,
                                "z-index": 1,
                                zoom: 1
                            };
                            return "number" != typeof t || n[o(e)] ? t : t + "px"
                        },
                        o = function(e) {
                            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
                        };
                    if (arguments.length < 2) {
                        var r = this[0],
                            a = getComputedStyle(r, "");
                        if (!r) return;
                        if ("string" == typeof t) return r.style[T(t)] || a.getPropertyValue(t);
                        if (P(t)) {
                            var s = {};
                            return w.each(P(t) ? t : [t], function(e, t) {
                                s[t] = r.style[T(t)] || a.getPropertyValue(t)
                            }), s
                        }
                    }
                    var c = "";
                    if ("string" == e(t)) n || 0 === n ? c = o(t) + ":" + i(t, n) : this.each(function() {
                        this.style.removeProperty(o(t))
                    });
                    else
                        for (m in t) t[m] || 0 === t[m] ? c += o(m) + ":" + i(m, t[m]) + ";" : this.each(function() {
                            this.style.removeProperty(o(m))
                        });
                    return this.each(function() {
                        this.style.cssText += ";" + c
                    })
                },
                index: function(e) {
                    return e ? this.indexOf(w(e)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(e) {
                    return !!e && C.some.call(this, function(e) {
                        return this.test(f(e))
                    }, l(e))
                },
                addClass: function(e) {
                    return e ? this.each(function(t) {
                        y = [];
                        var n = f(this),
                            i = h(this, e, t, n);
                        i.split(/\s+/g).forEach(function(e) {
                            w(this).hasClass(e) || y.push(e)
                        }, this), y.length && f(this, n + (n ? " " : "") + y.join(" "))
                    }) : this
                },
                removeClass: function(e) {
                    return this.each(function(t) {
                        return e === g ? f(this, "") : (y = f(this), h(this, e, t, y).split(/\s+/g).forEach(function(e) {
                            y = y.replace(l(e), " ")
                        }), void f(this, y.trim()))
                    })
                },
                toggleClass: function(e, t) {
                    return e ? this.each(function(n) {
                        var i = w(this),
                            o = h(this, e, n, f(this));
                        o.split(/\s+/g).forEach(function(e) {
                            (t === g ? !i.hasClass(e) : t) ? i.addClass(e): i.removeClass(e)
                        })
                    }) : this
                },
                scrollTop: function(e) {
                    if (this.length) {
                        var t = "scrollTop" in this[0];
                        return e === g ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function() {
                            this.scrollTop = e
                        } : function() {
                            this.scrollTo(this.scrollX, e)
                        })
                    }
                }
            }, w.fn.detach = w.fn.remove, ["width", "height"].forEach(function(e) {
                var t = e.replace(/./, function(e) {
                    return e[0].toUpperCase()
                });
                w.fn[e] = function(o) {
                    var r, a = this[0];
                    return o === g ? n(a) ? a["inner" + t] : i(a) ? a.documentElement["scroll" + t] : (r = this.offset()) && r[e] : this.each(function(t) {
                        a = w(this), a.css(e, h(this, o, t, a[e]()))
                    })
                }
            }), ["after", "prepend", "before", "append"].forEach(function(t, n) {
                var i = n % 2;
                w.fn[t] = function() {
                    var t, o, r = w.map(arguments, function(n) {
                            return t = e(n), "object" == t || "array" == t || null == n ? n : M.fragment(n)
                        }),
                        a = this.length > 1;
                    return r.length < 1 ? this : this.each(function(e, t) {
                        o = i ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null;
                        var s = function(e, t) {
                            t(e);
                            for (var n in e.childNodes) s(e.childNodes[n], t)
                        };
                        r.forEach(function(e) {
                            if (a) e = e.cloneNode(!0);
                            else if (!o) return w(e).remove();
                            s(o.insertBefore(e, t), function(e) {
                                null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || E.eval.call(E, e.innerHTML)
                            })
                        })
                    })
                }, w.fn[i ? t + "To" : "insert" + (n ? "Before" : "After")] = function(e) {
                    return w(e)[t](this), this
                }
            }), M.Z.prototype = w.fn, M.uniq = b, M.deserializeValue = v, w.zepto = w.yocto = M, w
        }();
        e.exports = n
    },
    function(e, t, n) {
        "use strict";

        function i(e) {
            return e._zid || (e._zid = f++)
        }

        function o(e, t, n, o) {
            if (t = r(t), t.ns) var s = a(t.ns);
            return (w[i(e)] || []).filter(function(e) {
                return e && (!t.e || e.e == t.e) && (!t.ns || s.test(e.ns)) && (!n || i(e.fn) === i(n)) && (!o || e.sel == o)
            })
        }

        function r(e) {
            var t = ("" + e).split(".");
            return {
                e: t[0],
                ns: t.slice(1).sort().join(" ")
            }
        }

        function a(e) {
            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
        }

        function s(e, t) {
            return e.del && ("focus" === e.e || "blur" === e.e) || !!t
        }

        function c(e, t, n, o, a, c, l) {
            var d = i(e),
                f = w[d] || (w[d] = []);
            t.split(/\s/).forEach(function(t) {
                if ("ready" == t) return p(document).ready(n);
                var i = r(t);
                i.fn = n, i.sel = a, i.del = c;
                var d = c || n;
                i.proxy = function(t) {
                    if (navigator.userAgent.toLowerCase().indexOf("android") > -1 && p.gestures && p.gestures.tap && "click" === i.e && !t.animaClick) return t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1;
                    if (t = u(t), !t.isImmediatePropagationStopped()) {
                        t.data = o;
                        var n = d.apply(e, t._args == h ? [t] : [t].concat(t._args));
                        return n === !1 && (t.preventDefault(), t.stopPropagation()), n
                    }
                }, i.i = f.length, f.push(i), "addEventListener" in e && (p.gestures && p.gestures.list && p.gestures.list[i.e] && p.gestures.list[i.e](e), e.addEventListener(i.e, i.proxy, s(i, l)))
            })
        }

        function l(e, t, n, r, a) {
            var c = i(e);
            (t || "").split(/\s/).forEach(function(t) {
                o(e, t, n, r).forEach(function(t) {
                    delete w[c][t.i], "removeEventListener" in e && e.removeEventListener(t.e, t.proxy, s(t, a))
                })
            })
        }

        function u(e, t) {
            return !t && e.isDefaultPrevented || (t || (t = e), p.each(k, function(n, i) {
                var o = t[n];
                e[n] = function() {
                    return this[i] = T, o && o.apply(t, arguments)
                }, e[i] = b
            }), (t.defaultPrevented !== h ? t.defaultPrevented : "returnValue" in t ? t.returnValue === !1 : t.getPreventDefault && t.getPreventDefault()) && (e.isDefaultPrevented = T)), e
        }

        function d(e) {
            var t, n = {
                originalEvent: e
            };
            for (t in e) C.test(t) || e[t] === h || (n[t] = e[t]);
            return u(n, e)
        }
        var h, p = n(1),
            f = 1,
            v = Array.prototype.slice,
            g = p.isFunction,
            m = function(e) {
                return "string" == typeof e
            },
            w = {},
            y = {};
        y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents", p.event = {
            add: c,
            remove: l
        }, p.proxy = function(e, t) {
            if (g(e)) {
                var n = function() {
                    return e.apply(t, arguments)
                };
                return n._zid = i(e), n
            }
            if (m(t)) return p.proxy(e[t], e);
            throw new TypeError("expected function")
        }, p.fn.one = function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        };
        var T = function() {
                return !0
            },
            b = function() {
                return !1
            },
            C = /^([A-Z]|returnValue$|layer[XY]$)/,
            k = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        p.fn.on = function(e, t, n, i, o) {
            var r, a, s = this;
            return e && !m(e) ? (p.each(e, function(e, i) {
                s.on(e, t, n, i, o)
            }), s) : (m(t) || g(i) || i === !1 || (i = n, n = t, t = h), (g(n) || n === !1) && (i = n, n = h), i === !1 && (i = b), s.each(function(s, u) {
                o && (r = function(e) {
                    return l(u, e.type, i), i.apply(this, arguments)
                }), t && (a = function(e) {
                    var n, o = p(e.target).closest(t, u).get(0);
                    if (o && o !== u) return n = p.extend(d(e), {
                        currentTarget: o,
                        liveFired: u
                    }), (r || i).apply(o, [n].concat(v.call(arguments, 1)))
                }), c(u, e, i, n, t, a || r)
            }))
        }, p.fn.off = function(e, t, n) {
            var i = this;
            return e && !m(e) ? (p.each(e, function(e, n) {
                i.off(e, t, n)
            }), i) : (m(t) || g(n) || n === !1 || (n = t, t = h), n === !1 && (n = b), i.each(function() {
                l(this, e, n, t)
            }))
        }, p.fn.trigger = function(e, t) {
            return e = m(e) || p.isPlainObject(e) ? p.Event(e) : u(e), e._args = t, this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(e) : p(this).triggerHandler(e, t)
            })
        }, p.fn.triggerHandler = function(e, t) {
            var n, i;
            return this.each(function(r, a) {
                n = d(m(e) ? p.Event(e) : e), n._args = t, n.target = a, p.each(o(a, e.type || e), function(e, t) {
                    if (i = t.proxy(n), n.isImmediatePropagationStopped()) return !1
                })
            }), i
        }, "focusin focusout load resize scroll unload click dblclick change select keydown keypress keyup error".split(" ").forEach(function(e) {
            p.fn[e] = function(t) {
                return t ? this.on(e, t) : this.trigger(e)
            }
        }), ["focus", "blur"].forEach(function(e) {
            p.fn[e] = function(t) {
                return t ? this.on(e, t) : this.each(function() {
                    try {
                        this[e]()
                    } catch (t) {}
                }), this
            }
        }), p.Event = function(e, t) {
            m(e) || (t = e, e = t.type);
            var n = document.createEvent(y[e] || "Events"),
                i = !0;
            if (t)
                for (var o in t) "bubbles" == o ? i = !!t[o] : n[o] = t[o];
            return n.initEvent(e, i, !0), u(n)
        }, e.exports = p
    },
    [182, 1, 2],
    function(e, t, n) {
        var i = n(23);
        n(27), e.exports = i
    },
    function(e, t, n) {
        "use strict";

        function i(e) {
            return null != e && e.nodeType == e.DOCUMENT_NODE
        }
        var o = n(1),
            r = {},
            a = /^(?:body|html)$/i;
        r.fn = {
            wrap: function(e) {
                var t = o.isFunction(e);
                if (this[0] && !t) var n = o(e).get(0),
                    i = n.parentNode || this.length > 1;
                return this.each(function(r) {
                    o(this).wrapAll(t ? e.call(this, r) : i ? n.cloneNode(!0) : n)
                })
            },
            wrapAll: function(e) {
                if (this[0]) {
                    o(this[0]).before(e = o(e));
                    for (var t;
                        (t = e.children()).length;) e = t.first();
                    o(e).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                var t = o.isFunction(e);
                return this.each(function(n) {
                    var i = o(this),
                        r = i.contents(),
                        a = t ? e.call(this, n) : e;
                    r.length ? r.wrapAll(a) : i.append(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    o(this).replaceWith(o(this).children())
                }), this
            },
            closest: function(e, t) {
                var n = this[0],
                    r = !1;
                for ("object" == typeof e && (r = o(e)); n && !(r ? r.indexOf(n) >= 0 : o.zepto.matches(n, e));) n = n !== t && !i(n) && n.parentNode;
                return o(n)
            },
            contents: function() {
                return this.map(function() {
                    return [].slice.call(this.childNodes)
                })
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            scrollLeft: function(e) {
                if (this.length) {
                    var t = "scrollLeft" in this[0];
                    return void 0 === e ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function() {
                        this.scrollLeft = e
                    } : function() {
                        this.scrollTo(e, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var e = this[0],
                        t = this.offsetParent(),
                        n = this.offset(),
                        i = a.test(t[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : t.offset();
                    return n.top -= parseFloat(o(e).css("margin-top")) || 0, n.left -= parseFloat(o(e).css("margin-left")) || 0, i.top += parseFloat(o(t[0]).css("border-top-width")) || 0, i.left += parseFloat(o(t[0]).css("border-left-width")) || 0, {
                        top: n.top - i.top,
                        left: n.left - i.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || document.body; e && !a.test(e.nodeName) && "static" == o(e).css("position");) e = e.offsetParent;
                    return e
                })
            }
        }, o.extend(o.fn, r.fn), ["width", "height"].forEach(function(e) {
            var t = e.replace(/./, function(e) {
                return e[0].toUpperCase()
            });
            o.fn["outer" + t] = function(t) {
                var n = this;
                if (n) {
                    var i = n[e](),
                        o = {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        };
                    return o[e].forEach(function(e) {
                        t && (i += parseInt(n.css("margin-" + e), 10))
                    }), i
                }
                return null
            }
        }), e.exports = o
    },
    [188, 8, 25],
    function(e, t, n) {
        "use strict";
        var i = n(1);
        n(2), n(8);
        var o = i.gestures,
            r = navigator.userAgent.toLowerCase().indexOf("android") > 0,
            a = /ip(ad|hone|od)/.test(navigator.userAgent.toLowerCase()),
            s = {
                trackingClick: !1,
                trackingClickStart: 0,
                targetElement: null,
                touchStartX: 0,
                touchStartY: 0,
                touchBoundary: 10,
                tapDelay: 200,
                sendClick: function(e, t) {
                    var n = i.Event("tap", {
                        animaTap: !0
                    });
                    i(e).trigger(n);
                    var o, r;
                    document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], o = document.createEvent("MouseEvents"), o.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), o.animaClick = !0, e.dispatchEvent(o)
                },
                needClick: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "button":
                        case "select":
                        case "textarea":
                            if (e.disabled) return !0;
                            break;
                        case "input":
                            if (a && "file" === e.type || e.disabled) return !0;
                            break;
                        case "label":
                        case "iframe":
                        case "video":
                            return !0
                    }
                    return !1
                },
                focus: function(e) {
                    var t;
                    a && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
                },
                needFocus: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "textarea":
                        case "select":
                            return !0;
                        case "input":
                            switch (e.type) {
                                case "button":
                                case "checkbox":
                                case "file":
                                case "image":
                                case "radio":
                                case "submit":
                                    return !1
                            }
                            return !e.disabled && !e.readOnly;
                        default:
                            return !1
                    }
                },
                updateScrollParent: function(e) {
                    var t, n;
                    if (t = e.yoctoTouchScrollParent, !t || !t.contains(e)) {
                        n = e;
                        do {
                            if (n.scrollHeight > n.offsetHeight) {
                                t = n, e.yoctoTouchScrollParent = n;
                                break
                            }
                            n = n.parentElement
                        } while (n)
                    }
                    t && (t.yoctoTouchLastScrollTop = t.scrollTop)
                },
                findControl: function(e) {
                    return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
                },
                touchHasMoved: function(e) {
                    var t = e.changedTouches[0],
                        n = s.touchBoundary;
                    return Math.abs(t.pageX - s.touchStartX) > n || Math.abs(t.pageY - s.touchStartY) > n
                },
                fixTarget: function(e) {
                    return window.SVGElementInstance && e instanceof SVGElementInstance && (e = e.correspondingUseElement), e
                }
            };
        o.tap = {
            events: ["tap", "click"],
            handler: {
                touchstart: function(e) {
                    var t, n, i;
                    if (e.targetTouches.length > 1) return !0;
                    if (t = s.fixTarget(e.target), n = e.targetTouches[0], a) {
                        if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
                        s.updateScrollParent(t)
                    }
                    return s.trackingClick = !0, s.trackingClickStart = e.timeStamp, s.targetElement = t, s.touchStartX = n.pageX, s.touchStartY = n.pageY, e.timeStamp - s.lastClickTime < s.tapDelay && e.preventDefault(), !0
                },
                touchmove: function(e) {
                    return !s.trackingClick || ((s.targetElement !== s.fixTarget(e.target) || s.touchHasMoved(e)) && (s.trackingClick = !1, s.targetElement = null), !0)
                },
                touchend: function(e) {
                    var t, n, i, o, c = s.targetElement;
                    if (!s.trackingClick) return !0;
                    if (e.timeStamp - s.lastClickTime < s.tapDelay) return s.cancelNextClick = !0, !0;
                    if (s.cancelNextClick = !1, s.lastClickTime = e.timeStamp, n = s.trackingClickStart, s.trackingClick = !1, s.trackingClickStart = 0, i = c.tagName.toLowerCase(), "label" === i) {
                        if (t = s.findControl(c)) {
                            if (s.focus(c), r) return !1;
                            c = t
                        }
                    } else if (s.needFocus(c)) return e.timeStamp - n > 100 || a && window.top !== window && "input" === i ? (s.targetElement = null, !1) : (s.focus(c), r && s.sendClick(c, e), !1);
                    return !(!a || (o = c.yoctoTouchScrollParent, !o || o.yoctoTouchLastScrollTop === o.scrollTop)) || (s.needClick(c) || (e.preventDefault(), s.sendClick(c, e)), !1)
                },
                touchcancel: function(e) {
                    s.trackingClick = !1, s.targetElement = null
                }
            }
        }, o.init("tap");
        var c = Event.prototype.initEvent;
        Event.prototype.initEvent = function() {
            var e = Array.prototype.slice.call(arguments);
            c.apply(this, e), "click" === e[0] && (this.animaClick = !0)
        }, e.exports = i
    },
    function(e, t, n) {
        var i = n(1);
        n(2), n(14), n(24), e.exports = i
    },
    function(e, t) {}, ,
    function(e, t, n) {
        var i = n(41);
        e.exports = i
    },
    function(e, t) {
        "use strict";
        e.exports = {
            env: {
                csmobileHost: "https://csmobile.alipay.com"
            },
            commonBi: {
                tp: {
                    knowledgeUseless: "knowledgeUseless",
                    knowledgelinkClick: "knowledgelinkClick"
                },
                en: {
                    knowledgeUseless: "WS_KNOWLEDGEUSELESS",
                    knowledgelinkClick: "WS_KNOWLEDGELINKCLICK"
                }
            },
            mypaBi: {
                tp: {
                    call95188InBack: "back",
                    call95188InKnowledge: "knowledge",
                    call95188InStrategy: "strategy",
                    text2speech: "text2speech",
                    speech2text: "speech2text",
                    voiceUsed: "voiceUsed",
                    connectClive: "connectToClive",
                    reConnectClive: "reConnectClive",
                    keepChat: "keepChat",
                    evaluationShow: "evaluationShow",
                    evaluationOpen: "evaluationOpen",
                    evaluationClose: "evaluationClose",
                    booCallClick: "booCallClick",
                    booCallNoNeed: "booCallNoNeed",
                    booCallBack: "booCallBack",
                    answerStatFail: "statFail",
                    answerOtherFail: "otherFail",
                    evaluateMaksInRobot: "evaluateMaksInRobot",
                    evaluateMaksInHuman: "evaluateMaksInHuman",
                    robotUseless: "robotUseless",
                    backToIndex: "backToIndex",
                    chooseTradeEmpty: "chooseTradeEmpty",
                    luckyMoneyActivity: "luckyMoneyActivity",
                    luckyMoneyShow: "luckyMoneyShow",
                    luckyMoneyJump: "luckyMoneyJump",
                    cardClick: "cardClick",
                    sessionClosed: "sessionClosed",
                    pulldownLoad: "pulldownLoad",
                    idCheck: "idCheck",
                    bannerClick4progress: "progress",
                    bannerClick4detail: "detail",
                    socialMsgReadQuery: "socialMsgReadQuery",
                    socialMsgReadUpdate: "socialMsgReadUpdate",
                    detailShare: "detailShare",
                    connectStatFail: "connectStatFail",
                    connectAjaxError: "connectAjaxError",
                    topBannerClick: "topBannerClick",
                    clearLs: "clearLs",
                    chkMypa: "chkMypa",
                    showMore: "robotAnswerShowMore"
                },
                en: {
                    call95188: "WS_MYPA_CALL95188",
                    text2speech: "WS_MYPA_TEXT2SPEECH",
                    speech2text: "WS_MYPA_SPEECH2TEXT",
                    voiceUsed: "WS_MYPA_VOICEUSED",
                    connectClive: "WS_MYPA_CONNECT_CLIVE",
                    reConnectClive: "WS_MYPA_RECONNECTCLIVE",
                    keepChat: "WS_MYPA_KEEPCHAT",
                    evaluationShow: "WS_MYPA_EVALUATIONSHOW",
                    evaluationPop: "WS_MYPA_EVALUATIONPOP",
                    booCallClick: "WS_MYPA_BOOCALLCLICK",
                    booCallNoNeed: "WS_MYPA_BOOCALLNONEED",
                    booCallBack: "WS_MYPA_BOOCALLBACK",
                    answerError: "WS_MYPA_ANSWERERROR",
                    evaluateMaksClick: "WS_MYPA_EVALUATEMASKCLICK",
                    robotUseless: "WS_MYPA_ROBOTUSELESS",
                    backToIndex: "WS_MYPA_EVALUATE_BACKTOINDEX",
                    chooseTradeEmpty: "WS_MYPA_CHOOSETRADEEMPTY",
                    luckyMoneyActivity: "WS_MYPA_LUCKYMONEYACTIVITY",
                    luckyMoneyShow: "WS_MYPA_LUCKYMONEYSHOW",
                    luckyMoneyJump: "WS_MYPA_LUCKYMONEYJUMP",
                    cardClick: "WS_MYPA_CARDCLICK",
                    sessionClosed: "WS_MYPA_SESSIONCLOSED_CLIVE",
                    pulldownLoad: "WS_MYPA_PULLDOWN",
                    idCheck: "WS_MYPA_CLIVE_IDCHECK",
                    bannerClick: "WS_MYPA_BANNER_CLICK",
                    socialMsgRead: "WS_MYPA_SOCIALMSGREAD",
                    detailShare: "WS_MYPA_DETAILSHARE",
                    connectCliveError: "WS_MYPA_CONNECTCLIVEERROR",
                    topBannerClick: "WS_MYPA_TOPBANNERCLICK",
                    clearLs: "WS_MYPA_CLEARERRORSTORAGE",
                    chkMypa: "WS_MYPA_CHECKMYPASTATUS",
                    showMore: "WS_MYPA_ROBOTANSWERSHOWMORE"
                }
            },
            koubeiBi: {
                tp: {
                    avatarClick: "ws_koubei_index",
                    iconClick: "ws_koubei_index",
                    listClick: "ws_koubei_index"
                },
                en: {
                    avatarClick: "WS_KOUBEI_AVATARCLICK",
                    iconClick: "WS_KOUBEI_ICONCLICK",
                    listClick: "WS_KOUBEI_LISTCLICK"
                }
            }
        }
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(5),
            r = n(32);
        e.exports = {
            $chatWrap: i("#chat-wrap"),
            themeAttr: function() {
                var e = {};
                try {
                    e = JSON.parse(window.CHATCONFIG.themeAttr)
                } catch (t) {
                    e = {
                        msgBubbleBgColor: "#A0E75A",
                        msgBubbleBorderColor: "#7CD053"
                    }
                }
                return e
            },
            clearSystemInfo: function() {
                var e = this.$chatWrap.find(".J-system-message-wrap");
                e && e.length && e.remove()
            },
            escape: function(e) {
                var t = e ? e.replace(/<|>|'|"|&/g, function(e) {
                    var t = e.charCodeAt(0),
                        n = ["&#"];
                    return t = 32 == t ? 160 : t, n.push(t), n.push(";"), n.join("")
                }) : "";
                return t
            },
            unEscape: function(e) {
                if (!e) return "";
                var t = document.createElement("div");
                return t.innerHTML = e, t.childNodes[0].nodeValue
            },
            addTarget: function(e) {
                var t, n = e.split(/#/),
                    e = n[0],
                    i = n[1] || "";
                return n = e.split(/\?/), e = n[0], t = n[1] || "", t += t ? "&target=_blank" : "target=_blank", t = "?" + t, i && (i = "#" + i), e + t + i
            },
            getClientInfo: function(e) {
                if (!e) return "";
                var t = e.device.name || "",
                    n = e.os.name || "",
                    i = e.browser.name || "",
                    o = e.browser.version || "",
                    r = t + "&" + n + "&" + i + "&" + o + "&" + window.CHATCONFIG.ipAdress;
                return r.substr(0, 100)
            },
            scrollToBottom: function(e) {
                var t = this;
                setTimeout(function() {
                    try {
                        t.scrollRefresh(e), e.scrollTo(e.getScrollHeight() + 120, !0)
                    } catch (n) {}
                }, 200)
            },
            buildMsgRecievedTime: function(e) {
                if (!e) return "";
                var t = new Date(e.replace(/\s+/g, "T").concat(".000+08:00")),
                    n = t.getMinutes() > 9 ? t.getMinutes() : "0" + t.getMinutes();
                return {
                    gmtCreate: t.getTime(),
                    displayTime: t.getHours() + ":" + n
                }
            },
            scrollToNext: function(e) {
                var t = this;
                setTimeout(function() {
                    try {
                        t.scrollRefresh(e), e.scrollTo(e.getScrollTop() + 60, !0)
                    } catch (n) {}
                }, 200)
            },
            userStyle: function(e) {
                e = e || {};
                var t = this.themeAttr();
                window.initData || {};
                return {
                    cardTitleBgColor: t.cardTitleBgColor,
                    msgBubbleBgColor: t.msgBubbleBgColor || "#A0E75A",
                    msgBubbleBorderColor: t.msgBubbleBorderColor || "#7CD053",
                    avatar: e.avatar || "https://zos.alipayobjects.com/rmsportal/zVBCcOVAtHFuRJJ.png"
                }
            },
            getStyleType: function(e, t, n) {
                t = t || [];
                var i = /<img\s+[^>]*src="([^"]*)"[^>]*>/,
                    o = /<script[^>]*?>.*?<\/script>/g,
                    r = /<script[^>]*?>.*?<\/script>/g,
                    a = /<[^>]*>|/g,
                    s = "robot";
                ("3" === n || t && t.length > 0 && !e) && (s = "list");
                var c = e.replace(o, "").replace(r, "").replace(a, "");
                return (c.length > 200 || i.test(e)) && (s = "article"), s
            },
            buildServiceReplyData: function(e, t, n) {
                t = t || {}, console.log("buildServiceReplyData", t), e = e || "robot";
                var i = t.answerContent,
                    r = "",
                    a = t.knowType,
                    s = "",
                    c = t.card,
                    l = t.knowledges || [],
                    u = this.getStyleType(i, l, t.displayType);
                return l = this.knowledgeChange(l), l.length && (s = "\u60a8\u662f\u60f3\u95ee\uff1f"), "article" === u && t.answerTitle && (r = t.answerTitle), a && "7" === a && (r = "", c = "card", window.cardAnswerContent = i, window.cardAnswerId = t.answerId || ""), {
                    messageType: "robot",
                    serviceAvatar: n.avatar || "https://os.alipayobjects.com/rmsportal/ueUSTNmLwcjDmfq.png",
                    rechatid: t.chatId || "",
                    styleType: u,
                    questionType: t.questionType,
                    answerTitle: o.unEscape(r),
                    answerContent: i,
                    similarHeader: s,
                    hasRefAnswer: t.hasRefAnswer,
                    similarQuestions: l,
                    libraryVersion: t.libraryVersion,
                    card: c
                }
            },
            knowledgeChange: function(e) {
                e = e || [];
                var t = e.length,
                    n = null;
                if (!t) return e;
                for (var i = 0; i < t; i++) n = e[i].title, n && (e[i].title = o.unEscape(n));
                return e
            },
            packUpkeyBoard: function(e) {
                var t = i("#iptBox").find("textarea");
                "YES" === t.attr("focusFlag") ? (window.SENDSTATUS = !1, t.blur(), e && o.isAndroid() ? setTimeout(function() {
                    e()
                }, 300) : e && e()) : e && e()
            },
            isLogin: function(e) {
                return e && "2088" !== e
            },
            scrollRefresh: function(e) {
                try {
                    e.refresh()
                } catch (t) {
                    console.log("scroll\u5bf9\u8c61\u4e0d\u5b58\u5728")
                }
            },
            parseCliveInfo: function(e) {
                try {
                    var t, n = e.replace(/(\n\t)/gi, ""),
                        i = e.match(/\[\u32a3TIME\]([\s\S]+)\[\/\u32a3TIME\]/),
                        o = n.replace(/\n/g, "<br/>"),
                        r = o.match(/\[\u32a3CONTENT\]([\s\S]+)\[\/\u32a3CONTENT\]/);
                    return console.log("parseCliveInfo", r), t = r ? r[1] : o, {
                        date: i,
                        content: t
                    }
                } catch (a) {
                    return console.log(a), {
                        date: [],
                        content: ""
                    }
                }
            },
            getCtoken: function() {
                return r.get("ctoken") || ""
            }
        }
    },
    function(e, t, n) {
        var i = n(33);
        e.exports = i
    },
    function(e, t) {
        function n(e, t) {
            var n = {};
            if (i(e) && e.length > 0)
                for (var o, r, s, l = t ? c : a, u = e.split(/;\s/g), d = 0, h = u.length; d < h; d++) {
                    if (s = u[d].match(/([^=]+)=/i), s instanceof Array) try {
                        o = c(s[1]), r = l(u[d].substring(s[1].length + 1))
                    } catch (p) {} else o = c(u[d]), r = "";
                    o && (n[o] = r)
                }
            return n
        }

        function i(e) {
            return "string" == typeof e
        }

        function o(e) {
            return i(e) && "" !== e
        }

        function r(e) {
            if (!o(e)) throw new TypeError("Cookie name must be a non-empty string")
        }

        function a(e) {
            return e
        }
        var s = t,
            c = decodeURIComponent,
            l = encodeURIComponent;
        s.get = function(e, t) {
            r(e), t = "function" == typeof t ? {
                converter: t
            } : t || {};
            var i = n(document.cookie, !t.raw);
            return (t.converter || a)(i[e])
        }, s.set = function(e, t, n) {
            r(e), n = n || {};
            var i = n.expires,
                a = n.domain,
                s = n.path;
            n.raw || (t = l(String(t)));
            var c = e + "=" + t,
                u = i;
            return "number" == typeof u && (u = new Date, u.setDate(u.getDate() + i)), u instanceof Date && (c += "; expires=" + u.toUTCString()), o(a) && (c += "; domain=" + a), o(s) && (c += "; path=" + s), n.secure && (c += "; secure"), document.cookie = c, c
        }, s.remove = function(e, t) {
            return t = t || {}, t.expires = new Date(0), this.set(e, "", t)
        }
    },
    function(e, t, n) {
        n(43)
    },
    function(e, t, n) {
        "use strict";

        function i(e, t, n, i, o, s) {
            var c = s || {};
            r.ajax({
                url: a.csmobileUrl(c[e] ? c[e] : e),
                type: o,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                cache: !1,
                data: r.extend({
                    _input_charset: "utf-8",
                    bizToken: window.CHATCONFIG.bizToken
                }, t || {}),
                success: function(e) {
                    e.data || {};
                    e && "ok" === e.stat ? n && n(e) : i && i(e)
                },
                error: function(e) {
                    i && i(e)
                }
            })
        }

        function o() {
            var e = c.os.name || "",
                t = c.browser.name || "",
                n = c.browser.version || "",
                i = a.getLocation(),
                o = c.app.is,
                r = c.app.name;
            r && (r = r.toLocaleLowerCase()), "afw" === r && "ios" === e && (o = !1);
            var s = "isApp=" + o + "&" + e + "&" + t + "&" + n + "&" + window.CHATCONFIG.ipAdress + "&" + i.province + "&" + i.city;
            return s.substr(0, 100)
        }
        var r = n(3),
            a = n(5),
            s = n(31),
            c = n(7),
            l = n(60),
            u = (n(72), {
                urls: {
                    syncSession: "/mypa/syncSession.json",
                    robotInit: "/mypa/chatInit.json",
                    getAnswer: "/mypa/getAnswer.json",
                    evaluate: "/mypa/evaluate.json",
                    checkCallback: "/mypa/checkCallback.json",
                    bookCallback: "/mypa/bookCallback.json",
                    loginValidate: "/validate.json",
                    getHistoryChat: "/mypa/getHistoryChat.json",
                    ctuSelfService: "/selfService.json",
                    humanAnswer: "/sendMessage.json",
                    connectPath: "/client/connectServer.json",
                    feedbackClive: "/client/feedBack.json",
                    fetchPath: "/fetchMessage.json",
                    cliveOffline: "/client/visitorOffline.json",
                    tempOffline: "/client/tempOffline.json",
                    robotOffline: "/mypa/offline.json",
                    loadWindow: "/loadWindow.json",
                    feedbackRate: "/client/feedBackQuery.json",
                    pushWindow: "/pushWindow.json",
                    keepAlive: "/keepAlive.json",
                    mypaOffEventUrl: "/pageOffEvent.json",
                    robotNeedEvaluate: "/mypa/chatLeave.json",
                    onlineChatAlive: "/mypa/onlineChatAlive.json",
                    actionByCode: "/actionByCode.json"
                },
                syncSession: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.syncSession),
                        type: "POST",
                        timeout: 2e3,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: r.extend(e, {
                            bizToken: window.CHATCONFIG.bizToken,
                            ctoken: s.getCtoken()
                        }),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                getHisChat: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.getHistoryChat),
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: e || {},
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                onlineChatAlive: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.onlineChatAlive),
                        type: "GET",
                        cache: !1,
                        timeout: 1e3,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: e || {},
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                robotNeedEvaluate: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.robotNeedEvaluate),
                        type: "GET",
                        cache: !1,
                        timeout: 1e3,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: e || {},
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                robotInit: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.robotInit),
                        type: "GET",
                        cache: !1,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: r.extend(e || {}, {
                            prodChannel: window.CHATCONFIG.prodChannel,
                            ctoken: s.getCtoken()
                        }),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                evaluateAnswer: function(e, t, n) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.evaluate),
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        data: e || {},
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                getRobotAnswer: function(e, t, n) {
                    var i = !1,
                        o = (new Date).getTime();
                    r.ajax({
                        url: a.csmobileUrl(this.urls.getAnswer),
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        timeout: 1e4,
                        data: r.extend({
                            bizToken: window.CHATCONFIG.bizToken,
                            prodChannel: window.CHATCONFIG.prodChannel
                        }, e || {}),
                        success: function(e) {
                            if (e && "ok" === e.stat) {
                                var i = e.data || {},
                                    r = i.digest || {};
                                r && 1 === r.sync, t && t(e)
                            } else {
                                var a = (new Date).getTime();
                                n && n("statFail", a - o)
                            }
                        },
                        error: function(e) {
                            var t = (new Date).getTime();
                            i || n && n(e, t - o), i = !0
                        }
                    })
                },
                checkLogin: function(e, t) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.loginValidate),
                        type: "GET",
                        cache: !1,
                        success: function(n) {
                            n && "ok" === n.stat ? e && e(n) : t && t(n)
                        },
                        error: function() {
                            t && t({})
                        }
                    })
                },
                ctuSelfServiceFn: function(e, t, n, i) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.ctuSelfService),
                        type: "POST",
                        data: e || {},
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        },
                        complete: function() {
                            i && i()
                        }
                    })
                },
                getHumanAnswer: function(e, t, n) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.humanAnswer),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            userId: window.CHATCONFIG.userId,
                            instanceId: window.CHATCONFIG.instanceId,
                            _input_charset: "utf-8",
                            uname: window.CHATCONFIG.userName,
                            src: "mypa",
                            utype: 1,
                            language: 1,
                            ctoken: s.getCtoken()
                        }, e || {}),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                connectServer: function(e, t, n) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.connectPath),
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "_callback",
                        cache: !1,
                        timeout: 3e4,
                        data: r.extend(e, {
                            clientInfo: o(),
                            ctoken: s.getCtoken(),
                            src: "mypa",
                            _input_charset: "utf-8"
                        }),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n(e, "connectStatFail")
                        },
                        error: function() {
                            n && n({
                                msg: "\u5ba2\u670d\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"
                            }, "connectAjaxError")
                        }
                    })
                },
                fetchMessage: function(e, t, n, i) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.fetchPath),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend(e, {
                            userId: window.CHATCONFIG.userId,
                            ctoken: s.getCtoken()
                        }),
                        success: function(e, i, o) {
                            e ? t && t(e) : n && n(e, i, status)
                        },
                        error: function(e, t) {
                            n && n(e, t)
                        },
                        complete: function(e, t) {
                            i && i(e, t)
                        }
                    })
                },
                keepAliveFn: function(e) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.keepAlive),
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "_callback",
                        data: r.extend({
                            userId: window.CHATCONFIG.userId,
                            instanceId: window.CHATCONFIG.instanceId,
                            ctoken: s.getCtoken()
                        }, e)
                    })
                },
                cliveOffline: function(e, t) {
                    var n = l.getReconnectSwitch() === !0 ? this.urls.tempOffline : this.urls.cliveOffline;
                    r.ajax({
                        url: a.cliveUrl(n),
                        type: "GET",
                        cache: !1,
                        dataType: "jsonp",
                        jsonp: "_callback",
                        data: {
                            userId: window.CHATCONFIG.userId,
                            instanceId: window.CHATCONFIG.instanceId,
                            _input_charset: "utf-8",
                            token: e,
                            sid: t,
                            ctoken: s.getCtoken()
                        }
                    })
                },
                loadWindow: function(e, t) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.loadWindow),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: {
                            windowCode: e,
                            instanceId: window.CHATCONFIG.instanceId,
                            ctoken: s.getCtoken(),
                            is_src: !0
                        },
                        success: function(e) {
                            e && "ok" === e.stat && t && t(e)
                        }
                    })
                },
                pushWindow: function(e, t) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.pushWindow),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            ctoken: s.getCtoken(),
                            stype: "2088" == window.USERID ? "ANONYMITY_VISITOR" : "COMMON_VISITOR",
                            _input_charset: "utf-8"
                        }, e || {}),
                        success: function(e) {
                            t && t()
                        },
                        error: function(e) {
                            t && t()
                        }
                    })
                },
                feedbackClive: function(e, t, n) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.feedbackClive),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            userId: window.CHATCONFIG.userId,
                            sid: e,
                            feedback: t,
                            feedbackNote: n,
                            ctoken: s.getCtoken()
                        })
                    })
                },
                feedbackRate: function(e, t) {
                    r.ajax({
                        url: a.cliveUrl(this.urls.feedbackRate),
                        type: "GET",
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: {
                            sid: e,
                            ctoken: s.getCtoken()
                        },
                        success: function(n) {
                            var i = n.value || {};
                            if (!i.feedBackExpired && !i.hasFeedBack) switch (t) {
                                case "satisfied":
                                    u.feedbackClive(e, "1", "satisfy");
                                    break;
                                case "unsatisfied":
                                    u.feedbackClive(e, "3", "unsatisfy")
                            }
                        }
                    })
                },
                robotOffline: function(e) {
                    r.ajax({
                        url: a.csmobileUrl(this.urls.robotOffline),
                        type: "POST",
                        timeout: 1e3,
                        data: {
                            robotId: e
                        }
                    })
                },
                pageOff: function() {
                    window.SESSIONID && r.ajax({
                        url: a.csmobileUrl(this.urls.mypaOffEventUrl),
                        type: "GET",
                        timeout: 1e3,
                        cache: !1,
                        data: {
                            sid: window.SESSIONID
                        }
                    })
                },
                sendGetRequest: function(e, t, n, o) {
                    i(e, t, n, o, "GET", this.urls)
                },
                sendPostRequest: function(e, t, n, o) {
                    i(e, t, n, o, "POST", this.urls)
                },
                atsPidLogin: function(e, t, n) {
                    r.ajax({
                        url: a.cschannelUrl(this.urls.actionByCode),
                        type: "GET",
                        timeout: 2e3,
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            scene: SCENE_CODE,
                            compCode: "MERCHANT_FORCE_LOGON",
                            contextId: SESSIONID,
                            sessionUUID: window.initData ? window.initData.robotId : ""
                        }, e || {}),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                checkPidLogin: function(e, t, n) {
                    r.ajax({
                        url: a.cschannelUrl(this.urls.actionByCode),
                        type: "GET",
                        timeout: 2e3,
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            scene: SCENE_CODE,
                            compCode: "MERCHANT_FORCE_LOGON,MERCHANT_QUEUING_NOTICE",
                            contextId: SESSIONID,
                            sessionUUID: window.initData ? window.initData.robotId : ""
                        }, e || {}),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n()
                        }
                    })
                },
                checkSkill: function(e, t, n) {
                    r.ajax({
                        url: a.cschannelUrl(this.urls.actionByCode),
                        type: "GET",
                        timeout: 2e3,
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            scene: SCENE_CODE,
                            compCode: "CLIVE_ENTRANCE_MERCHANT_TECH",
                            contextId: SESSIONID,
                            sessionUUID: window.initData ? window.initData.robotId : ""
                        }, e || {}),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function(e) {
                            n && n({
                                msg: "\u5ba2\u670d\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"
                            }, "connectAjaxError")
                        }
                    })
                },
                getSkillDigest: function(e, t, n) {
                    r.ajax({
                        url: a.cschannelUrl(this.urls.actionByCode),
                        type: "GET",
                        timeout: 2e3,
                        dataType: "jsonp",
                        cache: !1,
                        jsonp: "_callback",
                        data: r.extend({
                            scene: SCENE_CODE,
                            compCode: "DIRECT_CONNECT_CLIVE",
                            contextId: SESSIONID,
                            sessionUUID: window.initData ? window.initData.robotId : ""
                        }, e || {}),
                        success: function(e) {
                            e && "ok" === e.stat ? t && t(e) : n && n()
                        },
                        error: function() {
                            n && n({
                                msg: "\u5ba2\u670d\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"
                            }, "connectAjaxError")
                        }
                    })
                }
            });
        e.exports = u
    },
    8,
    function(e, t, n) {
        function i(e) {
            return "[object String]" === f.call(e)
        }

        function o(e) {
            if (!e || "[object Object]" !== f.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function r(e, t) {
            var n;
            for (n in t) t.hasOwnProperty(n) && (e[n] = a(t[n], e[n]));
            return e
        }

        function a(e, t) {
            return p.isArray(e) ? e = e.slice() : p.isPlainObject(e) && (p.isPlainObject(t) || (t = {}), e = r(t, e)), e
        }

        function s(e, t, n) {
            for (var i = [], r = t.constructor.prototype; r;) r.hasOwnProperty("attrs") || (r.attrs = {}), l(n, r.attrs, r), o(r.attrs) || i.unshift(r.attrs), r = r.constructor.superclass;
            for (var a = 0, s = i.length; a < s; a++) d(e, u(i[a]))
        }

        function c(e, t) {
            d(e, u(t, !0), !0)
        }

        function l(e, t, n, i) {
            for (var o = 0, r = e.length; o < r; o++) {
                var a = e[o];
                n.hasOwnProperty(a) && (t[a] = i ? t.get(a) : n[a])
            }
        }

        function u(e, t) {
            var n = {};
            for (var i in e) {
                var o = e[i];
                !t && p.isPlainObject(o) && o.hasOwnProperty("getter") ? n[i] = o : n[i] = {
                    value: o
                }
            }
            return n
        }

        function d(e, t, n) {
            var i, o, r;
            for (i in t)
                if (t.hasOwnProperty(i)) {
                    if (o = t[i], r = e[i], r || (r = e[i] = {}), void 0 !== o.value && (r.value = a(o.value, r.value)), n) continue;
                    void 0 !== o.getter && (r.getter = o.getter)
                }
            return e
        }

        function h(e, t) {
            return !p.isPlainObject(t) && !p.isArray(t) && e == t
        }
        var p = n(4);
        t.initAttrs = function(e) {
            var t = this.attrs = {},
                n = this.propsInAttrs || [];
            s(t, this, n), e && c(t, e), l(n, this, t, !0)
        }, t.get = function(e) {
            var t = this.attrs[e] || {},
                n = t.value;
            return t.getter ? t.getter.call(this, n, e) : n
        }, t.set = function(e, t, n) {
            var o = {};
            i(e) ? o[e] = t : (o = e, n = t), n || (n = {});
            var a = n.silent,
                s = n.override,
                c = this.attrs,
                l = this.__changedAttrs || (this.__changedAttrs = {});
            for (e in o)
                if (o.hasOwnProperty(e)) {
                    c[e] || (c[e] = {});
                    t = o[e];
                    var u = this.get(e);
                    !s && p.isPlainObject(u) && p.isPlainObject(t) && (t = r(r({}, u), t)), c[e].value = t, this.__initializingAttrs || h(u, t) || (a ? l[e] = [t, u] : this.trigger("change:" + e, t, u, e))
                }
            return this
        }, t.change = function() {
            var e = this.__changedAttrs;
            if (e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) {
                        var n = e[t];
                        this.trigger("change:" + t, n[0], n[1], t)
                    }
                delete this.__changedAttrs
            }
            return this
        }, t._isPlainObject = p.isPlainObject;
        var f = Object.prototype.toString;
        Object.prototype.hasOwnProperty, Object.keys
    },
    function(e, t, n) {
        function i(e, t) {
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var i = "_onChange" + o(n);
                    e[i] && e.on("change:" + n, e[i])
                }
        }

        function o(e) {
            return e.charAt(0).toUpperCase() + e.substring(1)
        }
        var r = n(39),
            a = n(40),
            s = n(37);
        e.exports = r.create({
            initialize: function(e) {
                this.initAttrs(e), i(this, this.attrs)
            },
            destroy: function() {
                this.off();
                for (var e in this) this.hasOwnProperty(e) && delete this[e];
                this.destroy = function() {}
            }
        }).implement([a, s])
    },
    function(e, t, n) {
        function i(e) {
            if (l.isFunction(e)) return o(e).implement({
                initialize: e
            })
        }

        function o(e) {
            return s(e, i), e.extend = a, e.implement = r, e
        }

        function r(e) {
            Array.isArray(e) || (e = [e]);
            for (var t, n = this.prototype; t = e.shift();) c(n, t.prototype || t);
            return this
        }

        function a(e) {
            var t = i.create(e);
            return s(t, this), c(t, this, ["extend", "implement", "superclass"]), t
        }

        function s(e, t) {
            var n = e.prototype,
                i = Object.create(t.prototype);
            c(i, n), i.constructor = e, e.prototype = i, e.superclass = t.prototype
        }

        function c(e, t, n) {
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    if (n && n.indexOf(i) !== -1) continue;
                    e[i] = t[i]
                }
        }
        var l = n(4);
        i.create = function(e) {
            function t() {
                this.constructor === t && this.initialize && this.initialize.apply(this, arguments)
            }
            return e || (e = {}), o(t), t.implement(e), t
        }, e.exports = i
    },
    function(e, t) {
        function n() {}

        function i(e, t, n) {
            var i = !0;
            if (e) {
                var o = 0,
                    r = e.length,
                    a = t[0],
                    s = t[1],
                    c = t[2];
                switch (t.length) {
                    case 0:
                        for (; o < r; o += 2) i = e[o].call(e[o + 1] || n) !== !1 && i;
                        break;
                    case 1:
                        for (; o < r; o += 2) i = e[o].call(e[o + 1] || n, a) !== !1 && i;
                        break;
                    case 2:
                        for (; o < r; o += 2) i = e[o].call(e[o + 1] || n, a, s) !== !1 && i;
                        break;
                    case 3:
                        for (; o < r; o += 2) i = e[o].call(e[o + 1] || n, a, s, c) !== !1 && i;
                        break;
                    default:
                        for (; o < r; o += 2) i = e[o].apply(e[o + 1] || n, t) !== !1 && i
                }
            }
            return i
        }
        var o = /\s+/;
        n.prototype.on = function(e, t, n) {
            var i, r, a;
            if (!t) return this;
            for (i = this.__events || (this.__events = {}), e = e.split(o); r = e.shift();) a = i[r] || (i[r] = []), a.push(t, n);
            return this
        }, n.prototype.off = function(e, t, n) {
            var i, r, a, s;
            if (!(i = this.__events)) return this;
            if (!(e || t || n)) return delete this.__events, this;
            for (e = e ? e.split(o) : Object.keys(i); r = e.shift();)
                if (a = i[r])
                    if (t || n)
                        for (s = a.length - 2; s >= 0; s -= 2) t && a[s] !== t || n && a[s + 1] !== n || a.splice(s, 2);
                    else delete i[r];
            return this
        }, n.prototype.trigger = function(e) {
            var t, n, r, a, s, c, l = [],
                u = !0;
            if (!(t = this.__events)) return this;
            for (e = e.split(o), s = 1, c = arguments.length; s < c; s++) l[s - 1] = arguments[s];
            for (; n = e.shift();)(r = t.all) && (r = r.slice()), (a = t[n]) && (a = a.slice()), "all" !== n && (u = i(a, l, this) && u), u = i(r, [n].concat(l), this) && u;
            return u
        }, n.prototype.emit = n.prototype.trigger, e.exports = n
    },
    function(e, t, n) {
        function i() {
            return "widget-" + p++
        }

        function o(e) {
            return !!(16 & document.documentElement.compareDocumentPosition(e))
        }

        function r(e) {
            return e.charAt(0).toUpperCase() + e.substring(1)
        }

        function a(e) {
            return null == e || void 0 === e
        }
        var s = n(38),
            c = n(4),
            l = "_onRender",
            u = "data-widget-cid",
            d = {},
            h = s.extend({
                propsInAttrs: ["initElement", "element"],
                element: null,
                attrs: {
                    id: null,
                    className: null,
                    style: null,
                    template: "<div></div>",
                    parentNode: document.body
                },
                initialize: function(e) {
                    this.cid = i(), h.superclass.initialize.call(this, e), this.parseElement(), this.initProps(), this.setup(), this._stamp(), this._isTemplate = !(e && e.element)
                },
                parseElement: function() {
                    var e = this.element;
                    if (e ? this.element = c(e) : this.get("template") && (this.element = c(this.get("template"))), !this.element || !this.element[0]) throw new Error("element is invalid")
                },
                initProps: function() {},
                setup: function() {},
                render: function() {
                    this.rendered || (this._renderAndBindAttrs(), this.rendered = !0);
                    var e = this.get("parentNode");
                    if (e && !o(this.element[0])) {
                        var t = this.constructor.outerBoxClass;
                        if (t) {
                            var n = this._outerBox = c("<div></div>").addClass(t);
                            n.append(this.element).appendTo(e)
                        } else this.element.appendTo(e)
                    }
                    return this
                },
                _renderAndBindAttrs: function() {
                    var e = this,
                        t = e.attrs;
                    for (var n in t)
                        if (t.hasOwnProperty(n)) {
                            var i = l + r(n);
                            if (this[i]) {
                                var o = this.get(n);
                                a(o) || this[i](o, void 0, n),
                                    function(t) {
                                        e.on("change:" + n, function(n, i, o) {
                                            e[t](n, i, o)
                                        })
                                    }(i)
                            }
                        }
                },
                _onRenderId: function(e) {
                    this.element.attr("id", e)
                },
                _onRenderClassName: function(e) {
                    this.element.addClass(e)
                },
                _onRenderStyle: function(e) {
                    this.element.css(e)
                },
                _stamp: function() {
                    var e = this.cid;
                    (this.initElement || this.element).attr(u, e), d[e] = this
                },
                $: function(e) {
                    return this.element.find(e)
                },
                destroy: function() {
                    delete d[this.cid], this.element && this._isTemplate && (this.element.off(), this._outerBox ? this._outerBox.remove() : this.element.remove()), this.element = null, h.superclass.destroy.call(this)
                }
            });
        e.exports = h;
        var p = (Object.prototype.toString, 0)
    },
    function(e, t) {
        var n = function() {
            function e(e) {
                return null == e ? String(e) : N[_.call(e)] || "object"
            }

            function t(t) {
                return "function" == e(t)
            }

            function n(e) {
                return null != e && e == e.window
            }

            function i(e) {
                return null != e && e.nodeType == e.DOCUMENT_NODE
            }

            function o(t) {
                return "object" == e(t)
            }

            function r(e) {
                return o(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
            }

            function a(e) {
                return "number" == typeof e.length
            }

            function s(e) {
                return I.call(e, function(e) {
                    return null != e
                })
            }

            function c(e) {
                return e.length > 0 ? w.fn.concat.apply([], e) : e
            }

            function l(e) {
                return e in A ? A[e] : A[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
            }

            function u(e) {
                return "children" in e ? k.call(e.children) : w.map(e.childNodes, function(e) {
                    if (1 == e.nodeType) return e
                })
            }

            function d(e, t) {
                return null == t ? w(e) : w(e).filter(t)
            }

            function h(e, n, i, o) {
                return t(n) ? n.call(e, i, o) : n
            }

            function p(e, t, n) {
                null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
            }

            function f(e, t) {
                var n = e.className,
                    i = n && n.baseVal !== g;
                return t === g ? i ? n.baseVal : n : void(i ? n.baseVal = t : e.className = t)
            }

            function v(e) {
                var t;
                try {
                    return e ? "true" == e || "false" != e && ("null" == e ? null : /^0/.test(e) || isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? w.parseJSON(e) : e : t) : e
                } catch (n) {
                    return e
                }
            }
            var g, m, w, y, T, b, C = [],
                k = C.slice,
                I = C.filter,
                E = window,
                S = E.document,
                x = {},
                A = {},
                O = /^\s*<(\w+|!)[^>]*>/,
                N = {},
                _ = N.toString,
                M = yocto = {},
                P = Array.isArray;
            return M.matches = function(e, t) {
                    var n = S.createElement("div");
                    if (!t || !e || 1 !== e.nodeType) return !1;
                    var i = e.webkitMatchesSelector || e.matchesSelector;
                    if (i) return i.call(e, t);
                    var o, r = e.parentNode,
                        a = !r;
                    return a && (r = n).appendChild(e), o = ~M.qsa(r, t).indexOf(e), a && n.removeChild(e), o
                }, T = function(e) {
                    return e.replace(/-+(.)?/g, function(e, t) {
                        return t ? t.toUpperCase() : ""
                    })
                }, b = function(e) {
                    return I.call(e, function(t, n) {
                        return e.indexOf(t) == n
                    })
                }, M.fragment = function(e, t) {
                    var n, i, o = S.createElement("table"),
                        r = S.createElement("tr"),
                        a = {
                            tr: S.createElement("tbody"),
                            tbody: o,
                            thead: o,
                            tfoot: o,
                            td: r,
                            th: r,
                            "*": S.createElement("div")
                        },
                        s = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                        c = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
                    return c.test(e) && (n = w(S.createElement(RegExp.$1))), n || (e.replace && (e = e.replace(s, "<$1></$2>")), t === g && (t = O.test(e) && RegExp.$1), t in a || (t = "*"), i = a[t], i.innerHTML = "" + e, n = w.each(k.call(i.childNodes), function() {
                        i.removeChild(this)
                    })), n
                }, M.Z = function(e, t) {
                    return e = e || [], e.__proto__ = w.fn, e.selector = t || "", e
                }, M.isZ = function(e) {
                    return e instanceof M.Z
                }, M.init = function(e, n) {
                    var i;
                    if (!e) return M.Z();
                    if ("string" == typeof e)
                        if (e = e.trim(), "<" == e[0] && O.test(e)) i = M.fragment(e, RegExp.$1, n), e = null;
                        else {
                            if (n !== g) return w(n).find(e);
                            i = M.qsa(S, e)
                        }
                    else {
                        if (t(e)) return w(S).ready(e);
                        if (M.isZ(e)) return e;
                        if (P(e)) i = s(e);
                        else if (o(e)) i = [e], e = null;
                        else if (O.test(e)) i = M.fragment(e.trim(), RegExp.$1, n), e = null;
                        else {
                            if (n !== g) return w(n).find(e);
                            i = M.qsa(S, e)
                        }
                    }
                    return M.Z(i, e)
                }, w = function(e, t) {
                    return M.init(e, t)
                }, w.extend = function(e) {
                    var t, n = function(e, t, i) {
                            for (m in t) i && (r(t[m]) || P(t[m])) ? (r(t[m]) && !r(e[m]) && (e[m] = {}), P(t[m]) && !P(e[m]) && (e[m] = []), n(e[m], t[m], i)) : t[m] !== g && (e[m] = t[m])
                        },
                        i = k.call(arguments, 1);
                    return "boolean" == typeof e && (t = e, e = i.shift()), i.forEach(function(i) {
                        n(e, i, t)
                    }), e
                }, M.qsa = function(e, t) {
                    var n, o = "#" == t[0],
                        r = !o && "." == t[0],
                        a = o || r ? t.slice(1) : t,
                        s = /^[\w-]*$/.test(a);
                    return i(e) && s && o ? (n = e.getElementById(a)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : k.call(s && !o ? r ? e.getElementsByClassName(a) : e.getElementsByTagName(t) : e.querySelectorAll(t))
                }, w.contains = function(e, t) {
                    return e !== t && e.contains(t)
                }, w.type = e, w.isFunction = t, w.isWindow = n,
                w.isArray = P, w.isPlainObject = r, w.camelCase = T, w.trim = function(e) {
                    return null == e ? "" : String.prototype.trim.call(e)
                }, w.uuid = 0, w.support = {}, w.expr = {}, w.map = function(e, t) {
                    var n, i, o, r = [];
                    if (a(e))
                        for (i = 0; i < e.length; i++) n = t(e[i], i), null != n && r.push(n);
                    else
                        for (o in e) n = t(e[o], o), null != n && r.push(n);
                    return c(r)
                }, w.each = function(e, t) {
                    var n, i;
                    if (a(e)) {
                        for (n = 0; n < e.length; n++)
                            if (t.call(e[n], n, e[n]) === !1) return e
                    } else
                        for (i in e)
                            if (t.call(e[i], i, e[i]) === !1) return e; return e
                }, w.parseJSON = JSON.parse, w.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                    N["[object " + t + "]"] = t.toLowerCase()
                }), w.fn = {
                    forEach: C.forEach,
                    reduce: C.reduce,
                    push: C.push,
                    sort: C.sort,
                    indexOf: C.indexOf,
                    concat: C.concat,
                    map: function(e) {
                        return w(w.map(this, function(t, n) {
                            return e.call(t, n, t)
                        }))
                    },
                    slice: function() {
                        return w(k.apply(this, arguments))
                    },
                    ready: function(e) {
                        var t = /complete|loaded|interactive/;
                        return t.test(S.readyState) ? e(w) : S.addEventListener("DOMContentLoaded", function() {
                            e(w)
                        }, !1), this
                    },
                    get: function(e) {
                        return e === g ? k.call(this) : this[e >= 0 ? e : e + this.length]
                    },
                    toArray: function() {
                        return this.get()
                    },
                    size: function() {
                        return this.length
                    },
                    remove: function() {
                        return this.each(function() {
                            null != this.parentNode && this.parentNode.removeChild(this)
                        })
                    },
                    each: function(e) {
                        return C.every.call(this, function(t, n) {
                            return e.call(t, n, t) !== !1
                        }), this
                    },
                    filter: function(e) {
                        return t(e) ? this.not(this.not(e)) : w(I.call(this, function(t) {
                            return M.matches(t, e)
                        }))
                    },
                    add: function(e, t) {
                        return w(b(this.concat(w(e, t))))
                    },
                    is: function(e) {
                        return this.length > 0 && M.matches(this[0], e)
                    },
                    not: function(e) {
                        var n = [];
                        if (t(e) && e.call !== g) this.each(function(t) {
                            e.call(this, t) || n.push(this)
                        });
                        else {
                            var i = "string" == typeof e ? this.filter(e) : a(e) && t(e.item) ? k.call(e) : w(e);
                            this.forEach(function(e) {
                                i.indexOf(e) < 0 && n.push(e)
                            })
                        }
                        return w(n)
                    },
                    has: function(e) {
                        return this.filter(function() {
                            return o(e) ? w.contains(this, e) : w(this).find(e).size()
                        })
                    },
                    eq: function(e) {
                        return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
                    },
                    first: function() {
                        var e = this[0];
                        return e && !o(e) ? e : w(e)
                    },
                    last: function() {
                        var e = this[this.length - 1];
                        return e && !o(e) ? e : w(e)
                    },
                    find: function(e) {
                        var t, n = this;
                        return t = "object" == typeof e ? w(e).filter(function() {
                            var e = this;
                            return C.some.call(n, function(t) {
                                return w.contains(t, e)
                            })
                        }) : 1 == this.length ? w(M.qsa(this[0], e)) : this.map(function() {
                            return M.qsa(this, e)
                        })
                    },
                    closest: function(e) {
                        return w(M.matches(this[0], e) ? this[0] : this.parents(e).get(0))
                    },
                    parents: function(e) {
                        for (var t = [], n = this; n.length > 0;) n = w.map(n, function(e) {
                            if ((e = e.parentNode) && !i(e) && t.indexOf(e) < 0) return t.push(e), e
                        });
                        return d(t, e)
                    },
                    parent: function(e) {
                        return d(b(this.pluck("parentNode")), e)
                    },
                    children: function(e) {
                        return d(this.map(function() {
                            return u(this)
                        }), e)
                    },
                    siblings: function(e) {
                        return d(this.map(function(e, t) {
                            return I.call(u(t.parentNode), function(e) {
                                return e !== t
                            })
                        }), e)
                    },
                    pluck: function(e) {
                        return w.map(this, function(t) {
                            return t[e]
                        })
                    },
                    show: function() {
                        var e = function(e) {
                            return getComputedStyle(e, "").getPropertyValue("display")
                        };
                        return this.each(function() {
                            if ("none" == this.style.display && (this.style.display = ""), "none" == e(this)) {
                                var t = function(t) {
                                    var n, i;
                                    return x[t] || (n = S.createElement(t), S.body.appendChild(n), i = e(n), n.parentNode.removeChild(n), "none" == i && (i = "block"), x[t] = i), x[t]
                                };
                                this.style.display = t(this.nodeName)
                            }
                        })
                    },
                    replaceWith: function(e) {
                        return this.before(e).remove()
                    },
                    clone: function() {
                        return this.map(function() {
                            return this.cloneNode(!0)
                        })
                    },
                    hide: function() {
                        return this.css("display", "none")
                    },
                    toggle: function(e) {
                        return this.each(function() {
                            var t = w(this);
                            (e === g ? "none" == t.css("display") : e) ? t.show(): t.hide()
                        })
                    },
                    prev: function(e) {
                        return w(this.pluck("previousElementSibling")).filter(e || "*")
                    },
                    next: function(e) {
                        return w(this.pluck("nextElementSibling")).filter(e || "*")
                    },
                    html: function(e) {
                        return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
                            var n = this.innerHTML;
                            this.innerHTML = "", w(this).append(h(this, e, t, n))
                        })
                    },
                    text: function(e) {
                        return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                            this.textContent = e === g ? "" : "" + e
                        })
                    },
                    attr: function(e, t) {
                        var n;
                        return "string" == typeof e && t === g ? 0 == this.length || 1 !== this[0].nodeType ? g : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function(n) {
                            if (1 === this.nodeType)
                                if (o(e))
                                    for (m in e) p(this, m, e[m]);
                                else p(this, e, h(this, t, n, this.getAttribute(e)))
                        })
                    },
                    removeAttr: function(e) {
                        return this.each(function() {
                            1 === this.nodeType && p(this, e)
                        })
                    },
                    data: function(e, t) {
                        var n = /([A-Z])/g,
                            i = this.attr("data-" + e.replace(n, "-$1").toLowerCase(), t);
                        return null !== i ? v(i) : g
                    },
                    val: function(e) {
                        return 0 === arguments.length ? this[0] && (this[0].multiple ? w(this[0]).find("option").filter(function() {
                            return this.selected
                        }).pluck("value") : this[0].value) : this.each(function(t) {
                            this.value = h(this, e, t, this.value)
                        })
                    },
                    offset: function() {
                        if (0 == this.length) return null;
                        var e = this[0].getBoundingClientRect();
                        return {
                            left: e.left + E.pageXOffset,
                            top: e.top + E.pageYOffset,
                            width: Math.round(e.width),
                            height: Math.round(e.height)
                        }
                    },
                    css: function(t, n) {
                        var i = function(e, t) {
                                var n = {
                                    "column-count": 1,
                                    columns: 1,
                                    "font-weight": 1,
                                    "line-height": 1,
                                    opacity: 1,
                                    "z-index": 1,
                                    zoom: 1
                                };
                                return "number" != typeof t || n[o(e)] ? t : t + "px"
                            },
                            o = function(e) {
                                return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
                            };
                        if (arguments.length < 2) {
                            var r = this[0],
                                a = getComputedStyle(r, "");
                            if (!r) return;
                            if ("string" == typeof t) return r.style[T(t)] || a.getPropertyValue(t);
                            if (P(t)) {
                                var s = {};
                                return w.each(P(t) ? t : [t], function(e, t) {
                                    s[t] = r.style[T(t)] || a.getPropertyValue(t)
                                }), s
                            }
                        }
                        var c = "";
                        if ("string" == e(t)) n || 0 === n ? c = o(t) + ":" + i(t, n) : this.each(function() {
                            this.style.removeProperty(o(t))
                        });
                        else
                            for (m in t) t[m] || 0 === t[m] ? c += o(m) + ":" + i(m, t[m]) + ";" : this.each(function() {
                                this.style.removeProperty(o(m))
                            });
                        return this.each(function() {
                            this.style.cssText += ";" + c
                        })
                    },
                    index: function(e) {
                        return e ? this.indexOf(w(e)[0]) : this.parent().children().indexOf(this[0])
                    },
                    hasClass: function(e) {
                        return !!e && C.some.call(this, function(e) {
                            return this.test(f(e))
                        }, l(e))
                    },
                    addClass: function(e) {
                        return e ? this.each(function(t) {
                            y = [];
                            var n = f(this),
                                i = h(this, e, t, n);
                            i.split(/\s+/g).forEach(function(e) {
                                w(this).hasClass(e) || y.push(e)
                            }, this), y.length && f(this, n + (n ? " " : "") + y.join(" "))
                        }) : this
                    },
                    removeClass: function(e) {
                        return this.each(function(t) {
                            return e === g ? f(this, "") : (y = f(this), h(this, e, t, y).split(/\s+/g).forEach(function(e) {
                                y = y.replace(l(e), " ")
                            }), void f(this, y.trim()))
                        })
                    },
                    toggleClass: function(e, t) {
                        return e ? this.each(function(n) {
                            var i = w(this),
                                o = h(this, e, n, f(this));
                            o.split(/\s+/g).forEach(function(e) {
                                (t === g ? !i.hasClass(e) : t) ? i.addClass(e): i.removeClass(e)
                            })
                        }) : this
                    },
                    scrollTop: function(e) {
                        if (this.length) {
                            var t = "scrollTop" in this[0];
                            return e === g ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function() {
                                this.scrollTop = e
                            } : function() {
                                this.scrollTo(this.scrollX, e)
                            })
                        }
                    }
                }, w.fn.detach = w.fn.remove, ["width", "height"].forEach(function(e) {
                    var t = e.replace(/./, function(e) {
                        return e[0].toUpperCase()
                    });
                    w.fn[e] = function(o) {
                        var r, a = this[0];
                        return o === g ? n(a) ? a["inner" + t] : i(a) ? a.documentElement["scroll" + t] : (r = this.offset()) && r[e] : this.each(function(t) {
                            a = w(this), a.css(e, h(this, o, t, a[e]()))
                        })
                    }
                }), ["after", "prepend", "before", "append"].forEach(function(t, n) {
                    var i = n % 2;
                    w.fn[t] = function() {
                        var t, o, r = w.map(arguments, function(n) {
                                return t = e(n), "object" == t || "array" == t || null == n ? n : M.fragment(n)
                            }),
                            a = this.length > 1;
                        return r.length < 1 ? this : this.each(function(e, t) {
                            o = i ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null;
                            var s = function(e, t) {
                                t(e);
                                for (var n in e.childNodes) s(e.childNodes[n], t)
                            };
                            r.forEach(function(e) {
                                if (a) e = e.cloneNode(!0);
                                else if (!o) return w(e).remove();
                                s(o.insertBefore(e, t), function(e) {
                                    null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || E.eval.call(E, e.innerHTML)
                                })
                            })
                        })
                    }, w.fn[i ? t + "To" : "insert" + (n ? "Before" : "After")] = function(e) {
                        return w(e)[t](this), this
                    }
                }), M.Z.prototype = w.fn, M.uniq = b, M.deserializeValue = v, w.zepto = w.yocto = M, w
        }();
        e.exports = n
    },
    function(e, t, n) {
        function i(e) {
            return e._zid || (e._zid = f++)
        }

        function o(e, t, n, o) {
            if (t = r(t), t.ns) var s = a(t.ns);
            return (w[i(e)] || []).filter(function(e) {
                return e && (!t.e || e.e == t.e) && (!t.ns || s.test(e.ns)) && (!n || i(e.fn) === i(n)) && (!o || e.sel == o)
            })
        }

        function r(e) {
            var t = ("" + e).split(".");
            return {
                e: t[0],
                ns: t.slice(1).sort().join(" ")
            }
        }

        function a(e) {
            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
        }

        function s(e, t) {
            return e.del && ("focus" === e.e || "blur" === e.e) || !!t
        }

        function c(e, t, n, o, a, c, l) {
            var d = i(e),
                f = w[d] || (w[d] = []);
            t.split(/\s/).forEach(function(t) {
                if ("ready" == t) return p(document).ready(n);
                var i = r(t);
                i.fn = n, i.sel = a, i.del = c;
                var d = c || n;
                i.proxy = function(t) {
                    if (navigator.userAgent.toLowerCase().indexOf("android") > -1 && p.gestures && p.gestures.tap && "click" === i.e && !t.animaClick) return t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1;
                    if (t = u(t), !t.isImmediatePropagationStopped()) {
                        t.data = o;
                        var n = d.apply(e, t._args == h ? [t] : [t].concat(t._args));
                        return n === !1 && (t.preventDefault(), t.stopPropagation()), n
                    }
                }, i.i = f.length, f.push(i), "addEventListener" in e && (p.gestures && p.gestures.list && p.gestures.list[i.e] && p.gestures.list[i.e](e), e.addEventListener(i.e, i.proxy, s(i, l)))
            })
        }

        function l(e, t, n, r, a) {
            var c = i(e);
            (t || "").split(/\s/).forEach(function(t) {
                o(e, t, n, r).forEach(function(t) {
                    delete w[c][t.i], "removeEventListener" in e && e.removeEventListener(t.e, t.proxy, s(t, a))
                })
            })
        }

        function u(e, t) {
            return !t && e.isDefaultPrevented || (t || (t = e), p.each(k, function(n, i) {
                var o = t[n];
                e[n] = function() {
                    return this[i] = T, o && o.apply(t, arguments)
                }, e[i] = b
            }), (t.defaultPrevented !== h ? t.defaultPrevented : "returnValue" in t ? t.returnValue === !1 : t.getPreventDefault && t.getPreventDefault()) && (e.isDefaultPrevented = T)), e
        }

        function d(e) {
            var t, n = {
                originalEvent: e
            };
            for (t in e) C.test(t) || e[t] === h || (n[t] = e[t]);
            return u(n, e)
        }
        var h, p = n(18),
            f = 1,
            v = Array.prototype.slice,
            g = p.isFunction,
            m = function(e) {
                return "string" == typeof e
            },
            w = {},
            y = {};
        y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents", p.event = {
            add: c,
            remove: l
        }, p.proxy = function(e, t) {
            if (g(e)) {
                var n = function() {
                    return e.apply(t, arguments)
                };
                return n._zid = i(e), n
            }
            if (m(t)) return p.proxy(e[t], e);
            throw new TypeError("expected function")
        }, p.fn.one = function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        };
        var T = function() {
                return !0
            },
            b = function() {
                return !1
            },
            C = /^([A-Z]|returnValue$|layer[XY]$)/,
            k = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        p.fn.on = function(e, t, n, i, o) {
            var r, a, s = this;
            return e && !m(e) ? (p.each(e, function(e, i) {
                s.on(e, t, n, i, o)
            }), s) : (m(t) || g(i) || i === !1 || (i = n, n = t, t = h), (g(n) || n === !1) && (i = n, n = h), i === !1 && (i = b), s.each(function(s, u) {
                o && (r = function(e) {
                    return l(u, e.type, i), i.apply(this, arguments)
                }), t && (a = function(e) {
                    var n, o = p(e.target).closest(t, u).get(0);
                    if (o && o !== u) return n = p.extend(d(e), {
                        currentTarget: o,
                        liveFired: u
                    }), (r || i).apply(o, [n].concat(v.call(arguments, 1)))
                }), c(u, e, i, n, t, a || r)
            }))
        }, p.fn.off = function(e, t, n) {
            var i = this;
            return e && !m(e) ? (p.each(e, function(e, n) {
                i.off(e, t, n)
            }), i) : (m(t) || g(n) || n === !1 || (n = t, t = h), n === !1 && (n = b), i.each(function() {
                l(this, e, n, t)
            }))
        }, p.fn.trigger = function(e, t) {
            return e = m(e) || p.isPlainObject(e) ? p.Event(e) : u(e), e._args = t, this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(e) : p(this).triggerHandler(e, t)
            })
        }, p.fn.triggerHandler = function(e, t) {
            var n, i;
            return this.each(function(r, a) {
                n = d(m(e) ? p.Event(e) : e), n._args = t, n.target = a, p.each(o(a, e.type || e), function(e, t) {
                    if (i = t.proxy(n), n.isImmediatePropagationStopped()) return !1
                })
            }), i
        }, "focusin focusout load resize scroll unload click dblclick change select keydown keypress keyup error".split(" ").forEach(function(e) {
            p.fn[e] = function(t) {
                return t ? this.on(e, t) : this.trigger(e)
            }
        }), ["focus", "blur"].forEach(function(e) {
            p.fn[e] = function(t) {
                return t ? this.on(e, t) : this.each(function() {
                    try {
                        this[e]()
                    } catch (t) {}
                }), this
            }
        }), p.Event = function(e, t) {
            m(e) || (t = e, e = t.type);
            var n = document.createEvent(y[e] || "Events"),
                i = !0;
            if (t)
                for (var o in t) "bubbles" == o ? i = !!t[o] : n[o] = t[o];
            return n.initEvent(e, i, !0), u(n)
        }, e.exports = p
    },
    function(e, t, n) {
        e.exports = n(69)
    },
    function(e, t, n) {
        e.exports = n(47)
    },
    function(e, t) {
        "use strict";

        function n(e, t) {
            for (var n = e; n;) {
                if (n.contains(t) || n == t) return n;
                n = n.parentNode
            }
            return null
        }

        function i(e, t, n) {
            var i = l.createEvent("HTMLEvents");
            if (i.initEvent(t, !0, !0), "object" == typeof n)
                for (var o in n) i[o] = n[o];
            e.dispatchEvent(i)
        }

        function o(e, t, n, i, o, r, a, s) {
            var c = Math.atan2(s - r, a - o) - Math.atan2(i - t, n - e),
                l = Math.sqrt((Math.pow(s - r, 2) + Math.pow(a - o, 2)) / (Math.pow(i - t, 2) + Math.pow(n - e, 2))),
                u = [o - l * e * Math.cos(c) + l * t * Math.sin(c), r - l * t * Math.cos(c) - l * e * Math.sin(c)];
            return {
                rotate: c,
                scale: l,
                translate: u,
                matrix: [
                    [l * Math.cos(c), -l * Math.sin(c), u[0]],
                    [l * Math.sin(c), l * Math.cos(c), u[1]],
                    [0, 0, 1]
                ]
            }
        }

        function r(e) {
            0 === Object.keys(h).length && (u.addEventListener("touchmove", a, !1), u.addEventListener("touchend", s, !1), u.addEventListener("touchcancel", c, !1));
            for (var t = 0; t < e.changedTouches.length; t++) {
                var o = e.changedTouches[t],
                    r = {};
                for (var l in o) r[l] = o[l];
                var p = {
                    startTouch: r,
                    startTime: Date.now(),
                    status: "tapping",
                    element: e.srcElement,
                    pressingHandler: setTimeout(function(t) {
                        return function() {
                            "tapping" === p.status && (p.status = "pressing", i(t, "press", {
                                touchEvent: e
                            })), clearTimeout(p.pressingHandler), p.pressingHandler = null
                        }
                    }(e.srcElement), 500)
                };
                h[o.identifier] = p
            }
            if (2 == Object.keys(h).length) {
                var f = [];
                for (var l in h) f.push(h[l].element);
                i(n(f[0], f[1]), "dualtouchstart", {
                    touches: d.call(e.touches),
                    touchEvent: e
                })
            }
        }

        function a(e) {
            for (var t = 0; t < e.changedTouches.length; t++) {
                var r = e.changedTouches[t],
                    a = h[r.identifier];
                if (!a) return;
                a.lastTouch || (a.lastTouch = a.startTouch), a.lastTime || (a.lastTime = a.startTime), a.velocityX || (a.velocityX = 0), a.velocityY || (a.velocityY = 0), a.duration || (a.duration = 0);
                var s = Date.now() - a.lastTime,
                    c = (r.clientX - a.lastTouch.clientX) / s,
                    l = (r.clientY - a.lastTouch.clientY) / s,
                    u = 70;
                s > u && (s = u), a.duration + s > u && (a.duration = u - s), a.velocityX = (a.velocityX * a.duration + c * s) / (a.duration + s), a.velocityY = (a.velocityY * a.duration + l * s) / (a.duration + s), a.duration += s, a.lastTouch = {};
                for (var d in r) a.lastTouch[d] = r[d];
                a.lastTime = Date.now();
                var p = r.clientX - a.startTouch.clientX,
                    f = r.clientY - a.startTouch.clientY,
                    v = Math.sqrt(Math.pow(p, 2) + Math.pow(f, 2));
                ("tapping" === a.status || "pressing" === a.status) && v > 10 && (a.status = "panning", a.isVertical = !(Math.abs(p) > Math.abs(f)), i(a.element, "panstart", {
                    touch: r,
                    touchEvent: e,
                    isVertical: a.isVertical
                }), i(a.element, (a.isVertical ? "vertical" : "horizontal") + "panstart", {
                    touch: r,
                    touchEvent: e
                })), "panning" === a.status && (a.panTime = Date.now(), i(a.element, "pan", {
                    displacementX: p,
                    displacementY: f,
                    touch: r,
                    touchEvent: e,
                    isVertical: a.isVertical
                }), a.isVertical ? i(a.element, "verticalpan", {
                    displacementY: f,
                    touch: r,
                    touchEvent: e
                }) : i(a.element, "horizontalpan", {
                    displacementX: p,
                    touch: r,
                    touchEvent: e
                }))
            }
            if (2 == Object.keys(h).length) {
                for (var g, m = [], w = [], y = [], t = 0; t < e.touches.length; t++) {
                    var r = e.touches[t],
                        a = h[r.identifier];
                    m.push([a.startTouch.clientX, a.startTouch.clientY]), w.push([r.clientX, r.clientY])
                }
                for (var d in h) y.push(h[d].element);
                g = o(m[0][0], m[0][1], m[1][0], m[1][1], w[0][0], w[0][1], w[1][0], w[1][1]), i(n(y[0], y[1]), "dualtouch", {
                    transform: g,
                    touches: e.touches,
                    touchEvent: e
                })
            }
        }

        function s(e) {
            if (2 == Object.keys(h).length) {
                var t = [];
                for (var o in h) t.push(h[o].element);
                i(n(t[0], t[1]), "dualtouchend", {
                    touches: d.call(e.touches),
                    touchEvent: e
                })
            }
            for (var r = 0; r < e.changedTouches.length; r++) {
                var l = e.changedTouches[r],
                    p = l.identifier,
                    f = h[p];
                if (f) {
                    if (f.pressingHandler && (clearTimeout(f.pressingHandler), f.pressingHandler = null), "panning" === f.status) {
                        var v = Date.now(),
                            g = v - f.startTime,
                            m = ((l.clientX - f.startTouch.clientX) / g, (l.clientY - f.startTouch.clientY) / g, l.clientX - f.startTouch.clientX),
                            w = l.clientY - f.startTouch.clientY,
                            y = Math.sqrt(f.velocityY * f.velocityY + f.velocityX * f.velocityX),
                            T = y > .5;
                        i(f.element, "panend", {
                            isflick: T,
                            touch: l,
                            touchEvent: e,
                            isVertical: f.isVertical
                        }), T && (i(f.element, "flick", {
                            duration: g,
                            velocityX: f.velocityX,
                            velocityY: f.velocityY,
                            displacementX: m,
                            displacementY: w,
                            touch: l,
                            touchEvent: e,
                            isVertical: f.isVertical
                        }), f.isVertical ? i(f.element, "verticalflick", {
                            duration: g,
                            velocityY: f.velocityY,
                            displacementY: w,
                            touch: l,
                            touchEvent: e
                        }) : i(f.element, "horizontalflick", {
                            duration: g,
                            velocityX: f.velocityX,
                            displacementX: m,
                            touch: l,
                            touchEvent: e
                        }))
                    }
                    "pressing" === f.status && i(f.element, "pressend", {
                        touch: l,
                        touchEvent: e
                    }), delete h[p]
                }
            }
            0 === Object.keys(h).length && (u.removeEventListener("touchmove", a, !1), u.removeEventListener("touchend", s, !1), u.removeEventListener("touchcancel", c, !1))
        }

        function c(e) {
            if (2 == Object.keys(h).length) {
                var t = [];
                for (var o in h) t.push(h[o].element);
                i(n(t[0], t[1]), "dualtouchend", {
                    touches: d.call(e.touches),
                    touchEvent: e
                })
            }
            for (var r = 0; r < e.changedTouches.length; r++) {
                var l = e.changedTouches[r],
                    p = l.identifier,
                    f = h[p];
                f && (f.pressingHandler && (clearTimeout(f.pressingHandler), f.pressingHandler = null), "panning" === f.status && i(f.element, "panend", {
                    touch: l,
                    touchEvent: e
                }), "pressing" === f.status && i(f.element, "pressend", {
                    touch: l,
                    touchEvent: e
                }), delete h[p])
            }
            0 === Object.keys(h).length && (u.removeEventListener("touchmove", a, !1), u.removeEventListener("touchend", s, !1), u.removeEventListener("touchcancel", c, !1))
        }
        var l = window.document,
            u = l.documentElement,
            d = Array.prototype.slice,
            h = {};
        u.addEventListener("touchstart", r, !1)
    },
    function(e, t, n) {
        "use strict";

        function i(e, t) {
            return [
                [(e / 3 + (e + t) / 3 - e) / (t - e), (e * e / 3 + e * t * 2 / 3 - e * e) / (t * t - e * e)],
                [(t / 3 + (e + t) / 3 - e) / (t - e), (t * t / 3 + e * t * 2 / 3 - e * e) / (t * t - e * e)]
            ]
        }

        function o(e) {
            if (this.v = e.v || 0, this.a = e.a || 0, "undefined" != typeof e.t && (this.t = e.t), "undefined" != typeof e.s && (this.s = e.s), "undefined" == typeof this.t)
                if ("undefined" == typeof this.s) this.t = -this.v / this.a;
                else {
                    var t = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a,
                        n = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
                    this.t = Math.min(t, n)
                }
                "undefined" == typeof this.s && (this.s = this.a * this.t * this.t / 2 + this.v * this.t)
        }

        function r(e) {
            var t = e.getBoundingClientRect();
            if (!t) {
                t = {}, t.width = e.offsetWidth, t.height = e.offsetHeight, t.left = e.offsetLeft, t.top = e.offsetTop;
                for (var n = e.offsetParent; n;) t.left += n.offsetLeft, t.top += n.offsetTop, n = n.offsetParent;
                t.right = t.left + t.width, t.bottom = t.top + t.height
            }
            return t
        }

        function a(e) {
            return 0 - e.options[e.axis + "Padding1"]
        }

        function s(e) {
            var t = r(e.element),
                n = r(e.viewport),
                i = a(e);
            if ("y" === e.axis) var o = 0 - t.height + n.height;
            else var o = 0 - t.width + n.width;
            return Math.min(o + e.options[e.axis + "Padding2"], i)
        }

        function c(e, t) {
            return t > e.minScrollOffset ? t - e.minScrollOffset : t < e.maxScrollOffset ? t - e.maxScrollOffset : void 0
        }

        function l(e, t) {
            return t > e.minScrollOffset ? t = e.minScrollOffset : t < e.maxScrollOffset && (t = e.maxScrollOffset), t
        }

        function u(e, t, n) {
            var i = f.createEvent("HTMLEvents");
            if (i.initEvent(t, !1, !0), i.scrollObj = e, n)
                for (var o in n) i[o] = n[o];
            e.element.dispatchEvent(i), e.viewport.dispatchEvent(i)
        }

        function d(e) {
            var t, n = {
                    x: 0,
                    y: 0
                },
                i = getComputedStyle(e.element).webkitTransform;
            return "none" !== i && (t = i.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || i.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) && (n.x = parseFloat(t[1]) || 0, n.y = parseFloat(t[2]) || 0), n
        }

        function h(e, t) {
            return w ? "translate3d(" + e + "px, " + t + "px, 0)" : "translate(" + e + "px, " + t + "px)"
        }

        function p(e, t) {
            function n(e, t) {
                O = null, clearTimeout(N), N = setTimeout(function() {
                    O && (O = null, y(e))
                }, t || 400), O = e
            }

            function i(t) {
                if (I.enabled) {
                    M && k(), e.style.webkitBackfaceVisibility = "hidden", e.style.webkitTransformStyle = "preserve-3d";
                    var n = d(I);
                    e.style.webkitTransform = h(n.x, n.y), e.style.webkitTransition = "", O = null, clearTimeout(N)
                }
            }

            function p(t) {
                if (I.enabled) {
                    var i = d(I)[I.axis],
                        o = c(I, i);
                    if ("" === e.style.webkitTransition && o) {
                        var r = l(I, i);
                        o > 0 ? u(I, "y" === I.axis ? "pulldownend" : "pullrightend") : o < 0 && u(I, "y" === I.axis ? "pullupend" : "pullleftend"), e.style.webkitTransition = "-webkit-transform 0.4s ease 0", e.style.webkitTransform = "translate" + I.axis.toUpperCase() + "(" + r.toFixed(0) + "px)", n(k, 400), y(function a() {
                            M && I.enabled && (u(I, "scrolling"), y(a))
                        })
                    } else M && k()
                }
            }

            function f(e) {
                I.enabled && ("y" !== I.axis && e.isVertical || "x" === I.axis && e.isVertical || (I.transformOffset = d(I), I.minScrollOffset = a(I), I.maxScrollOffset = s(I), _ = 2.5, L = !0, M = !0, P = !1, u(I, "scrollstart"), R = e["displacement" + I.axis.toUpperCase()]))
            }

            function w(t) {
                if (I.enabled && ("y" === I.axis && t.isVertical || "x" === I.axis && !t.isVertical)) {
                    t.stopPropagation();
                    var n = t["displacement" + I.axis.toUpperCase()];
                    if (Math.abs(n - R) < 5) return void t.stopPropagation();
                    R = n;
                    var i = I.transformOffset[I.axis] + n;
                    i > I.minScrollOffset ? (i = I.minScrollOffset + (i - I.minScrollOffset) / _, _ *= 1.003) : i < I.maxScrollOffset && (i = I.maxScrollOffset - (I.maxScrollOffset - i) / _, _ *= 1.003), _ > 4 && (_ = 4);
                    var o = c(I, i);
                    o && (u(I, o > 0 ? "y" === I.axis ? "pulldown" : "pullright" : "y" === I.axis ? "pullup" : "pullleft", {
                        boundaryOffset: Math.abs(o)
                    }), I.options.noBounce && (i = l(I, i))), e.style.webkitTransition = "", "y" === I.axis ? e.style.webkitTransform = h(I.transformOffset.x, i) : e.style.webkitTransform = h(i, I.transformOffset.y), u(I, "scrolling")
                }
            }

            function b(e) {
                I.enabled && ("y" !== I.axis && e.isVertical || "x" === I.axis && e.isVertical)
            }

            function C(i) {
                if (I.enabled && ("y" === I.axis && i.isVertical || "x" === I.axis && !i.isVertical)) {
                    i.stopPropagation(), L = !0;
                    var r, a, s, l, h, p, f, v, g, w, T, b, C, E, S, x, A;
                    l = d(I)[I.axis];
                    var O = c(I, l);
                    if (!O) {
                        r = i["velocity" + I.axis.toUpperCase()];
                        var N = 2,
                            _ = .0015;
                        t.inertia && m[t.inertia] && (N = m[t.inertia][0], _ = m[t.inertia][1]), r > N && (r = N), r < -N && (r = -N), a = _ * (r / Math.abs(r)), p = new o({
                            v: r,
                            a: -a
                        }), s = p.t, h = l + p.s;
                        var R = c(I, h);
                        if (R) {
                            f = r, v = a, R > 0 ? (w = I.minScrollOffset, b = 1) : (w = I.maxScrollOffset, b = -1), T = new o({
                                v: b * f,
                                a: -b * v,
                                s: Math.abs(w - l)
                            }), g = T.t;
                            var H = T.generateCubicBezier();
                            C = f - v * g, E = .03 * (C / Math.abs(C)), A = new o({
                                v: C,
                                a: -E
                            }), S = A.t, x = w + A.s;
                            A.generateCubicBezier();
                            t.noBounce ? l !== w ? (e.style.webkitTransition = "-webkit-transform " + (g / 1e3).toFixed(2) + "s cubic-bezier(" + H + ") 0", e.style.webkitTransform = "translate" + I.axis.toUpperCase() + "(" + w.toFixed(0) + "px)", n(k, 1e3 * (g / 1e3).toFixed(2))) : k() : l !== x ? (e.style.webkitTransition = "-webkit-transform " + ((g + S) / 1e3).toFixed(2) + "s ease-out 0", e.style.webkitTransform = "translate" + I.axis.toUpperCase() + "(" + x.toFixed(0) + "px)", n(function(t) {
                                I.enabled && (x !== w ? (e.style.webkitTransition = "-webkit-transform 0.4s ease 0", e.style.webkitTransform = "translate" + I.axis.toUpperCase() + "(" + w.toFixed(0) + "px)", n(k, 400)) : k())
                            }, 1e3 * ((g + S) / 1e3).toFixed(2))) : k()
                        } else {
                            var B = p.generateCubicBezier();
                            e.style.webkitTransition = "-webkit-transform " + (s / 1e3).toFixed(2) + "s cubic-bezier(" + B + ") 0", e.style.webkitTransform = "translate" + I.axis.toUpperCase() + "(" + h.toFixed(0) + "px)", n(k, 1e3 * (s / 1e3).toFixed(2))
                        }
                        P = !0, y(function D() {
                            M && P && I.enabled && (u(I, "scrolling", {
                                afterFlick: !0
                            }), y(D))
                        })
                    }
                }
            }

            function k(t) {
                I.enabled && (L = !1, setTimeout(function() {
                    !L && M && (M = !1, P = !1, e.style.webkitTransition = "", u(I, "scrollend"))
                }, 50))
            }
            var I = this;
            if (t = t || {}, t.noBounce = !!t.noBounce, t.padding = t.padding || {}, null == t.isPrevent ? t.isPrevent = !0 : t.isPrevent = !!t.isPrevent, null == t.isFixScrollendClick ? t.isFixScrollendClick = !0 : t.isFixScrollendClick = !!t.isFixScrollendClick, t.padding ? (t.yPadding1 = -t.padding.top || 0, t.yPadding2 = -t.padding.bottom || 0, t.xPadding1 = -t.padding.left || 0, t.xPadding2 = -t.padding.right || 0) : (t.yPadding1 = 0, t.yPadding2 = 0, t.xPadding1 = 0, t.xPadding2 = 0), t.margin ? (t.yMargin1 = -t.margin.top || 0, t.yMargin2 = -t.margin.bottom || 0, t.xMargin1 = -t.margin.left || 0, t.xMargin2 = -t.margin.right || 0) : (t.yMargin1 = 0, t.yMargin2 = 0, t.xMargin1 = 0, t.xMargin2 = 0), t.direction = t.direction || "y", t.inertia = t.inertia || "normal", this.options = t, I.axis = t.direction, this.element = e, this.viewport = e.parentNode, this.plugins = {}, this.viewport.addEventListener("touchstart", i, !1), this.viewport.addEventListener("touchend", p, !1), this.viewport.addEventListener("touchcancel", p, !1), this.viewport.addEventListener("panstart", f, !1), this.viewport.addEventListener("pan", w, !1), this.viewport.addEventListener("panend", b, !1), this.viewport.addEventListener("flick", C, !1), this.element.style.webkitBackfaceVisibility = "hidden", this.element.style.webkitTransformStyle = "preserve-3d", this.element.scrollId = setTimeout(function() {
                    v[I.element.scrollId + ""] = I
                }, 1), t.isPrevent && (this.viewport.addEventListener("touchstart", function(e) {
                    T = !0
                }, !1), I.viewport.addEventListener("touchend", function(e) {
                    T = !1
                }, !1)), t.isFixScrollendClick) {
                var E, S;
                this.viewport.addEventListener("scrolling", function() {
                    E = !0, S && clearTimeout(S), S = setTimeout(function(e) {
                        E = !1
                    }, 400)
                }, !1);
                var x = function(e) {
                        return !E && !M || (e.preventDefault(), e.stopPropagation(), !1)
                    },
                    A = function(e) {
                        E || M || setTimeout(function() {
                            var t = document.createEvent("HTMLEvents");
                            t.initEvent("niceclick", !0, !0), e.target.dispatchEvent(t)
                        }, 300)
                    };
                this.viewport.addEventListener("click", x, !1), this.viewport.addEventListener("tap", A, !1)
            }
            var O, N = 0;
            e.addEventListener("webkitTransitionEnd", function(e) {
                if (O) {
                    var t = O;
                    O = null, clearTimeout(N), y(function() {
                        t(e)
                    })
                }
            }, !1);
            var _, M, P, L;
            Object.defineProperty(this, "isScrolling", {
                get: function() {
                    return !!M
                }
            });
            var R, H = {
                init: function() {
                    return this.enable(), this.refresh(), this.scrollTo(0), this
                },
                enable: function() {
                    return this.enabled = !0, this
                },
                disable: function() {
                    var e = this.element;
                    return this.enabled = !1, y(function() {
                        e.style.webkitTransform = getComputedStyle(e).webkitTransform
                    }), this
                },
                getScrollWidth: function() {
                    return r(this.element).width
                },
                getScrollHeight: function() {
                    return r(this.element).height
                },
                getScrollLeft: function() {
                    return -d(this).x - this.options.xPadding1
                },
                getScrollTop: function() {
                    return -d(this).y - this.options.yPadding1
                },
                getMaxScrollLeft: function() {
                    return -I.maxScrollOffset - this.options.xPadding1
                },
                getMaxScrollTop: function() {
                    return -I.maxScrollOffset - this.options.yPadding1
                },
                getBoundaryOffset: function() {
                    return Math.abs(c(this, d(this)[this.axis]) || 0)
                },
                refresh: function() {
                    var e = this.element,
                        t = "y" === this.axis,
                        n = t ? "height" : "width";
                    if (null != this.options[n]) e.style[n] = this.options[n] + "px";
                    else if (e.childElementCount > 0) {
                        var i, o, c = e.firstElementChild,
                            l = e.lastElementChild;
                        if (document.createRange && !this.options.ignoreOverflow && (i = document.createRange(), i.selectNodeContents(e), o = r(i)), o) e.style[n] = o[n] + "px";
                        else if (c && l) {
                            for (; c && 0 === r(c)[n] && c.nextElementSibling;) c = c.nextElementSibling;
                            for (; l && l !== c && 0 === r(l)[n] && l.previousElementSibling;) l = l.previousElementSibling;
                            e.style[n] = r(l)[t ? "bottom" : "right"] - r(c)[t ? "top" : "left"] + "px"
                        } else e.style[n] = "0"
                    } else e.style[n] = "auto", e.style[n] = r(e)[n] + "px";
                    return this.transformOffset = d(this), this.minScrollOffset = a(this), this.maxScrollOffset = s(this), this.scrollTo(-this.transformOffset[this.axis] - this.options[this.axis + "Padding1"]), u(this, "contentrefresh"), this
                },
                offset: function(e) {
                    var t = r(this.element),
                        n = r(e);
                    if ("y" === this.axis) {
                        var i = {
                            top: n.top - t.top - this.options.yPadding1,
                            left: n.left - t.left,
                            right: t.right - n.right,
                            width: n.width,
                            height: n.height
                        };
                        i.bottom = i.top + i.height
                    } else {
                        var i = {
                            top: n.top - t.top,
                            bottom: t.bottom - n.bottom,
                            left: n.left - t.left - this.options.xPadding1,
                            width: n.width,
                            height: n.height
                        };
                        i.right = i.left + i.width
                    }
                    return i
                },
                getRect: function(e) {
                    var t = r(this.viewport),
                        n = r(e);
                    if ("y" === this.axis) {
                        var i = {
                            top: n.top - t.top,
                            left: n.left - t.left,
                            right: t.right - n.right,
                            width: n.width,
                            height: n.height
                        };
                        i.bottom = i.top + i.height
                    } else {
                        var i = {
                            top: n.top - t.top,
                            bottom: t.bottom - n.bottom,
                            left: n.left - t.left,
                            width: n.width,
                            height: n.height
                        };
                        i.right = i.left + i.width
                    }
                    return i
                },
                isInView: function(e) {
                    var t = r(this.viewport),
                        n = this.getRect(e);
                    return "y" === this.axis ? t.top < n.bottom && t.bottom > n.top : t.left < n.right && t.right > n.left
                },
                scrollTo: function(e, t) {
                    var i = this,
                        o = this.element;
                    return e = -e - this.options[this.axis + "Padding1"], e = l(this, e), M = !0, t === !0 ? (o.style.webkitTransition = "-webkit-transform 0.4s ease 0", n(k, 400), y(function r() {
                        M && i.enabled && (u(i, "scrolling"), y(r))
                    })) : (o.style.webkitTransition = "", n(k, 1)), "y" === this.axis ? o.style.webkitTransform = h(d(this).x, e) : o.style.webkitTransform = h(e, d(this).y), this
                },
                scrollToElement: function(e, t) {
                    var n = this.offset(e);
                    return n = n["y" === this.axis ? "top" : "left"], this.scrollTo(n, t)
                },
                getViewWidth: function() {
                    return r(this.viewport).width
                },
                getViewHeight: function() {
                    return r(this.viewport).height
                },
                addPulldownHandler: function(e) {
                    var t = this;
                    return this.element.addEventListener("pulldownend", function(n) {
                        t.disable(), e(n, function() {
                            t.scrollTo(0, !0), t.enable()
                        })
                    }, !1), this
                },
                addPullupHandler: function(e) {
                    var t = this;
                    return this.element.addEventListener("pullupend", function(n) {
                        t.disable(), e(n, function() {
                            t.scrollTo(t.getScrollHeight(), !0), t.enable()
                        })
                    }, !1), this
                },
                addScrollstartHandler: function(e) {
                    return this.element.addEventListener("scrollstart", function(t) {
                        e(t)
                    }, !1), this
                },
                addScrollingHandler: function(e) {
                    return this.element.addEventListener("scrolling", function(t) {
                        e(t)
                    }, !1), this
                },
                addScrollendHandler: function(e) {
                    return this.element.addEventListener("scrollend", function(t) {
                        e(t)
                    }, !1), this
                },
                addEventListener: function() {
                    this.element.addEventListener.apply(this.element, arguments)
                },
                removeEventListener: function() {
                    this.element.removeEventListener.apply(this.element, arguments)
                },
                enablePlugin: function(e, t) {
                    var n = g[e];
                    return n && !this.plugins[e] && (this.plugins[e] = !0, t = t || {}, n.call(this, e, t)), this
                }
            };
            for (var B in H) this[B] = H[B]
        }
        n(46), n(48);
        var f = window.document,
            v = {},
            g = {},
            m = {
                normal: [2, .0015],
                slow: [1.5, .003],
                veryslow: [1.5, .005]
            };
        o.prototype.generateCubicBezier = function() {
            return i(this.v / this.a, this.t + this.v / this.a)
        };
        var w = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
            y = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                    setTimeout(e, 16)
                }
            }(),
            T = !1;
        f.addEventListener("touchmove", function(e) {
            return !T || (e.preventDefault(), !1)
        }, !1);
        var b;
        b = function(e, t) {
            if (1 === arguments.length && !(arguments[0] instanceof HTMLElement))
                if (t = arguments[0], t.scrollElement) e = t.scrollElement;
                else {
                    if (!t.scrollWrap) throw new Error("no scroll element");
                    e = t.scrollWrap.firstElementChild
                }
            if (!e.parentNode) throw new Error("wrong dom tree");
            if (t && t.direction && ["x", "y"].indexOf(t.direction) < 0) throw new Error("wrong direction");
            var n;
            return n = e.scrollId ? v[e.scrollId] : new p(e, t)
        }, b.plugin = function(e, t) {
            return t ? (e = e.split(","), void e.forEach(function(e) {
                g[e] = t
            })) : g[e]
        }, e.exports = b
    },
    [188, 36, 49],
    function(e, t, n) {
        "use strict";
        var i = n(1);
        n(2), n(36);
        var o = i.gestures,
            r = navigator.userAgent.toLowerCase().indexOf("android") > 0,
            a = /ip(ad|hone|od)/.test(navigator.userAgent.toLowerCase()),
            s = {
                trackingClick: !1,
                trackingClickStart: 0,
                targetElement: null,
                touchStartX: 0,
                touchStartY: 0,
                touchBoundary: 10,
                tapDelay: 200,
                sendClick: function(e, t) {
                    var n = i.Event("tap", {
                        animaTap: !0
                    });
                    i(e).trigger(n);
                    var o, r;
                    document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], o = document.createEvent("MouseEvents"), o.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), o.animaClick = !0, e.dispatchEvent(o)
                },
                needClick: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "button":
                        case "select":
                        case "textarea":
                            if (e.disabled) return !0;
                            break;
                        case "input":
                            if (a && "file" === e.type || e.disabled) return !0;
                            break;
                        case "iframe":
                        case "video":
                            return !0
                    }
                    return !1
                },
                focus: function(e) {
                    var t;
                    a && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
                },
                needFocus: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "textarea":
                        case "select":
                            return !0;
                        case "input":
                            switch (e.type) {
                                case "button":
                                case "checkbox":
                                case "file":
                                case "image":
                                case "radio":
                                case "submit":
                                    return !1
                            }
                            return !e.disabled && !e.readOnly;
                        default:
                            return !1
                    }
                },
                updateScrollParent: function(e) {
                    var t, n;
                    if (t = e.yoctoTouchScrollParent, !t || !t.contains(e)) {
                        n = e;
                        do {
                            if (n.scrollHeight > n.offsetHeight) {
                                t = n, e.yoctoTouchScrollParent = n;
                                break
                            }
                            n = n.parentElement
                        } while (n)
                    }
                    t && (t.yoctoTouchLastScrollTop = t.scrollTop)
                },
                findControl: function(e) {
                    return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
                },
                touchHasMoved: function(e) {
                    var t = e.changedTouches[0],
                        n = s.touchBoundary;
                    return Math.abs(t.pageX - s.touchStartX) > n || Math.abs(t.pageY - s.touchStartY) > n
                },
                fixTarget: function(e) {
                    return window.SVGElementInstance && e instanceof SVGElementInstance && (e = e.correspondingUseElement), e
                }
            };
        o.tap = {
            events: ["tap", "click"],
            handler: {
                touchstart: function(e) {
                    var t, n, i;
                    if (e.targetTouches.length > 1) return !0;
                    if (t = s.fixTarget(e.target), n = e.targetTouches[0], a) {
                        if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
                        s.updateScrollParent(t)
                    }
                    return s.trackingClick = !0, s.trackingClickStart = e.timeStamp, s.targetElement = t, s.touchStartX = n.pageX, s.touchStartY = n.pageY, e.timeStamp - s.lastClickTime < s.tapDelay && e.preventDefault(), !0
                },
                touchmove: function(e) {
                    return !s.trackingClick || ((s.targetElement !== s.fixTarget(e.target) || s.touchHasMoved(e)) && (s.trackingClick = !1,
                        s.targetElement = null), !0)
                },
                touchend: function(e) {
                    var t, n, i, o, c = s.targetElement;
                    if (!s.trackingClick) return !0;
                    if (e.timeStamp - s.lastClickTime < s.tapDelay) return s.cancelNextClick = !0, !0;
                    if (s.cancelNextClick = !1, s.lastClickTime = e.timeStamp, n = s.trackingClickStart, s.trackingClick = !1, s.trackingClickStart = 0, i = c.tagName.toLowerCase(), "label" === i) {
                        if (t = s.findControl(c)) {
                            if (s.focus(c), r) return !1;
                            c = t
                        }
                    } else if (s.needFocus(c)) return e.timeStamp - n > 100 || a && window.top !== window && "input" === i ? (s.targetElement = null, !1) : (s.focus(c), r && s.sendClick(c, e), !1);
                    return !(!a || (o = c.yoctoTouchScrollParent, !o || o.yoctoTouchLastScrollTop === o.scrollTop)) || (s.needClick(c) || (e.preventDefault(), s.sendClick(c, e)), !1)
                },
                touchcancel: function(e) {
                    s.trackingClick = !1, s.targetElement = null
                }
            }
        }, o.init("tap");
        var c = Event.prototype.initEvent;
        Event.prototype.initEvent = function() {
            var e = Array.prototype.slice.call(arguments);
            c.apply(this, e), "click" === e[0] && (this.animaClick = !0)
        }, e.exports = i
    }, , , , , , , , , , ,
    function(e, t, n) {
        "use strict";
        var i = n(61);
        e.exports = {
            setRecord: function(e, t, n, o, r) {
                i.set("chatLastQuestion", USERID + "-" + e + "-" + (new Date).getTime() + "-" + t + "-" + n + "-" + o + "-" + r)
            },
            setReconnectSwitch: function(e) {
                i.set("reconnect", e)
            },
            getReconnectSwitch: function() {
                return i.get("reconnect")
            },
            getRecord: function() {
                var e = i.get("chatLastQuestion"),
                    t = [];
                return !!e && (t = e.split("-"), {
                    historyUid: t[0],
                    question: t[1],
                    historyTime: t[2],
                    chatId: t[3],
                    sid: t[4],
                    sessionUuid: t[5],
                    connectToken: t[6]
                })
            },
            hasRecord: function() {
                var e = this.getRecord();
                if (e) {
                    var t = parseInt(60 * window.CHATCONFIG.connectInvalidInterval * 1e3, 10),
                        n = e.historyUid,
                        i = e.historyTime,
                        o = (new Date).getTime();
                    return n == window.USERID && parseInt(o) - parseInt(i) <= t
                }
                return !1
            },
            render: function(e) {
                if (this.hasRecord()) {
                    var t = this.getRecord().question,
                        n = this.getRecord().chatId;
                    e.renderMessage({
                        messageType: "reconnect",
                        answerContent: '\u56de\u6765\u5566\uff1f\u5982\u679c\u662f\u4e4b\u524d\u7684\u95ee\u9898\u6ca1\u804a\u5b8c\uff0c\u60a8\u53ef\u4ee5<a href="javascript:;" req-token="' + n + '" question="' + t + '" chatid="' + n + '" class="reconnect-text J-reconnect">\u70b9\u6b64\u7ee7\u7eed</a>'
                    })
                }
            }
        }
    },
    function(e, t, n) {
        var i = n(63);
        e.exports = i
    },
    function(e, t) {
        "use strict";
        var n = {
            speechRecognizeErrorText: {
                "default": "\u8bf7\u91cd\u8bd5",
                12: "\u54ce\u54df\uff0c\u8bed\u97f3\u4e0d\u597d\u4f7f",
                11: "\u60a8\u7684\u5f55\u97f3\u8bbe\u5907\u65e0\u6743\u8bbf\u95ee\u554a\uff0c\u597d\u96be\u8fc7",
                18: "\u64cd\u4f5c\u592a\u9891\u7e41\u5566~\u5148\u6b47\u6b47\u5427",
                19: "\u7f51\u7edc\u592a\u8c03\u76ae\u8eb2\u8d77\u6765\u4e86\uff0c\u8fc7\u4f1a\u513f\u518d\u8bd5\u8bd5\u5427",
                20: "\u521a\u624d\u6709\u70b9\u6ca1\u542c\u61c2\uff0c\u80fd\u6362\u4e2a\u8bf4\u6cd5\u518d\u4e00\u6b21\u561b",
                21: "\u54ce\u54df\uff0c\u6ca1\u5f55\u6210\u529f\uff0c\u8981\u4e0d\u60a8\u6362\u4e2a\u59ff\u52bf\u518d\u8bd5\u4e00\u6b21\uff1f",
                22: "\u4eb2\uff0c\u8bf4\u8bdd\u65f6\u95f4\u592a\u77ed\u4e86",
                23: "\u5df2\u7ecf\u53d6\u6d88\u5f55\u97f3"
            },
            questionType: {
                GENERAL_TYPE: "NORMAL",
                RECOMMEND_TYPE: "RECOMMEND",
                OUTLINE_TYPE: "CHILD",
                PROGRESSIVE_TYPE: "PROMPT",
                RELATIVE_TYPE: "RELATED",
                SIMILAR_TYPE: "SIMILAR"
            },
            onlineText: {
                connecting: "\u6b63\u5728\u4e3a\u4f60\u63a5\u5165\uff0c\u8bf7\u7a0d\u5019...",
                connectFail: "\u5ba2\u670d\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01",
                netFail: "\u7f51\u7edc\u8fde\u63a5\u4e2d\u65ad\uff0c\u8bf7\u91cd\u65b0\u5c1d\u8bd5\u8fde\u63a5\u4eba\u5de5\u5ba2\u670d\uff01",
                idCheck: "\u975e\u5e38\u62b1\u6b49\uff0c\u4e3a\u4e86\u4fdd\u62a4\u8d26\u6237\u5b89\u5168\uff0c\u975e\u672c\u4eba\u8d26\u6237\u6211\u4eec\u53ea\u80fd\u8fdb\u884c\u89c4\u5219\u7c7b\u7684\u95ee\u9898\u89e3\u7b54\uff0c\u82e5\u60a8\u8981\u54a8\u8be2\u8d26\u6237\u76f8\u5173\u7684\u5177\u4f53\u5185\u5bb9\uff0c\u8bf7\u8ba9\u8d26\u6237\u672c\u4eba\u6765\u8bbf\u54a8\u8be2",
                idCheckConfirmTitle: "\u8bf7\u95ee\u60a8\u8981\u54a8\u8be2\u7684\u8d26\u6237\u662f\u5426\u4e3a\u60a8\u672c\u4eba\u6301\u6709\uff1f",
                idCheckOk: "\u662f\u672c\u4eba",
                idCheckCancel: "\u4e0d\u662f\u672c\u4eba"
            }
        };
        e.exports = n
    },
    function(e, t) {
        var n = {},
            i = window.localStorage,
            o = function() {
                var e = "ysupport";
                try {
                    return localStorage.setItem(e, e), localStorage.removeItem(e), !0
                } catch (t) {
                    return !1
                }
            }();
        ! function(e) {
            if (!e) return n.get = n.set = n.remove = n.clear = function() {
                console.log("\u62b1\u6b49\uff0c\u60a8\u7684\u6d4f\u89c8\u5668\u6682\u4e0d\u652f\u6301localstoarage\u7684\u4f7f\u7528\uff01")
            }, n.length = 0, !1
        }(o), n = {
            get: function(e) {
                var t = i.getItem(e);
                if (null !== t) try {
                    return JSON.parse(t)
                } catch (n) {
                    return t
                }
            },
            set: function(e, t) {
                if (this.get(e) && this.remove(e), t && "undefined" !== t && "null" !== t) {
                    "[object Function]" !== Object.prototype.toString.apply(t) && (t = JSON.stringify(t));
                    try {
                        return i.setItem(e, t), !0
                    } catch (n) {
                        return !1
                    }
                }
            },
            remove: function(e) {
                i.removeItem(e)
            },
            clear: function() {
                i.clear()
            },
            length: i.length
        }, e.exports = n
    },
    function(e, t, n) {
        e.exports = n(65)
    },
    function(e, t) {
        function n(e) {
            if (c(e)) return i(e).implement({
                initialize: e
            })
        }

        function i(e) {
            return a(e, n), e.extend = r, e.implement = o, e
        }

        function o(e) {
            Array.isArray(e) || (e = [e]);
            for (var t, n = this.prototype; t = e.shift();) s(n, t.prototype || t);
            return this
        }

        function r(e) {
            var t = n.create(e);
            return a(t, this), s(t, this, ["extend", "implement", "superclass"]), t
        }

        function a(e, t) {
            var n = e.prototype,
                i = Object.create(t.prototype);
            s(i, n), i.constructor = e, e.prototype = i, e.superclass = t.prototype
        }

        function s(e, t, n) {
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    if (n && n.indexOf(i) !== -1) continue;
                    e[i] = t[i]
                }
        }

        function c(e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }
        e.exports = n, n.create = function(e) {
            function t() {
                this.constructor === t && this.initialize && this.initialize.apply(this, arguments)
            }
            return e || (e = {}), i(t), t.implement(e), t
        }
    },
    function(e, t, n) {
        var i = n(4),
            o = function() {};
        o.ATTRS = {
            align: null
        }, o.prototype = {
            getAlignPoint: function(e) {
                var t = this,
                    n = null;
                if (e = e || t.get("align")) {
                    t.element.css("position", "fixed"), t.element.attr("am-mode", "show");
                    var o = e.offset,
                        r = e.type,
                        a = o ? o[0] : 0,
                        s = o ? o[1] : 0,
                        c = i(window).height(),
                        l = t.element.height(),
                        u = t.element.width(),
                        d = i(window).width();
                    switch (r) {
                        case "top":
                            n = {
                                x: a,
                                y: s
                            };
                            break;
                        case "bottom":
                            n = {
                                x: a,
                                y: s + c - l
                            };
                            break;
                        case "left":
                            n = {
                                x: a,
                                y: s
                            };
                            break;
                        case "right":
                            n = {
                                x: a + d - u,
                                y: s
                            };
                            break;
                        case "center":
                            n = {
                                x: a + (d - u) / 2,
                                y: s + (c - l) / 2
                            }
                    }
                }
                return n
            },
            _onRenderAlign: function(e) {
                this.rendered && this.resetAlign(e)
            },
            resetAlign: function(e) {
                var t = this,
                    n = t.getAlignPoint(e);
                n && t.set("xy", [n.x, n.y])
            }
        }, e.exports = o
    },
    function(e, t, n) {
        function i(e, t) {
            e.addEventListener(a, t, !1)
        }

        function o(e, t) {
            e.removeEventListener(a, t, !1)
        }

        function r(e) {
            return e += "", e.charAt(0).toUpperCase() + e.substring(1)
        }
        var a = (n(4), "webkitAnimationEnd"),
            s = {
                up: "down",
                down: "up",
                left: "left",
                right: "right"
            },
            c = function() {};
        c.ATTRS = {
            duration: 400,
            easing: "linear",
            direction: "up"
        }, c.prototype = {
            _getAnimName: function(e, t) {
                var n, i = this,
                    o = e + r(t);
                return "slide" == e && (n = i.get("direction"), o += r("in" == t ? n : s[n])), o
            },
            animateEffectIn: function(e) {
                var t = this,
                    n = {
                        "-webkit-animation-name": t._getAnimName(e, "in")
                    };
                t.set("visible", !0), t.set("closing", !1), t.animate(n, null, !0)
            },
            animateEffectOut: function(e) {
                function t() {
                    n.get("closing") && (n.set("visible", !1), n.set("closing", !1))
                }
                var n = this,
                    i = {
                        "-webkit-animation-name": n._getAnimName(e, "out")
                    };
                n.set("closing", !0), n.animate(i, t, !0)
            },
            animate: function(e, t) {
                function n(e) {
                    e.target == r.element[0] && (r.offAnimate(), o(a[0], n), t && t())
                }
                var r = this,
                    a = r.element;
                i(a[0], n), r.applyAnimate(), a.css(e)
            },
            applyAnimate: function() {
                var e = this,
                    t = e.element;
                t.css(e.getAnimateStyle())
            },
            offAnimate: function() {
                this.element.css({
                    "-webkit-animation": "none"
                })
            },
            getAnimateStyle: function() {
                var e = this,
                    t = e.get("duration");
                return {
                    "-webkit-animation-duration": t + "ms ",
                    "-webkit-animation-timing-function": e.get("easing")
                }
            }
        }, e.exports = c
    },
    function(e, t, n) {
        var i = n(4),
            o = "am-mask-relative",
            r = function() {};
        r.ATTRS = {
            mask: !1,
            maskNode: null,
            maskEl: null,
            maskTpl: '<div class="am-mask" style="width:100%;height:100%;top:0;left:0;"></div>'
        }, r.prototype = {
            showMask: function() {
                var e = this,
                    t = e.get("maskNode") || "body",
                    n = e.get("zIndex"),
                    r = e.get("maskEl");
                if (!r) {
                    r = i(e.get("maskTpl")).appendTo(t);
                    var a = "body" == t ? "fixed" : "absolute";
                    r.css("position", a), n && r.css("zIndex", n - 1), e.set("maskEl", r)
                }
                i(t).addClass(o), r.show()
            },
            hideMask: function() {
                var e = this,
                    t = e.get("maskNode") || "body",
                    n = e.get("maskEl");
                n && (n.hide(), i(t).removeClass(o))
            },
            destroyMask: function() {
                var e = this,
                    t = e.get("maskNode") || "body",
                    n = e.get("maskEl");
                n && (n.remove(), i(t).removeClass(o))
            }
        }, e.exports = r
    },
    function(e, t, n) {
        function i(e) {
            return !!(16 & document.documentElement.compareDocumentPosition(e))
        }

        function o(e) {
            return null == e || void 0 === e
        }

        function r(e) {
            return e += "", e.charAt(0).toUpperCase() + e.substring(1)
        }
        n(75);
        var a = n(4),
            s = n(64),
            c = n(70),
            l = n(67),
            u = n(66),
            d = n(68),
            h = "_onRender",
            p = s.create({
                attrs: a.extend({}, c.ATTRS, d.ATTRS, l.ATTRS, u.ATTRS, {
                    width: null,
                    height: null,
                    visible: !1,
                    className: "am-pop",
                    effect: "none"
                })
            });
        p.implement([c.prototype, d.prototype, l.prototype, u.prototype, {
            initialize: function(e) {
                this.attrs = a.extend({}, this.attrs, e), this.parseElement(), this._initElement(), this.processMask(), this._isTemplate = !(e && e.element)
            },
            parseElement: function() {
                var e = this.get("element");
                if (e ? this.element = a(e) : this.get("template") && (this.element = a(this.get("template"))), !this.element || !this.element[0]) throw new Error("element is invalid")
            },
            render: function() {
                this.rendered || (this._renderAndBindAttrs(), this.rendered = !0);
                var e = this.get("parentNode");
                return e && !i(this.element[0]) && this.element.appendTo(e), this._onRenderAlign(this.attrs.align), this
            },
            _initElement: function() {
                var e = this,
                    t = e.element;
                e._isTemplate || t.appendTo("body"), e.get("visible") || t.css("visibility", "hidden")
            },
            processMask: function() {
                var e = this,
                    t = a(this);
                e.get("mask") && (t.on("show", function() {
                    e.showMask()
                }), t.on("hide", function() {
                    e.hideMask()
                }))
            },
            _renderAndBindAttrs: function() {
                var e = this,
                    t = e.attrs;
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        var i = h + r(n);
                        if (this[i]) {
                            var a = this.get(n);
                            o(a) || this[i](a, void 0, n)
                        }
                    }
            },
            show: function() {
                var e = this,
                    t = e.get("effect");
                this.rendered || this.render(), "none" == t ? e.set("visible", !0) : e.animateEffectIn(t), a(e).trigger("show")
            },
            hide: function() {
                var e = this,
                    t = e.get("effect");
                return !(e.get("visible") && !e.get("closing")) || ("none" == t ? e.set("visible", !1) : e.animateEffectOut(t), void a(e).trigger("hide"))
            },
            _onRenderWidth: function(e) {
                this.element.css("width", e)
            },
            _onRenderHeight: function(e) {
                this.element.css("height", e)
            },
            _onRenderZIndex: function(e) {
                this.element.css("zIndex", e)
            },
            _onRenderVisible: function(e) {
                var t = e ? "visible" : "hidden";
                this.element.css("visibility", t), e ? a(this).trigger("show") : a(this).trigger("hide")
            },
            _onRenderClassName: function(e) {
                this.element.addClass(e)
            },
            destroy: function(e) {
                var t = this;
                t.get("mask") && (t.hideMask(), t.destroyMask()), this.element && (this.element.off(), this.element.remove()), this.element = null
            },
            get: function(e) {
                return void 0 === this.attrs[e] ? null : this.attrs[e]
            },
            set: function(e, t) {
                return this.attrs[e] = t, this[h + r(e)] && this[h + r(e)](t), this
            }
        }]), e.exports = p
    },
    function(e, t) {
        var n = function() {};
        n.ATTRS = {
            x: -999,
            y: -999,
            xy: {},
            zIndex: 99
        }, n.prototype = {
            _onRenderX: function(e) {
                null != e && this.element.css("left", e)
            },
            _onRenderY: function(e) {
                null != e && this.element.css("top", e)
            },
            _onRenderZIndex: function(e) {
                null != e && this.element.css("zIndex", e)
            },
            _onRenderXy: function(e) {
                this.set("x", e[0]), this.set("y", e[1])
            }
        }, e.exports = n
    },
    function(e, t, n) {
        "use strict";

        function i(e, t, n) {
            if (e = e || [], t === n) return e;
            for (var i = 0; i < t; i++) e.push({
                width: 100 / n + "%"
            });
            return e
        }
        var o = n(5),
            r = n(78),
            a = null;
        e.exports = {
            toast: function(e, t, n) {
                function i() {
                    a && (a.destroy(), a = null)
                }
                var s = n || 2e3,
                    c = {
                        content: e,
                        type: t || "none"
                    };
                try {
                    s = Number(s)
                } catch (l) {
                    s = 2e3
                }
                o.supportAlipayJSBridge() ? (c.duration = s, AlipayJSBridge.call("toast", c)) : (c.hideDelay = s, i(), a = new r(c), a.change(e, "none"), a.show(), setTimeout(function() {
                    i()
                }, s + 300))
            },
            evaluateList: function(e, t) {
                t = t || 3, e = e || "[]";
                try {
                    e = JSON.parse(e)
                } catch (n) {
                    console.log("\u8bc4\u4ef7\u914d\u7f6e\u683c\u5f0f\u6709\u8bef", n), e = []
                }
                for (var o = [], r = e.length, a = 0; a < r; a++) e[a].width = 100 / t + "%";
                for (var s = 0; s < r; s += t) {
                    var c = {};
                    c.list = e.splice(0, t), c.list = i(c.list, t - c.list.length % t, t), o.push(c)
                }
                return o
            }
        }
    },
    function(e, t, n) {
        "use strict";

        function i(e) {
            a("query", {}, function(t) {
                t = t || {}, console.log("queryResult", t);
                var n = {
                    icon: t.icon,
                    uri: t.uri,
                    createTime: t.createTime,
                    displayName: t.displayName,
                    bizMemo: t.bizMemo,
                    markAction: t.markAction,
                    redPointStyle: t.redPointStyle
                };
                "back" === e && (n.scene = "backClick"), r.seed("mypaBi", "socialMsgRead", "socialMsgReadQuery", n), t && t.icon && (n.unread = 0, a("update", n, function(e) {
                    console.log("updateResult", n, e), r.seed("mypaBi", "socialMsgRead", "socialMsgReadUpdate", n)
                }))
            })
        }
        var o = n(3),
            r = n(9),
            a = (n(5), function(e, t, n) {
                var i = "APSocialNebulaPlugin.updateRecentListExternal";
                "remove" === e ? i = "APSocialNebulaPlugin.removeRecentListExternal" : "query" === e && (i = "APSocialNebulaPlugin.queryRecentStatusExternal"), t = t || {}, t = o.extend({
                    itemType: "66",
                    itemId: "66"
                }, t), AlipayJSBridge.call(i, t, function(e) {
                    n && n(e)
                })
            });
        e.exports = i
    }, , , 27,
    function(e, t, n) {
        var i = Yocto = n(18);
        n(34), n(92), n(119), e.exports = i
    },
    function(e, t, n) {
        function i(e) {
            return "string" == typeof e
        }

        function o(e, t, n) {
            return e.replace(n || /\\?\{([^{}]+)\}/g, function(e, n) {
                return "\\" === e.charAt(0) ? e.slice(1) : void 0 === t[n] ? "" : t[n]
            })
        }
        var r = n(4),
            a = n(44),
            s = "am-dialog",
            c = s + "-header",
            l = s + "-body",
            u = s + "-footer",
            d = a.extend({
                attrs: {
                    buttons: [{
                        id: "cancel",
                        cls: "am-dialog-button cancel",
                        text: "\u53d6\u6d88",
                        handler: function() {
                            var e = this.get("cancel");
                            e && e.call(this)
                        }
                    }, {
                        id: "ok",
                        cls: "am-dialog-button",
                        text: "\u786e\u8ba4",
                        handler: function() {
                            var e = this.get("success");
                            e && e.call(this)
                        }
                    }],
                    content: "",
                    className: "",
                    title: "",
                    success: function() {
                        this.hide()
                    },
                    cancel: function() {
                        this.hide()
                    },
                    effect: "zoom",
                    x: -999,
                    y: -999,
                    xy: {},
                    zIndex: 99,
                    mask: !1,
                    maskNode: null,
                    maskEl: null,
                    maskTpl: '<div class="am-mask" style="width:100%;height:100%;top:0;left:0;"></div>',
                    duration: 400,
                    easing: "linear",
                    direction: "up",
                    align: {
                        type: "center"
                    },
                    btnTpl: '<button type="button" class="{cls}">{text}</button>',
                    template: '<div class="' + s + '"><div class="am-dialog-wrap"><div class="' + c + '"><h3></h3></div><div class="' + l + '"><p class="am-dialog-brief"></p></div><div class="' + u + '"></div></div></div>'
                },
                _onRenderTitle: function(e) {
                    var t = this,
                        n = t.element;
                    n.find("." + c + " h3").html(e)
                },
                _onRenderContent: function(e) {
                    var t = this,
                        n = t.element,
                        o = n.find("." + l + " .am-dialog-brief");
                    o.html(""), i(e) && !/^[.#]/.test(e) ? o.html(e) : r(e).appendTo(o)
                },
                show: function() {
                    this.element.css("position", "fixed"), this.element.attr("am-mode", "show"), d.superclass.show.call(this)
                },
                _onRenderButtons: function(e) {
                    var t = this,
                        n = t.element.find("." + u),
                        i = t.get("btnTpl");
                    n.html(""), r.each(e, function(e, a) {
                        var s = o(i, a),
                            c = r(s).appendTo(n);
                        a.id && t.set(a.id + "Btn", c), a.handler && c.on("click", function() {
                            a.handler.call(t)
                        })
                    })
                }
            });
        e.exports = d
    },
    function(e, t, n) {
        e.exports = n(79)
    },
    function(e, t, n) {
        var i = n(4),
            o = function(e) {
                this.attrs = {
                    hideDelay: 2e3,
                    animateDuration: 600,
                    content: null,
                    template: '<div class="am-toast" style="background-color: transparent;"></div>',
                    type: "none"
                }, e && "object" == typeof e && i.extend(this.attrs, e), this.setup()
            };
        o.prototype = {
            get: function(e) {
                return this.attrs[e]
            },
            set: function(e, t) {
                return this.attrs[e] = t
            },
            setup: function() {
                var e = this;
                e._initContent()
            },
            _initContent: function() {
                var e = this,
                    t = e._getElement(),
                    n = e._getInnerTpl(),
                    o = i(window).width();
                t.html(n), t.css({
                    left: (o - t.width()) / 2,
                    opacity: 0
                })
            },
            _getElement: function() {
                var e = this;
                if (!e.element && !e.created) {
                    var t = e.get("template"),
                        n = i(t).appendTo(i("body"));
                    e.element = n, e.created = !0
                }
                return e.element
            },
            _getInnerTpl: function() {
                var e = this,
                    t = e.get("content"),
                    n = e.get("type"),
                    i = "none" == n ? "" : '<span class="am-toast-icon am-icon-' + n + '"></span>',
                    o = '<div class="am-toast-text">' + i + t + "</div>";
                return o
            },
            change: function(e, t) {
                var n = this;
                n.set("content", e), n.set("type", t), n._initContent()
            },
            show: function() {
                var e = this;
                e.hide();
                var t = parseInt(e.get("animateDuration"), 10),
                    n = parseInt(e.get("hideDelay"), 10),
                    i = e._getElement(),
                    o = "opacity " + t / 1e3 + "s ease-in-out";
                e.showing = !0, e.timeflag && clearTimeout(e.timeflag), setTimeout(function() {
                    i.css({
                        "-webkit-transition": o,
                        transition: o,
                        "z-index": 99,
                        visibility: "visible",
                        opacity: 1
                    }), e.timeflag = setTimeout(function() {
                        e.timeflag = !1, e._hide()
                    }, n || 2e3)
                }, 16), e.set("visible", !0)
            },
            hide: function() {
                var e = this,
                    t = e._getElement();
                t.css({
                    visibility: "hidden",
                    "-webkit-transition": "initial",
                    transition: "initial",
                    opacity: 0
                })
            },
            _hide: function() {
                var e = this,
                    t = e._getElement(),
                    n = parseInt(e.get("animateDuration"), 10);
                t.css({
                    opacity: 0
                }), setTimeout(function() {
                    e.timeflag || t.css({
                        visibility: "hidden",
                        opacity: 0
                    })
                }, n + 16), e.set("visible", !1)
            },
            destroy: function() {
                var e = this,
                    t = e._getElement();
                t.remove();
                for (var n in e) e.hasOwnProperty(n) && delete e[n];
                e.destroy = function() {}
            }
        }, e.exports = o
    }, , , ,
    function(e, t, n) {
        "use strict";
        var i = n(178),
            o = n(61),
            r = n(31),
            a = function(e) {
                e = e || {}, this.validType = e.validType || [], this.storageKey = e.storageKey, this.counts = e.counts || 3
            };
        a.prototype = {
            hid: function() {
                return i(16)
            },
            validHistory: function() {
                return this.getAllHistory().length
            },
            isArray: function(e) {
                return "[object Array]" === toString.call(e)
            },
            isString: function(e) {
                return "[object String]" === toString.call(e)
            },
            getExt: function() {
                var e = o.get(this.storageKey + "-exts"),
                    t = [];
                return e && (t = e.split("=") || []), {
                    endTime: t[0] || "",
                    msgId: t[1] || "",
                    displayTime: t[2] || ""
                }
            },
            save: function(e) {
                if (r.isLogin(window.CHATCONFIG.userId) && "0" !== window.CHATCONFIG.keepHistory) {
                    e = e || [], console.log("save-message", e);
                    for (var t = {}, n = this.getAllHistory(), i = 0, o = e.length; i < o; i++) t = e[i], this.validType.indexOf(t.messageType) > -1 && 7 !== t.msgType && (n = this.chkCounts(n), n.push(t), this.setStorage(n), this.recordLastParams(i, o, e))
                }
            },
            recordLastParams: function(e, t, n) {
                var i = "",
                    r = "",
                    a = "";
                e === t - 1 && (n[e].gmtCreate && (i = n[e].gmtCreate), n[e].msgId && (r = n[e].msgId), n[e].displayTime && (a = n[e].displayTime), o.set(this.storageKey + "-exts", i + "=" + r + "=" + a))
            },
            chkCounts: function(e) {
                return e = e || [], e.length > this.counts - 1 && e.splice(0, 1), e
            },
            refactorDisplayType: function(e) {
                e = e || {};
                var t = "";
                return e.answerContent && (t = "text"), e.answerContent && e.knowledges && e.knowledges.length && (t = "text-list"), !e.answerContent && e.knowledges && e.knowledges.length && (t = "list"), "7" === e.knowType && (t = "card"), t
            },
            del: function(e) {
                var t = this.getAllHistory();
                if (this.isString(e)) {
                    var n = this.getIndexById(e);
                    t.splice(n, 1)
                }
                if (this.isArray(e))
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i],
                            n = this.getIndexById(r);
                        t.splice(n, 1)
                    }
                console.log("\u5220\u9664\u540e\u7684\u6570\u636e:", t), this.setStorage(t), console.log("\u5220\u9664\u540elocastorage\u91cc\u7684\u6570\u636e:", o.get(this.storageKey))
            },
            setStorage: function(e) {
                e = JSON.stringify(e), o.set(this.storageKey, e)
            },
            getHistoryById: function(e, t) {
                var t = this.getAllHistory(),
                    n = this.getIndexById(e);
                return t[n]
            },
            getIndexById: function(e) {
                for (var t = this.getAllHistory(), n = null, i = 0; i < t.length; i++) {
                    var o = t[i];
                    if (e === o.hid) {
                        n = i;
                        break
                    }
                }
                return n
            },
            getInitHistory: function() {
                var e = o.get(this.storageKey);
                try {
                    e = JSON.parse(e)
                } catch (t) {
                    e = []
                }
                return e.splice(-3)
            },
            getAllHistory: function() {
                var e = o.get(this.storageKey);
                try {
                    e = JSON.parse(e)
                } catch (t) {
                    e = []
                }
                return e
            }
        };
        var s = {
            save: function() {}
        };
        s = new a({
            validType: ["visitor", "robot", "robot-card", "online"],
            storageKey: "hchat-" + USERID,
            counts: 3
        }), e.exports = s
    }, , , , , , , ,
    function(e, t, n) {
        var i = n(4),
            o = n(77),
            r = o.extend({
                _onRenderMessage: function(e) {
                    this.set("content", e)
                },
                _onRenderOkButton: function(e) {
                    if (this.rendered) {
                        var t = this.get("okBtn");
                        t && t.text(e)
                    }
                },
                _onRenderCancelButton: function(e) {
                    if (this.rendered) {
                        var t = this.get("cancelBtn");
                        t && t.text(e)
                    }
                }
            }),
            a = null;
        r.show = function(e, t) {
            if (a || (a = new r(i.extend({}, {
                    message: "",
                    okButton: "",
                    cancelButton: "",
                    className: "",
                    callback: null,
                    mask: !0,
                    success: function() {
                        var e = this.get("callback");
                        e && e({
                            ok: !0
                        }), this.hide()
                    },
                    cancel: function() {
                        var e = this.get("callback");
                        e && e({
                            ok: !1
                        }), this.hide()
                    }
                }, e)), a.render()), e)
                for (var n in e) e.hasOwnProperty(n) && a.set(n, e[n]);
            return a.set("callback", t), a.show(), a
        }, r.hide = function() {
            a && a.hide()
        }, e.exports = r
    },
    function(e, t, n) {
        var i = Yocto = n(18);
        n(34), Gesture = {
            init: function(e) {
                var t = this,
                    n = t[e],
                    o = function(t) {
                        function o(e) {
                            n.handler.touchmove(e)
                        }

                        function r(e) {
                            n.handler.touchend(e), document.removeEventListener("touchmove", o, !1), document.removeEventListener("touchend", r, !1), document.removeEventListener("touchcancel", a, !1)
                        }

                        function a(e) {
                            n.handler.touchcancel(e), document.removeEventListener("touchmove", o, !1), document.removeEventListener("touchend", r, !1), document.removeEventListener("touchcancel", a, !1)
                        }
                        var s = i(t);
                        s.data(e) || s.data(e, 1).forEach(function(e) {
                            e.addEventListener("touchstart", function(e) {
                                n.handler.touchstart(e), document.addEventListener("touchmove", o, !1), document.addEventListener("touchend", r, !1), document.addEventListener("touchcancel", a, !1)
                            }, !1)
                        })
                    };
                n.events.forEach(function(e) {
                    t.list[e] = o, i.fn[e] = function(t) {
                        return this.on(e, t)
                    }
                })
            },
            list: {}
        }, i.gestures = Gesture, e.exports = i
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t, n, i, o, r, a, s, c, l, u, d, h) {
                var p = '<section class="J-wrap-answer-section ';
                return e && (p += "J-card-message-wrap card-"), p += "message-wrap ", p += t, p += '" data-libversion="', p += n, p += '" data-message-type="', p += i, p += '" ', o && (p += ' data-chatid="', p += o, p += '" '), p += " message-wrap ", p += t, p += '"> ', r && /robot/.test(t) && (p += '<div class="service-avatar"><img src="', p += r, p += '" /></div>'), p += ' <div class="message"> <div class="bubble-arrow"></div> ', "article" === t && a && (p += ' <div class="answer-header"> <h2> <i class="guide-detail-icon check"></i>', p += a, p += "</h2> </div> "), p += ' <!-- \u6709title\u5219\u4f7f\u7528\u4e0d\u540c\u7684border --> <article class="answer-wrap J-answer-wrap ', "article" !== t || e || s || (p += "hide-content"), p += '"> ', c && (p += ' <div class="J-answerContent-wrap answer-inner-wrap">', p += c, p += "</div> "), p += " <!-- \u5f53list\u7c7b\u578b\u65f6\u6ca1\u6709\u5185\u5bb9 --> ", (l && l.length || "list" === t) && (u && (p += ' <h4 class="similar-h">', p += u, p += "</h4> "), p += ' <ul class="similar-list J-similar-list" ', d && (p += ' data-displaytype= "', p += d, p += '" '), h && (p += ' data-questiontype="', p += h, p += '" '), p += "> ", l.forEach(function(e) {
                    p += ' <li class="J-know-list" data-libversion="', p += e.libraryVersion, p += '" ', h && (p += ' data-questiontype="', p += h, p += '" '), p += ' data-id="', p += e.knowledgeId, p += '">', p += e.title, p += "</li> "
                }), p += " </ul> "), p += " </article>     ", "article" !== t || e || s || (p += ' <div class="show-more J-article-show-more">\u5c55\u5f00\u67e5\u770b\u5b8c\u6574\u5185\u5bb9<span class="arrow-down"></span></div> '), p += " </div></section>"
            }(e.card, e.styleType, e.libraryVersion, e.messageType, e.rechatid, e.serviceAvatar, e.answerTitle, e.hasRefAnswer, e.answerContent, e.similarQuestions, e.similarHeader, e.displayType, e.questionType)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t, n, i, o) {
                var r = '<section class="message-wrap visitor" data-message-type="';
                return r += e, r += '"> <div class="message" style="background-color:', r += t, r += ";border-color:", r += n, r += '"> <div class="bubble-arrow" style="background-color:', r += t, r += ";border-color:", r += n, r += '"></div> <article class="ask-wrap">', r += i, r += '</article> </div> <div class="visitor-avatar"><img src="', r += o, r += '" /></div></section>'
            }(e.messageType, e.msgBubbleBgColor, e.msgBubbleBorderColor, e.question, e.avatar)
        }
    }, ,
    function(e, t) {
        "use strict";
        var n = {
            replacer: {
                "\u32a3URL": function(e) {
                    return ['<a class="url" href="', n.addTarget(e), '" target="_blank">', e, "</a>"].join("")
                },
                "\u32a3WURL": function(e) {
                    return ['<a class="warn-url" href="', n.addTarget(e), '" target="_blank">', e, '</a><img src="https://img.alipay.com/sys/clive/style/client/warn-url.png" alt="\u8be5\u94fe\u63a5\u672a\u901a\u8fc7\u5b89\u5168\u68c0\u6d4b\uff0c\u6253\u5f00\u9700\u8c28\u614e" />'].join("")
                },
                "\u32a3SYS": function(e) {
                    return ["<div><span>", n.messageParser(e), "</span></div>"].join("")
                },
                "\u32a3USR": function(e) {
                    return ["<span>", e, "</span>"].join("")
                },
                "\u32a3SER": function(e) {
                    return ['<span class="fn-hide">', e, "</span>"].join("")
                },
                "\u32a3MEM": function(e) {
                    return ['<span class="name">', e, "</span>"].join("")
                },
                "\u32a3TIME": function(e) {
                    return ['<time class="fn-hide">', e.split(" ")[1], "</time>"].join("")
                },
                "\u32a3IMG": function(e) {
                    return ['<a href="', n.addTarget(e), '" target="_blank"><img class="uploaded-image" src="', e, '"/></a>'].join("")
                },
                "\u32a3CONTENT": function(e) {
                    return ["<div>", n.messageParser(e || ""), "</div>"].join("")
                },
                "\u32a3MSG": function(e) {
                    return n.messageParser(e || "")
                },
                "\u32a3AVATAR": function(e) {
                    return USERPORTRAITLINK ? ['<img class="avatar-img" src=' + USERPORTRAITLINK + ">"].join("") : ['<img class="avatar-img" src="https://i.alipayobjects.com/i/ecmng/png/201404/2O3wkbrumj.png"/>'].join("")
                }
            },
            addTarget: function(e) {
                var t, n = e.split(/#/),
                    e = n[0],
                    i = n[1] || "";
                return n = e.split(/\?/), e = n[0], t = n[1] || "", t += t ? "&target=_blank" : "target=_blank", t = "?" + t, i && (i = "#" + i), e + t + i
            },
            messageParser: function(e) {
                try {
                    var t = this,
                        n = /(?:\[(\u32a3\w+)\])([\s\S]*?)(?:\[\/\1\])/gm;
                    e = e.replace(n, function(e, n, i) {
                        var o = t.replacer[n];
                        return o ? o(i) : i
                    })
                } catch (i) {}
                return e
            }
        };
        e.exports = n
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(44),
            r = n(29),
            a = n(158),
            s = (n(35), n(31)),
            c = n(7),
            l = r.extend({
                attr: {
                    model: {},
                    submit: function() {},
                    cancel: function() {}
                },
                setup: function() {
                    this.ctuPop = null
                },
                render: function() {
                    var e = this;
                    this.model = this.get("model"), e.ctuPop = new o({
                        template: a(e.model),
                        width: "100%",
                        mask: !0,
                        align: {
                            type: "center"
                        },
                        effect: "zoom"
                    }), s.packUpkeyBoard(function() {
                        s.packUpkeyBoard(function() {
                            e.ctuPop.show();
                            var t = e.ctuPop.element,
                                n = t.find(".J-ipt"),
                                i = t.find(".J-sub"),
                                o = t.find(".J-cancel"),
                                r = t.find(".J-errMsg");
                            e.bindEvents(e.ctuPop, n, i, o, r)
                        })
                    })
                },
                bindEvents: function(e, t, n, o, r) {
                    var a = this,
                        s = i(e.element);
                    "android" === c.os.name && (t.on("focus", function() {
                        s.data("cacheTop", s.css("top")), s.css("top", "30px"), console.log("focus")
                    }), t.on("blur", function() {
                        s.css("top", s.data("cacheTop")), console.log("blur")
                    })), n.on("tap", function() {
                        a.validate(t, r) && (a.get("submit") && a.get("submit")(a._strCntoEn(i.trim(t.val())), t), e.destroy())
                    }), o.on("tap", function() {
                        a.get("cancel") && a.get("cancel")(t), e.destroy()
                    })
                },
                destroy: function() {
                    this.ctuPop.destroy()
                },
                _strCntoEn: function(e) {
                    for (var t = ["\uff08", "\uff09", "\uff0b", "\uff0d"], n = ["(", ")", "+", "-"], i = 0, o = t.length; i < o; i++) {
                        var r = new RegExp(t[i]);
                        e.match(r) && (e = e.replace(r, n[i]))
                    }
                    return e
                },
                validate: function(e, t) {
                    var n = this._strCntoEn(i.trim(e.val())),
                        o = new RegExp(this.model.reg);
                    return n.length ? o && !o.test(n) ? (this.err(e, t), e.select(), !1) : (this.ok(e, t), !0) : (this.err(e, t), e.select(), !1)
                },
                ok: function(e, t) {
                    e.css("border", "solid 1px #b9b9b9"), t.addClass("fn-hide")
                },
                err: function(e, t) {
                    e.css("border", "solid 1px red"), t.removeClass("fn-hide")
                }
            });
        e.exports = l
    }, , , , ,
    function(e, t, n) {
        e.exports = n(104)
    },
    function(e, t, n) {
        var i, o = n(4),
            r = n(77),
            a = r.extend({
                _onRenderMessage: function(e) {
                    this.set("content", e)
                },
                _onRenderButton: function(e) {
                    var t = this;
                    if (t.rendered) {
                        var n = t.get("okBtn");
                        n.text(e)
                    }
                }
            });
        a.show = function(e, t) {
            if (i || (i = new a(o.extend({}, {
                    message: "",
                    button: "\u786e\u8ba4",
                    className: "",
                    mask: !0,
                    buttons: [{
                        id: "ok",
                        cls: "am-dialog-button",
                        text: "\u786e\u8ba4",
                        handler: function() {
                            var e = this.get("success");
                            e && e.call(this)
                        }
                    }]
                }, e)), i.render()), e)
                for (var n in e) e.hasOwnProperty(n) && i.set(n, e[n]);
            return i.set("success", function() {
                t && t.call(i), i.hide()
            }), i.show(), i
        }, a.hide = function() {
            i && i.hide()
        }, e.exports = a
    },
    function(e, t, n) {
        n(172);
        var i = n(77),
            o = n(103),
            r = n(91),
            a = n(105);
        i.Alert = o, i.Confirm = r, i.Prompt = a, e.exports = i
    },
    function(e, t, n) {
        var i = n(4),
            o = n(91),
            r = o.extend({
                _getValue: function() {
                    var e = this,
                        t = e.element.find("input");
                    return t.val()
                },
                setup: function() {
                    r.superclass.setup.call(this), this.bindInputEvent()
                },
                bindInputEvent: function() {
                    var e = this;
                    e.element.on("keyup change input", function() {
                        e._valid()
                    })
                },
                _valid: function() {
                    var e = this,
                        t = e._getValue(),
                        n = e.get("okBtn");
                    if (e.get("required") && !t) n.attr("disabled", "disabled");
                    else {
                        var i = n[0];
                        i && i.removeAttribute("disabled")
                    }
                },
                _onRenderValue: function(e) {
                    var t = this;
                    if (t.rendered) {
                        var n = t.element.find("input");
                        n.val(e), t._valid()
                    }
                },
                _onRenderInputTpl: function(e) {
                    this.set("content", e, !0)
                },
                _onRenderRequired: function(e) {
                    this.rendered && this._valid()
                }
            }),
            a = null;
        r.show = function(e, t) {
            if (a || (a = new r(i.extend({}, {
                    value: "",
                    required: !1,
                    className: "",
                    inputTpl: '<input type="text" class="am-password-former"/>',
                    success: function() {
                        var e = this.get("callback");
                        e && e({
                            ok: !0,
                            value: this._getValue()
                        }), this.set("value", ""), this.hide()
                    }
                }, e)), a.render()), e)
                for (var n in e) e.hasOwnProperty(n) && a.set(n, e[n]);
            return a.set("callback", t), a.show(), a
        }, r.hide = function() {
            a && a.hide()
        }, e.exports = r
    },
    function(e, t, n) {
        var i = n(4);
        n(108), n(110), n(107), n(109), e.exports = i
    },
    function(e, t, n) {
        var i = n(4);
        n(76);
        var o = i.gestures,
            r = {};
        o.drag = {
            events: ["dragStart", "drag", "dragEnd"],
            handler: {
                touchstart: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            i = {};
                        for (var o in n) i[o] = n[o];
                        var a = {
                            startTouch: i,
                            startTime: Date.now(),
                            status: "tapping",
                            element: e.target
                        };
                        r[n.identifier] = a
                    }
                },
                touchmove: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = r[n.identifier];
                        if (!o) return;
                        o.lastTouch || (o.lastTouch = o.startTouch), o.lastTime || (o.lastTime = o.startTime), o.velocityX || (o.velocityX = 0), o.velocityY || (o.velocityY = 0), o.duration || (o.duration = 0);
                        var a = Date.now() - o.lastTime,
                            s = (n.clientX - o.lastTouch.clientX) / a,
                            c = (n.clientY - o.lastTouch.clientY) / a,
                            l = 70;
                        a > l && (a = l), o.duration + a > l && (o.duration = l - a), o.velocityX = (o.velocityX * o.duration + s * a) / (o.duration + a), o.velocityY = (o.velocityY * o.duration + c * a) / (o.duration + a), o.duration += a, o.lastTouch = {};
                        for (var u in n) o.lastTouch[u] = n[u];
                        o.lastTime = Date.now();
                        var d = n.clientX - o.startTouch.clientX,
                            h = n.clientY - o.startTouch.clientY,
                            p = Math.sqrt(Math.pow(d, 2) + Math.pow(h, 2));
                        "tapping" === o.status && p > 10 && (o.status = "panning", o.isVertical = !(Math.abs(d) > Math.abs(h)), i(o.element).trigger(i.Event("dragStart", {
                            touch: n,
                            touchEvent: e,
                            isVertical: o.isVertical
                        }))), "panning" === o.status && (o.panTime = Date.now(), i(o.element).trigger(i.Event("drag", {
                            displacementX: d,
                            displacementY: h,
                            touch: n,
                            touchEvent: e,
                            isVertical: o.isVertical
                        })))
                    }
                    e.preventDefault()
                },
                touchend: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = n.identifier,
                            a = r[o];
                        if (a) {
                            if ("panning" === a.status) {
                                var s = Date.now(),
                                    c = s - a.startTime,
                                    l = ((n.clientX - a.startTouch.clientX) / c, (n.clientY - a.startTouch.clientY) / c, n.clientX - a.startTouch.clientX),
                                    u = n.clientY - a.startTouch.clientY,
                                    d = Math.sqrt(a.velocityY * a.velocityY + a.velocityX * a.velocityX),
                                    h = d > .5 && s - a.lastTime < 100,
                                    p = {
                                        duration: c,
                                        isflick: h,
                                        velocityX: a.velocityX,
                                        velocityY: a.velocityY,
                                        displacementX: l,
                                        displacementY: u,
                                        touch: n,
                                        touchEvent: e,
                                        isVertical: a.isVertical
                                    };
                                i(a.element).trigger(i.Event("dragEnd", p))
                            }
                            delete r[o]
                        }
                    }
                },
                touchcancel: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = n.identifier,
                            a = r[o];
                        a && ("panning" === a.status && i(a.element).trigger(i.Event("dragEnd", {
                            touch: n,
                            touchEvent: e
                        })), delete r[o])
                    }
                }
            }
        }, o.init("drag"), e.exports = i
    },
    function(e, t, n) {
        var i = n(4);
        n(76);
        var o = i.gestures,
            r = {},
            a = null;
        o.multipleTap = {
            events: ["longTap", "doubleTap"],
            handler: {
                touchstart: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = {};
                        for (var a in n) o[a] = n[a];
                        var s = {
                            startTouch: o,
                            startTime: Date.now(),
                            status: "tapping",
                            element: e.target,
                            pressingHandler: setTimeout(function(t) {
                                return function() {
                                    "tapping" === s.status && (s.status = "pressing", i(t).trigger(i.Event("longTap", {
                                        touchEvent: e
                                    }))), clearTimeout(s.pressingHandler), s.pressingHandler = null
                                }
                            }(e.target), 500)
                        };
                        r[n.identifier] = s
                    }
                },
                touchmove: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            i = r[n.identifier];
                        if (!i) return;
                        i.lastTouch || (i.lastTouch = i.startTouch), i.lastTime || (i.lastTime = i.startTime), i.velocityX || (i.velocityX = 0), i.velocityY || (i.velocityY = 0), i.duration || (i.duration = 0);
                        var o = Date.now() - i.lastTime,
                            a = (n.clientX - i.lastTouch.clientX) / o,
                            s = (n.clientY - i.lastTouch.clientY) / o,
                            c = 70;
                        o > c && (o = c), i.duration + o > c && (i.duration = c - o), i.velocityX = (i.velocityX * i.duration + a * o) / (i.duration + o), i.velocityY = (i.velocityY * i.duration + s * o) / (i.duration + o), i.duration += o, i.lastTouch = {};
                        for (var l in n) i.lastTouch[l] = n[l];
                        i.lastTime = Date.now();
                        var u = n.clientX - i.startTouch.clientX,
                            d = n.clientY - i.startTouch.clientY,
                            h = Math.sqrt(Math.pow(u, 2) + Math.pow(d, 2));
                        h > 10 && i.pressingHandler && (clearTimeout(i.pressingHandler), i.pressingHandler = null, "tapping" !== i.status && "pressing" !== i.status || (i.status = "panning"))
                    }
                },
                touchend: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = n.identifier,
                            s = r[o];
                        s && (s.pressingHandler && (clearTimeout(s.pressingHandler), s.pressingHandler = null), "tapping" === s.status && (s.timestamp = Date.now(), a && s.timestamp - a.timestamp < 300 && i(s.element).trigger(i.Event("doubleTap", {
                            touch: n,
                            touchEvent: e
                        })), a = s), delete r[o])
                    }
                },
                touchcancel: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            i = n.identifier,
                            o = r[i];
                        o && (o.pressingHandler && (clearTimeout(o.pressingHandler), o.pressingHandler = null), delete r[i])
                    }
                }
            }
        }, o.init("multipleTap"), e.exports = i
    },
    function(e, t, n) {
        var i = n(4);
        n(76);
        var o = i.gestures,
            r = {},
            a = function(e, t) {
                for (var n = e; n;) {
                    if (n.contains(t) || n == t) return n;
                    n = n.parentNode
                }
                return null
            },
            s = function(e, t, n, i, o, r, a, s) {
                var c = Math.atan2(s - r, a - o) - Math.atan2(i - t, n - e),
                    l = Math.sqrt((Math.pow(s - r, 2) + Math.pow(a - o, 2)) / (Math.pow(i - t, 2) + Math.pow(n - e, 2))),
                    u = [o - l * e * Math.cos(c) + l * t * Math.sin(c), r - l * t * Math.cos(c) - l * e * Math.sin(c)];
                return {
                    rotate: c,
                    scale: l,
                    translate: u,
                    matrix: [
                        [l * Math.cos(c), -l * Math.sin(c), u[0]],
                        [l * Math.sin(c), l * Math.cos(c), u[1]],
                        [0, 0, 1]
                    ]
                }
            };
        o.pinch = {
            events: ["pinchStart", "pinch", "pinchIn", "pinchOut", "pinchEnd"],
            handler: {
                touchstart: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = {};
                        for (var s in n) o[s] = n[s];
                        var c = {
                            startTouch: o,
                            startTime: Date.now(),
                            status: "tapping",
                            element: e.target
                        };
                        r[n.identifier] = c
                    }
                    if (2 == Object.keys(r).length) {
                        var l = [];
                        for (var s in r) l.push(r[s].element);
                        i(a(l[0], l[1])).trigger(i.Event("pinchStart", {
                            touches: Array.prototype.slice.call(e.touches),
                            touchEvent: e
                        }))
                    }
                },
                touchmove: function(e) {
                    if (2 == Object.keys(r).length) {
                        for (var t, n = [], o = [], c = [], l = 0; l < e.touches.length; l++) {
                            var u = e.touches[l],
                                d = r[u.identifier];
                            n.push([d.startTouch.clientX, d.startTouch.clientY]), o.push([u.clientX, u.clientY])
                        }
                        for (var h in r) c.push(r[h].element);
                        t = s(n[0][0], n[0][1], n[1][0], n[1][1], o[0][0], o[0][1], o[1][0], o[1][1]), i(a(c[0], c[1])).trigger(i.Event("pinch", {
                            scale: t.scale,
                            touches: e.touches,
                            touchEvent: e
                        })), t.scale > 1 ? i(a(c[0], c[1])).trigger(i.Event("pinchOut", {
                            transform: t,
                            touches: e.touches,
                            touchEvent: e
                        })) : i(a(c[0], c[1])).trigger(i.Event("pinchIn", {
                            transform: t,
                            touches: e.touches,
                            touchEvent: e
                        }))
                    }
                    e.preventDefault()
                },
                touchend: function(e) {
                    if (2 == Object.keys(r).length) {
                        var t = [];
                        for (var n in r) t.push(r[n].element);
                        i(a(t[0], t[1])).trigger(i.Event("pinchEnd", {
                            touches: Array.prototype.slice.call(e.touches),
                            touchEvent: e
                        }))
                    }
                    for (var o = 0; o < e.changedTouches.length; o++) {
                        var s = e.changedTouches[o],
                            c = s.identifier,
                            l = r[c];
                        l && delete r[c]
                    }
                },
                touchcancel: function(e) {
                    if (2 == Object.keys(r).length) {
                        var t = [];
                        for (var n in r) t.push(r[n].element);
                        i(a(t[0], t[1])).trigger(i.Event("pinchEnd", {
                            touches: Array.prototype.slice.call(e.touches),
                            touchEvent: e
                        }))
                    }
                    for (var o = 0; o < e.changedTouches.length; o++) {
                        var s = e.changedTouches[o],
                            c = s.identifier,
                            l = r[c];
                        l && delete r[c]
                    }
                }
            }
        }, o.init("pinch"), e.exports = i
    },
    function(e, t, n) {
        var i = n(4);
        n(76);
        var o = i.gestures,
            r = {};
        o.swipe = {
            events: ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown"],
            handler: {
                touchstart: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            i = {};
                        for (var o in n) i[o] = n[o];
                        var a = {
                            startTouch: i,
                            startTime: Date.now(),
                            status: "tapping",
                            element: e.target
                        };
                        r[n.identifier] = a
                    }
                },
                touchmove: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            i = r[n.identifier];
                        if (!i) return;
                        "undefined" == typeof i._movestart && (i._movestart = !!(i._movestart || Math.abs(i._disX) < Math.abs(i._disY))), i.lastTouch || (i.lastTouch = i.startTouch), i.lastTime || (i.lastTime = i.startTime), i.velocityX || (i.velocityX = 0), i.velocityY || (i.velocityY = 0), i.duration || (i.duration = 0);
                        var o = Date.now() - i.lastTime;
                        if (o > 0) {
                            var a = (n.clientX - i.lastTouch.clientX) / o,
                                s = (n.clientY - i.lastTouch.clientY) / o,
                                c = 70;
                            o > c && (o = c), i.duration + o > c && (i.duration = c - o), i.velocityX = (i.velocityX * i.duration + a * o) / (i.duration + o), i.velocityY = (i.velocityY * i.duration + s * o) / (i.duration + o), i.duration += o, i.lastTouch = {};
                            for (var l in n) i.lastTouch[l] = n[l];
                            i.lastTime = Date.now();
                            var u = n.clientX - i.startTouch.clientX,
                                d = n.clientY - i.startTouch.clientY;
                            Math.sqrt(Math.pow(u, 2) + Math.pow(d, 2));
                            i.isVertical = !(Math.abs(u) > Math.abs(d))
                        }
                    }
                },
                touchend: function(e) {
                    for (var t = 0; t < e.changedTouches.length; t++) {
                        var n = e.changedTouches[t],
                            o = n.identifier,
                            a = r[o];
                        if (a) {
                            var s = Date.now(),
                                c = s - a.startTime,
                                l = ((n.clientX - a.startTouch.clientX) / c, (n.clientY - a.startTouch.clientY) / c, n.clientX - a.startTouch.clientX),
                                u = n.clientY - a.startTouch.clientY,
                                d = Math.sqrt(a.velocityY * a.velocityY + a.velocityX * a.velocityX),
                                h = d > .5 && s - a.lastTime < 150,
                                p = {
                                    duration: c,
                                    isflick: h,
                                    velocityX: a.velocityX,
                                    velocityY: a.velocityY,
                                    displacementX: l,
                                    displacementY: u,
                                    touch: n,
                                    touchEvent: e,
                                    isVertical: a.isVertical
                                };
                            h && (i(a.element).trigger(i.Event("swipe", p)), a.isVertical ? i(a.element).trigger(i.Event(u > 0 ? "swipeDown" : "swipeUp", p)) : i(a.element).trigger(i.Event(l > 0 ? "swipeRight" : "swipeLeft", p))), delete r[o]
                        }
                    }
                }
            }
        }, o.swipe.handler.touchcancel = o.swipe.handler.touchend, o.init("swipe"), e.exports = i
    }, , , , , , , , ,
    function(e, t, n) {
        var i = Yocto = n(18);
        n(34), n(92);
        var o = i.gestures,
            r = navigator.userAgent.toLowerCase().indexOf("android") > 0,
            a = /ip(ad|hone|od)/.test(navigator.userAgent.toLowerCase()),
            s = {
                trackingClick: !1,
                trackingClickStart: 0,
                targetElement: null,
                touchStartX: 0,
                touchStartY: 0,
                touchBoundary: 10,
                tapDelay: 200,
                sendClick: function(e, t) {
                    var n = i.Event("tap", {
                        animaTap: !0
                    });
                    i(e).trigger(n);
                    var o, r;
                    document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], o = document.createEvent("MouseEvents"), o.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), o.animaClick = !0, e.dispatchEvent(o)
                },
                needClick: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "button":
                        case "select":
                        case "textarea":
                            if (e.disabled) return !0;
                            break;
                        case "input":
                            if (a && "file" === e.type || e.disabled) return !0;
                            break;
                        case "label":
                        case "iframe":
                        case "video":
                            return !0
                    }
                    return !1
                },
                focus: function(e) {
                    var t;
                    a && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
                },
                needFocus: function(e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "textarea":
                        case "select":
                            return !0;
                        case "input":
                            switch (e.type) {
                                case "button":
                                case "checkbox":
                                case "file":
                                case "image":
                                case "radio":
                                case "submit":
                                    return !1
                            }
                            return !e.disabled && !e.readOnly;
                        default:
                            return !1
                    }
                },
                updateScrollParent: function(e) {
                    var t, n;
                    if (t = e.yoctoTouchScrollParent, !t || !t.contains(e)) {
                        n = e;
                        do {
                            if (n.scrollHeight > n.offsetHeight) {
                                t = n, e.yoctoTouchScrollParent = n;
                                break
                            }
                            n = n.parentElement
                        } while (n)
                    }
                    t && (t.yoctoTouchLastScrollTop = t.scrollTop)
                },
                findControl: function(e) {
                    return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
                },
                touchHasMoved: function(e) {
                    var t = e.changedTouches[0],
                        n = s.touchBoundary;
                    return Math.abs(t.pageX - s.touchStartX) > n || Math.abs(t.pageY - s.touchStartY) > n
                },
                fixTarget: function(e) {
                    return window.SVGElementInstance && e instanceof SVGElementInstance && (e = e.correspondingUseElement), e
                }
            };
        o.tap = {
            events: ["tap", "click"],
            handler: {
                touchstart: function(e) {
                    var t, n, i;
                    if (e.targetTouches.length > 1) return !0;
                    if (t = s.fixTarget(e.target), n = e.targetTouches[0], a) {
                        if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
                        s.updateScrollParent(t)
                    }
                    return s.trackingClick = !0, s.trackingClickStart = e.timeStamp, s.targetElement = t, s.touchStartX = n.pageX, s.touchStartY = n.pageY, e.timeStamp - s.lastClickTime < s.tapDelay && e.preventDefault(), !0
                },
                touchmove: function(e) {
                    return !s.trackingClick || ((s.targetElement !== s.fixTarget(e.target) || s.touchHasMoved(e)) && (s.trackingClick = !1, s.targetElement = null), !0)
                },
                touchend: function(e) {
                    var t, n, i, o, c = s.targetElement;
                    if (!s.trackingClick) return !0;
                    if (e.timeStamp - s.lastClickTime < s.tapDelay) return s.cancelNextClick = !0, !0;
                    if (s.cancelNextClick = !1, s.lastClickTime = e.timeStamp, n = s.trackingClickStart, s.trackingClick = !1, s.trackingClickStart = 0, i = c.tagName.toLowerCase(), "label" === i) {
                        if (t = s.findControl(c)) {
                            if (s.focus(c), r) return !1;
                            c = t
                        }
                    } else if (s.needFocus(c)) return e.timeStamp - n > 100 || a && window.top !== window && "input" === i ? (s.targetElement = null, !1) : (s.focus(c), r && s.sendClick(c, e), !1);
                    return !(!a || (o = c.yoctoTouchScrollParent, !o || o.yoctoTouchLastScrollTop === o.scrollTop)) || (s.needClick(c) || (e.preventDefault(), s.sendClick(c, e)), !1)
                },
                touchcancel: function(e) {
                    s.trackingClick = !1, s.targetElement = null
                }
            }
        }, o.init("tap");
        var c = Event.prototype.initEvent;
        Event.prototype.initEvent = function() {
            var e = Array.prototype.slice.call(arguments);
            c.apply(this, e), "click" === e[0] && (this.animaClick = !0)
        }, e.exports = i
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e) {
                var t = '<div class="ats-dialog" am-mode="show"> <div class="am-dialog-wrap"> ';
                return e && e.length > 0 && e.forEach(function(e) {
                    t += ' <div class="am-dialog-header" id="', t += e.group_value, t += '">', t += e.group_name, t += "</div> "
                }), t += " </div></div>"
            }(e.model)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function() {
                var e = '<div class="" am-mode="show"><div class="ats-login-card"><div class="ats-login-header"><i class="icon-card-hs"></i><div class = "icon-card-title" >\u5546\u6237\u8eab\u4efd\u8bc6\u522b</div></div><div class="ats-login-content " ><input class="ats-input"  name="atsLgoinPid" id="atsLgoinPid" value="" placeholder="\u8bf7\u8f93\u5165\u7b7e\u7ea6\u652f\u4ed8\u5b9d\u8d26\u53f7\u6216ParterID"></div><p class="ats-login-info">\u4e3a\u4e86\u66f4\u597d\u5730\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u8bf7\u8f93\u5165\u7b7e\u7ea6\u652f\u4ed8\u5b9d\u8d26\u53f7\u6216PartnerID</p><div class="ats-login-footer" ><button type="button" class="ats-login-btn ats-login-btn-disabled">\u786e\u8ba4</button></div></div></div>';
                return e
            }()
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e) {
                var t = '<section class="message-wrap system-info-wrap J-ats-skill-hint-wrap"><section class="message-info-inner ats-skill-hint">';
                return t += e, t += "</section></section>"
            }(e.systemInfo)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t) {
                var n = '<section class="am-flexbox message-wrap article J-message-wrap f-card" data-message-type="';
                return n += e, n += '" data-sid="', n += t, n += '"> <div class="am-flexbox-item message"> <!-- \u6709title\u5219\u4f7f\u7528\u4e0d\u540c\u7684border --> <article class="wrap-card-answer"> <div class="J-answerContent-wrap"> <div class="am-flexbox"> <div class="am-flexbox-item"> <div class="wrap-card-hs"> <i class="icon-card-hs"></i> <h4 class="icon-card-title">\u9080\u8bc4\u5361\u7247</h4> </div> <div class="am-flexbox content-hs-card"> <div class="am-flexbox-item-1"> <div class="pa-image-wrapper"> <div class="pa-image-holder"></div> </div> </div> <div class="am-flexbox-item-3"> <span class="invite-text">\u8bf7\u95ee\u60a8\u5bf9\u672c\u6b21\u5728\u7ebf\u5ba2\u670d\u7684\u670d\u52a1\u662f\u5426\u6ee1\u610f</span> </div> </div> <div class="card-rate J-offline-invite"> <div class="am-flexbox"> <div class="am-flexbox-item"> <button type="button" class="am-button feedback-button satisfied J-satisfied"> <i class="iconfont icon-like"></i>\u6ee1\u610f </button> </div> <div class="am-flexbox-item"> <button type="button" class="am-button feedback-button unsatisfied J-unsatisfied"> <i class="iconfont icon-dislike"></i>\u4e0d\u6ee1\u610f </button> </div> </div> </div> </div> </div> </div> </article> </div></section>'
            }(e.messageType, e.content)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t, n, i) {
                var o = '<section class="message-wrap human J-switchHuman-wrap" data-link="';
                return o += e.cardLink, o += '" data-message-type="', o += t, o += '" data-reqtoken="', o += n, o += '" data-chat-id="', o += i, o += '"> <div class="service-avatar"><img src="', o += e.serviceAvatar, o += '" /></div> <div class="message J-switchHuman-handle"> <div class="bubble-arrow"></div> <div class="wrap-card-hservice"> <div class="h-content"> <div class="text"> <h4>', o += e.cardTitle, o += "</h4> <p>", o += e.cardDesc, o += '</p> </div> <div class="type-img ', o += t, o += '"></div> </div> <div class="bottom"> <div class="name">', o += e.prodName, o += '</div> <div class="icon"><img src="', o += e.prodIcon, o += '" alt=""></div> </div> </div> </div></section>'
            }(e.serviceData, e.messageType, e.reqToken, e.chatId)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t, n, i, o, r) {
                var a = '<section class="J-wrap-answer-section message-wrap ';
                return a += e, a += '" data-token="', a += t, a += '" data-message-type="', a += n, a += '"> <div class="message"> <div class="ques-header" style="background-color:', a += i, a += '"> <h2><i></i>', a += o, a += '</h2> </div> <article class="list-answer-wrap answer-wrap J-answer-wrap"> <ul class="J-lists-wrap"> ', r.forEach(function(e) {
                    a += ' <li class="J-lists-item" data-know-id="', a += e.id, a += '" data-know-type="', a += e.knowledgeType, a += '"> <div class="q-title">', a += e.title, a += '</div> <div class="arrow-right"></div> </li> '
                }), a += " </ul> </article> </div></section>"
            }(e.styleType, e.token, e.messageType, e.cardTitleBgColor, e.suggestTitle, e.lists)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function() {
                var e = '<div id="speechWrapper" class="footer"> <div class="btn-wrap-left" id="switchBtn"> <button class="icon-keyboard"></button> </div> <div class="ipt-wrap"> <button class="speech-button" id="speech">\u6309\u4f4f  \u8bf4\u8bdd</button> </div></div>';
                return e
            }()
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e) {
                var t = '<section class="message-wrap system-info-wrap J-system-message-wrap"><section class="message-info-inner">';
                return t += e, t += "</section></section>"
            }(e.systemInfo)
        }
    },
    function(e, t) {
        e.exports = function(e) {
            return function(e, t) {
                var n = '<div id="textWrapper" class="footer"> ';
                return n += "true" === e ? ' <div class="btn-wrap-left" id="switchBtn"> <button class="icon-speak"></button> </div> ' : " <div> &nbsp; </div> ", n += ' <div class="ipt-wrap"> <textarea class="autoExpand" name="" id="ipt" rows="1"  data-min-rows=\'1\' placeholder="', n += t, n += '"></textarea> </div> <div class="btn-wrap-right" id="subBtn"> <button disabled="disabled">\u53d1\u9001</button> </div></div>'
            }(e.enableSpeech, e.placeholder)
        }
    }, , , , , , , , , , , , ,
    function(e, t, n) {
        "use strict";
        var i = n(44),
            o = n(120),
            r = (n(35), n(31)),
            a = (n(9), n(5), n(3), {
                render: function(e, t) {
                    var n = this;
                    r.packUpkeyBoard(function() {
                        n.renderPop(e, t)
                    })
                },
                renderPop: function(e, t) {
                    if (this.model = e || {}, !this.pop) {
                        this.pop = new i({
                            template: o({
                                model: e
                            }),
                            width: "100%",
                            className: "wrap-Evaluate-pop",
                            mask: !0,
                            maskTpl: '<div class="am-mask J-chat-evaluate-mask" style="width:100%;height:100%;top:0;left:0;"></div>',
                            align: {
                                type: "bottom"
                            },
                            effect: "slide",
                            direction: "up"
                        }), this.pop.show(), window.pop = this.pop;
                        var n = this.pop.element;
                        return this.bindEvaluateEvent(n, t), this.pop
                    }
                },
                bindEvaluateEvent: function(e, t) {
                    var n = this,
                        i = e.find(".am-dialog-header");
                    i.on("tap", function(e) {
                        var i = e.currentTarget.id;
                        n.destroy(), t(i)
                    })
                },
                destroy: function() {
                    this.pop && this.pop.destroy(), this.pop = null
                }
            });
        e.exports = a
    },
    function(e, t, n) {
        "use strict";
        var i = n(44),
            o = n(121),
            r = n(35),
            a = (n(31), n(9), n(5), n(62)),
            s = (n(3), {
                render: function(e) {
                    var t = this;
                    t.renderPop(e), this.chatInstance = e.chatInstance, this.inputInstance = e.inputInstance
                },
                renderPop: function(e) {
                    if (this.model = e || {}, !this.pop) {
                        this.pop = new i({
                            template: o(),
                            width: "100%",
                            className: "wrap-Evaluate-pop",
                            mask: !0,
                            maskTpl: '<div class="am-mask J-chat-evaluate-mask" style="width:100%;height:100%;top:0;left:0;"></div>',
                            align: {
                                type: "center"
                            },
                            effect: "slide",
                            direction: "up"
                        }), this.pop.show(), window.pop = this.pop;
                        var t = this.pop.element;
                        return this.bindEvaluateEvent(t), this.pop
                    }
                },
                bindEvaluateEvent: function(e) {
                    var t = this,
                        n = e.find(".ats-login-btn"),
                        i = e.find(".icon-card-hs"),
                        o = e.find("#atsLgoinPid");
                    o.on("input", function() {
                        o[0].value ? n.removeClass("ats-login-btn-disabled") : n.addClass("ats-login-btn-disabled")
                    }), n.on("tap", function() {
                        var n = e.find("#atsLgoinPid"),
                            i = n[0].value;
                        if (i = i.replace(/^\s+|\s+$/g, ""), "" !== i) {
                            var o = {};
                            t.isPid(i) ? (o = {
                                userId: i
                            }, window.ATSMERCHANTPID = "pid:" + i) : (o = {
                                logonId: i
                            }, window.ATSMERCHANTPID = "\u7b7e\u7ea6\u8d26\u53f7:" + i), r.atsPidLogin(o, function(e) {
                                if (e.compProps.COMMON_LOGON.merchantVIP) {
                                    window.ATSISVIPMERCHANT = !0, t.inputInstance.disabledBtn(), t.inputInstance.disabledInput();
                                    var n = {};
                                    r.getSkillDigest(n, function(e) {
                                        window.onlineInstance.getSkillHint(e.compProps.DIRECT_CONNECT_CLIVE.onlinevo.skillGroup);
                                        var t = e.compProps.DIRECT_CONNECT_CLIVE.onlinevo;
                                        window.onlineInstance.connect({
                                            userId: window.CHATCONFIG.userId,
                                            lastQuestion: "",
                                            instanceId: window.CHATCONFIG.instanceId,
                                            digest: t.digest || "",
                                            serviceToken: e.reqToken,
                                            timestamp: t.timestamp || "",
                                            groupId: t.skillGroup || "",
                                            priority: t.priority || 0,
                                            baseGroupId: t.baseGroupId || "",
                                            sessionUuid: window.initData ? window.initData.robotId : "",
                                            is_src: "wireless",
                                            _input_charset: "utf-8"
                                        })
                                    }, function(e, n) {
                                        t.chatInstance.renderMessage({
                                            messageType: "system-replace",
                                            message: a.onlineText.connectFail
                                        })
                                    })
                                }
                                t.destroy()
                            }, function() {
                                t.destroy()
                            })
                        }
                    }), i.on("tap", function() {
                        var e = {
                            userId: "",
                            logonId: ""
                        };
                        r.atsPidLogin(e), t.destroy()
                    })
                },
                destroy: function() {
                    this.pop && this.pop.destroy(), this.pop = null
                },
                isPid: function(e) {
                    return e.match(/^(2088)(\d{12})$/)
                }
            });
        e.exports = s
    }, ,
    function(e, t, n) {
        "use strict";

        function i(e, t) {
            e.closest(".J-wrap-answer-section").data("chatid", window.chooseTradeChatId);
            var n = e.closest(".J-answerContent-wrap").find(".J-kb-card-content");
            n.html(c(t)), e.addClass("J-re-choose").text("\u91cd\u65b0\u9009\u62e9")
        }
        var o = n(9),
            r = n(31),
            a = n(5),
            s = n(3),
            c = n(160),
            l = function(e, t, n) {
                var c = window.$chooseTradeHandel;
                if (c.hasClass("J-re-choose")) {
                    var l = c.attr("href");
                    l = l.toLowerCase();
                    var u = a.getUrlData(l);
                    window.chooseTradeChatId = c.closest(".J-wrap-answer-section").data("chatid") || "", window.chooseCardLibVersion = c.closest(".J-wrap-answer-section").data("libversion") || "", o.seed("mypaBi", "cardClick", "cardClick", {
                        uniqid: u.uniqid,
                        token: u.token || "",
                        chatId: chooseTradeChatId,
                        rechoose: "true"
                    }), c.closest(".J-kb-card-link").remove(), e.renderMessage({
                        messageType: "robot-card",
                        knowType: "7",
                        answerId: window.cardAnswerId,
                        answerContent: window.cardAnswerContent,
                        libraryVersion: window.chooseCardLibVersion
                    }, function() {
                        r.scrollToBottom(n)
                    });
                    var d = s("#chat-wrap").find(".J-card-message-wrap").last(),
                        h = (d.find(".J-kb-card-content"), d.find(".J-kb-card-link a"));
                    window.$chooseTradeHandel = h, i($chooseTradeHandel, t)
                } else i(c, t)
            },
            u = function(e, t) {
                document.addEventListener("resume", function(n) {
                    if (console.log("resume-e", n), n.data) {
                        var i = n.data || {},
                            a = "";
                        if (n.data.empty) return a = '{"bizInNo": "", "uniqId": "' + i.uniqId + '", "guideCateId": "' + i.guideCateId + '"}', e.sendMessage(a, window.cardAnswerId, {
                            questionType: "7",
                            chatId: window.chooseTradeChatId,
                            libVersion: window.chooseCardLibVersion
                        }, {
                            hideQuestion: !0
                        }), void o.seed("mypaBi", "chooseTradeEmpty", "chooseTradeEmpty", {
                            guideCateId: i.guideCateId,
                            uniqId: i.uniqId
                        });
                        a = '{"bizTime": "' + i.bizTime + '", "bizInNo": "' + i.bizInNo + '", "guideCateId": "' + i.guideCateId + '", "uniqId": "' + i.uniqId + '", "bizType": "' + i.bizType + '"}', l(e, i, t), e.sendMessage(a, window.cardAnswerId, {
                            questionType: "7",
                            chatId: window.chooseTradeChatId,
                            libVersion: window.chooseCardLibVersion
                        }, {
                            hideQuestion: !0
                        }), setTimeout(function() {
                            r.scrollToBottom(t)
                        }, 200)
                    }
                })
            };
        e.exports = u
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(31),
            r = n(29),
            a = n(5),
            s = n(9),
            c = n(35),
            l = n(94),
            u = n(93),
            d = n(127),
            h = n(125),
            p = n(124),
            f = n(123),
            v = n(83),
            g = n(154),
            m = n(122),
            w = n(60),
            y = 0,
            T = r.extend({
                attr: {
                    triggerElem: i("#chat-wrap"),
                    historyElem: i("#history-chat-wrap")
                },
                setup: function() {
                    this.$chatWrap = this.get("triggerElem"), this.Scroll = this.get("scroll"), this.initData = window.initData || {}, this.userInfo = this.initData.userInfo || {}, this.paInfo = this.initData.paInfo || {}, this.userStyle = o.userStyle(this.userInfo), this.onlineParams = {
                        current: "robot"
                    }, this.initRobot()
                },
                initRobot: function() {
                    var e = window.initData || {};
                    this.renderHistoryMsg(e), this.renderPushMsg(e), e.greeting && this.renderGreeting(e), e.suggest && e.suggest.questions && e.suggest.questions.length && this.renderSuggest(e.suggest), o.scrollToBottom(this.Scroll)
                },
                renderHistoryMsg: function(e) {
                    g.init(this.Scroll, this.$chatWrap, e);
                    var t = v.getInitHistory();
                    t = t || [], console.log("historyData", t), t.length && g.loadHistory(t)
                },
                renderGreeting: function(e) {
                    w.getReconnectSwitch() !== !0 && (e = e || {}, this.renderMessage({
                        messageType: "greeting",
                        answerContent: "<div>" + e.greeting + "</div>"
                    }))
                },
                showTime: function(e, t, n, i) {
                    if (n && n) {
                        var o = !1,
                            r = parseInt((n - t) / 1e3 / 60);
                        console.log("diffTime", r), r >= 5 && (o = !0), (e || 0 === t) && (o = !0), o && this.renderMessage({
                            messageType: "system",
                            message: i
                        })
                    }
                },
                renderSuggest: function(e) {
                    e = e || {}, e.questions = e.questions || [], e.questions.length && this.renderMessage({
                        messageType: "list",
                        data: {
                            styleType: "list",
                            cardTitleBgColor: this.userStyle.cardTitleBgColor,
                            suggestTitle: e.title,
                            token: e.token,
                            lists: e.questions
                        }
                    })
                },
                renderPushMsg: function(e) {
                    e = e || {};
                    var t = this,
                        n = e.pushMsg ? e.pushMsg.reverse() : [];
                    n.length > 0 && n.forEach(function(e) {
                        t.renderMessage({
                            answerTitle: a.unEscape(e.answerTitle),
                            messageType: e.msgType || "push",
                            displayType: e.displayType,
                            chatId: e.chatId,
                            questionType: e.questionType,
                            answerContent: a.unEscape(e.content || e.answerContent)
                        }, function() {
                            o.scrollToBottom(t.Scroll)
                        })
                    })
                },
                setCardTopbar: function(e) {
                    var t = i(e);
                    return t.find(".hd-kb-card").length && t.find(".hd-kb-card").css({
                        background: this.userStyle.cardTitleBgColor,
                        "border-color": this.userStyle.cardTitleBgColor
                    }), t
                },
                sendMessage: function(e, t, n, r) {
                    var l = this;
                    r = r || {}, this.clearWritingInfo(), r.hideQuestion || l.renderMessage({
                        messageType: "visitor",
                        question: e
                    });
                    var u = {
                            robotId: window.initData ? window.initData.robotId : "",
                            question: e,
                            refAnswerId: t || "",
                            preReqToken: window.preReqToken,
                            scene: SCENE_CODE,
                            questionType: "1",
                            moodState: window.CHATCONFIG.MOODSTATE || "0",
                            bizCate: window.BIZ_CATE || "",
                            _input_charset: "utf-8",
                            userId: USERID
                        },
                        d = this.paInfo.avatar || "https://zos.alipayobjects.com/rmsportal/zVBCcOVAtHFuRJJ.png";
                    "robot" !== this.onlineParams.current && (d = this.paInfo.cliveAvatar || "https://zos.alipayobjects.com/rmsportal/iJDbTYJWnkeUHbd.png"), l.renderMessage({
                        messageType: "writing",
                        serviceAvatar: d,
                        styleType: "robot wrap-writing J-wrap-writing",
                        answerContent: "\u6b63\u5728\u8f93\u5165..."
                    }), o.scrollToBottom(l.Scroll), "robot" === this.onlineParams.current ? c.getRobotAnswer(i.extend(u, n || {}), function(t) {
                        y = 0, window.CHATCONFIG.sessionStatus = "robot", setTimeout(function() {
                            l.clearWritingInfo();
                            var n = t.data ? t.data : {},
                                o = n.robotChatVO ? n.robotChatVO : {},
                                s = o.knowledges || [],
                                c = {},
                                d = n.ask || {},
                                h = n.answer || {};
                            o.answerContent || s.length || (o.answerContent = l.initData.sorryMsg || "\u5bf9\u4e0d\u8d77\u6211\u8fd8\u5728\u95ed\u5173\u5b66\u4e60\uff0c\u627e\u6211\u5e08\u5085\u6765\u5e2e\u5fd9\u5427");
                            var p = "robot";
                            "7" === o.knowType && (p = "robot-card"), c.question = e, c.chatId = o.chatId, window.chatId4Bi = o.chatId || "", window.BIZ_CATE = o.bizCate || "", window.preReqToken = n.reqToken, l.validAnswer = !0, l.showTime(!1, window.CHATTIME, h.gmtCreate, h.displayTime), window.CHATTIME = h.gmtCreate, l.checkDirectConnect(n, c, function() {
                                window.CHATCONFIG.MOODSTATE = o.moodState || "0", l.renderMessage({
                                    hasRefAnswer: !!u.refAnswerId,
                                    answerTitle: a.unEscape(o.answerTitle),
                                    messageType: p,
                                    displayType: o.displayType,
                                    chatId: o.chatId,
                                    answerId: o.answerId,
                                    libraryVersion: o.libraryVersion,
                                    reqToken: n.reqToken,
                                    questionType: o.questionType,
                                    knowType: o.knowType,
                                    answerContent: a.unEscape(o.answerContent),
                                    knowledges: o.knowledges,
                                    serverTime: n.serverTime,
                                    question: e
                                }, function(t) {
                                    if (r.hideQuestion) {
                                        var n = i("body").find(".J-card-message-wrap").last();
                                        try {
                                            n.length && l.Scroll.scrollTo(l.Scroll.scrollToElement(n[0]))
                                        } catch (a) {}
                                    } else {
                                        i(".visitor").last();
                                        try {} catch (a) {}
                                    }
                                    d.content = e, d.messageType = "visitor", d.chatType = 1, h.content = o, h.messageType = p, h.chatType = 2, "robot" === p ? h.sourceType = 1 : "push" === p && (h.sourceType = 1), v.save([d, h])
                                }), l.checkHumanService(n, o.chatId)
                            })
                        }, 500)
                    }, function(o, a) {
                        y++, window.CHATCONFIG.sessionStatus = "robot", console.log("reSend_times:", y), y < 2 ? (r = i.extend(r, {
                            hideQuestion: !0
                        }), console.log("reSend_times_params:", e, t, n, r), l.sendMessage(e, t, n, r)) : (l.clearWritingInfo(), l.renderMessage({
                            messageType: "robot",
                            answerContent: "\u4e0d\u597d\u610f\u601d\uff0c\u820c\u5934\u7a81\u7136\u6253\u7ed3\u4e86"
                        }));
                        var c = "answerOtherFail";
                        "statFail" === o && (c = "answerStatFail"), s.seed("mypaBi", "answerError", c, {
                            lastChatId: window.chatId4Bi,
                            timeCount: a
                        })
                    }) : (o.scrollToBottom(l.Scroll), console.log("onlineParams.uname", this.onlineParams), c.getHumanAnswer({
                        sid: this.onlineParams.sid,
                        uid: this.onlineParams.uid,
                        uname: this.onlineParams.uname,
                        content: e,
                        token: this.onlineParams.token
                    }, function(e) {
                        var t = o.buildMsgRecievedTime(e.time);
                        v.save([{
                            messageType: "visitor",
                            content: u.question,
                            chatType: 1,
                            gmtCreate: t.gmtCreate,
                            displayTime: t.displayTime
                        }])
                    }, function(e) {
                        console.log("\u53d1\u9001\u5931\u8d25", e)
                    }), this.syncMsgcsmobile(u))
                },
                syncMsgcsmobile: function(e) {
                    c.getRobotAnswer(i.extend(e, {
                        chatSource: 2
                    }), function() {}, function() {})
                },
                checkDirectConnect: function(e, t, n) {
                    var i = this;
                    e.onlineVO ? this.directConnect(e, t) : e.hotlineVO ? i.renderMessage({
                        messageType: "connect",
                        message: '(\u2565\ufe4f\u2565)\u6211\u8981\u53bb\u95ed\u5173\u4fee\u70bc\u4e86\uff0c\u5df2\u4e3a\u4f60\u7533\u8bf7\u7535\u8bdd\u5ba2\u670d\u7684\u5feb\u901f\u901a\u9053\uff0c<a href="tel:95188" data-reqtoken="' + e.reqToken + '">\u62e8\u625395188</a>\u3002'
                    }) : n && n()
                },
                directConnect: function(e, t, n) {
                    var i = n || window.onlineInstance,
                        o = t || {},
                        r = e.onlineVO || {};
                    i.connect({
                        userId: window.CHATCONFIG.userId,
                        lastQuestion: o.question,
                        instanceId: window.CHATCONFIG.instanceId,
                        digest: r.digest || "",
                        serviceToken: e.reqToken,
                        timestamp: r.timestamp || "",
                        groupId: r.skillGroup || "",
                        priority: r.priority || 0,
                        baseGroupId: r.baseGroupId || "",
                        sessionUuid: window.initData ? window.initData.robotId : "",
                        is_src: "wireless",
                        _input_charset: "utf-8"
                    })
                },
                buildServiceData: function(e) {
                    var t = window.CHATCONFIG.cardAttr || '{"ONLINE": {"cardTitle": "\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d","cardDesc": "\u5982\u679c\u8fd8\u6ca1\u6709\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u5b89\u5a1c\u5e2e\u60a8\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d\u3002","cardLink": "","prodName": "\u6211\u7684\u5ba2\u670d","prodIcon": "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"},"HOTLINE": {"cardTitle": "\u62e8\u6253\u70ed\u7ebf\u5ba2\u670d","cardDesc": "\u5982\u679c\u8fd8\u6ca1\u6709\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u5b89\u5a1c\u5e2e\u60a8\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d\u3002", "cardLink": "", "prodName": "\u6211\u7684\u5ba2\u670d", "prodIcon": "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"},"TAOBAO": {"cardTitle": "\u8054\u7cfb\u5728\u7ebf\u5ba2\u670d","cardDesc": "\u5982\u679c\u60a8\u7684\u95ee\u9898\u8fd8\u672a\u89e3\u51b3\uff0c\u6211\u53ef\u4ee5\u5e2e\u4f60\u8054\u7cfb\u5728\u7ebf\u5ba2\u670d\uff0c\u6765\u4e3a\u4f60\u89e3\u7591\u7b54\u60d1","cardLink": "https://ihelp.taobao.com/pocket/servicePortal-1.htm?from=sjzhifubaohuafei","prodName": "\u6211\u7684\u5ba2\u670d","prodIcon": "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"}}',
                        n = {};
                    try {
                        t = JSON.parse(t)
                    } catch (i) {
                        console.log("configuration of taobaoTips error"), t = {
                            ONLINE: {
                                cardTitle: "\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d",
                                cardDesc: "\u5982\u679c\u8fd8\u6ca1\u6709\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u5b89\u5a1c\u5e2e\u60a8\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d\u3002",
                                cardLink: "",
                                prodName: "\u6211\u7684\u5ba2\u670d",
                                prodIcon: "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"
                            },
                            HOTLINE: {
                                cardTitle: "\u62e8\u6253\u70ed\u7ebf\u5ba2\u670d",
                                cardDesc: "\u5982\u679c\u8fd8\u6ca1\u6709\u89e3\u51b3\u60a8\u7684\u95ee\u9898\uff0c\u5b89\u5a1c\u5e2e\u60a8\u8f6c\u63a5\u4eba\u5de5\u5ba2\u670d\u3002",
                                cardLink: "95188",
                                prodName: "\u6211\u7684\u5ba2\u670d",
                                prodIcon: "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"
                            },
                            TAOBAO: {
                                cardTitle: "\u8054\u7cfb\u5728\u7ebf\u5ba2\u670d",
                                cardDesc: "\u5982\u679c\u60a8\u7684\u95ee\u9898\u8fd8\u672a\u89e3\u51b3\uff0c\u6211\u53ef\u4ee5\u5e2e\u4f60\u8054\u7cfb\u5728\u7ebf\u5ba2\u670d\uff0c\u6765\u4e3a\u4f60\u89e3\u7591\u7b54\u60d1",
                                cardLink: "https://ihelp.taobao.com/pocket/servicePortal-1.htm?from=sjzhifubaohuafei",
                                prodName: "\u6211\u7684\u5ba2\u670d",
                                prodIcon: "https://os.alipayobjects.com/rmsportal/phYivBPLtbegQBF.png"
                            }
                        }
                    }
                    return n.serviceAvatar = this.paInfo.avatar || "https://os.alipayobjects.com/rmsportal/ueUSTNmLwcjDmfq.png", "clive" === e ? (n = t.ONLINE, n.serviceAvatar = this.paInfo.cliveAvatar || "https://zos.alipayobjects.com/rmsportal/iJDbTYJWnkeUHbd.png") : "ivr" === e ? n = t.HOTLINE : "taobao" === e && (n = t.TAOBAO), n
                },
                checkHumanService: function(e, t) {
                    var n = e.nextMode || "",
                        i = e.reqToken || "";
                    n = n.toLowerCase(), this.renderMessage({
                        tpl: "feedback",
                        messageType: n,
                        chatId: t || "",
                        reqToken: i,
                        serviceData: this.buildServiceData(n)
                    }), o.scrollToBottom(this.Scroll)
                },
                clearSystemInfo: function() {
                    var e = i(".J-system-message-wrap").last();
                    e.length && e.remove()
                },
                clearWritingInfo: function() {
                    var e = i(".J-wrap-writing");
                    e.length && e.remove()
                },
                clearSkillHint: function() {
                    var e = i(".J-ats-skill-hint-wrap");
                    e.length && e.remove(), window.ATSSHOWSHILLHINT = !1, window.ATSSHOWSHILLED = !1
                },
                getLastMessageByType: function(e) {
                    var t = i("." + e);
                    return t.length > 0 ? t.last().text().trim() : ""
                },
                renderMessage: function(e, t) {
                    var n = this,
                        i = "",
                        r = e.messageType;
                    switch (r) {
                        case "visitor":
                            if (e.question && e.question.length > 0) {
                                var s = o.escape(e.question);
                                i = l({
                                    messageType: r,
                                    question: s,
                                    msgBubbleBgColor: this.userStyle.msgBubbleBgColor || "#A0E75A",
                                    msgBubbleBorderColor: this.userStyle.msgBubbleBorderColor || "#7CD053",
                                    avatar: this.userStyle.avatar
                                })
                            }
                            break;
                        case "list":
                            i = h(e.data);
                            break;
                        case "robot-card":
                        case "robot":
                        case "greeting":
                        case "reconnect":
                        case "push":
                            i = u(o.buildServiceReplyData(r, e, this.paInfo));
                            break;
                        case "writing":
                            i = u(e);
                            break;
                        case "online":
                            i = u({
                                messageType: "online",
                                styleType: "robot",
                                serviceAvatar: this.paInfo.cliveAvatar || "https://zos.alipayobjects.com/rmsportal/iJDbTYJWnkeUHbd.png",
                                answerContent: e.message
                            });
                            break;
                        case "system":
                            console.log("message.message", e.message), i = d({
                                systemInfo: e.message
                            });
                            break;
                        case "system-replace":
                            n.clearSystemInfo(), i = d({
                                systemInfo: e.message
                            });
                            break;
                        case "clive":
                        case "ivr":
                        case "taobao":
                            i = p({
                                messageType: r || "",
                                solved: e.solved || "",
                                chatId: e.chatId || "",
                                reqToken: e.reqToken || "",
                                serviceData: e.serviceData
                            });
                            break;
                        case "offline_invite":
                            i = f({
                                messageType: r || "",
                                content: e.answerContent
                            });
                            break;
                        case "connect":
                            var c = "";
                            switch (e.connectType) {
                                case "ivr":
                                    c = '(\u2565\ufe4f\u2565)\u6211\u8981\u53bb\u95ed\u5173\u4fee\u70bc\u4e86\uff0c\u5df2\u4e3a\u4f60\u7533\u8bf7\u7535\u8bdd\u5ba2\u670d\u7684\u5feb\u901f\u901a\u9053\uff0c<a href="tel:95188" data-reqtoken="' + e.reqToken + '" class="J-strategy">\u62e8\u625395188</a>\u3002';
                                    break;
                                case "clive":
                                    c = "(\u2565\ufe4f\u2565)\u6211\u8981\u53bb\u95ed\u5173\u4fee\u70bc\u4e86\uff0c\u8fd9\u5c31\u4e3a\u4f60\u627e\u5e08\u5085\u6765\uff0c\u8bf7\u4e0d\u8981\u79bb\u5f00"
                            }
                            i = u({
                                messageType: "online",
                                styleType: "robot",
                                answerContent: e.message || c
                            });
                        case "skill-hint":
                            i = m({
                                systemInfo: e.message
                            })
                    }
                    var v = n.setCardTopbar(i);
                    this.$chatWrap.append(v), a.supportKbase(v), a.hackStressImgInKnowledge(v);
                    var g = (v.find("img"), "robot visitor online push".split(" ")),
                        w = g.filter(function(e) {
                            return e === r
                        });
                    w.length > 0, setTimeout(function() {
                        if (t) t();
                        else switch (r) {
                            case "robot-card":
                            case "online":
                            case "system":
                            case "system-replace":
                            case "connect":
                            case "list":
                            case "skill-hint":
                                o.scrollToBottom(n.Scroll)
                        }
                        n.Scroll.refresh()
                    }, 200)
                },
                buildSaveData: function(e) {
                    e = e || {};
                    var t = "visitor" === e.messageType ? 1 : 2,
                        n = 1;
                    "online" === e.messageType ? n = 2 : "push" === e.messageType && (n = 3);
                    var i = e.question;
                    return 2 === n && 1 === n && (i = {
                        answerContent: e.answerContent,
                        knowType: e.knowType,
                        libraryVersion: e.libraryVersion,
                        answerTitle: e.answerTitle,
                        displayType: e.displayType,
                        chatId: e.chatId,
                        moodState: e.moodState
                    }), {
                        content: i,
                        sourceType: n,
                        chatType: t,
                        gmtCreate: e.serverTime,
                        msgId: e.msgId || ""
                    }
                },
                _buildRobotReplyData: function(e) {
                    e = e || {};
                    var t = e.answerContent || "",
                        n = e.answerTitle || "",
                        i = "",
                        o = e.chatId || "",
                        r = "",
                        s = e.card,
                        c = e.libraryVersion,
                        l = e.questionType,
                        u = "";
                    if (e.knowledges && e.knowledges.length && (i = "\u60a8\u662f\u60f3\u95ee\uff1f", r = e.knowledges), "3" === e.displayType) u = "list";
                    else {
                        var d = /<img\s+[^>]*src="([^"]*)"[^>]*>/,
                            h = /<script[^>]*?>.*?<\/script>/g,
                            p = /<script[^>]*?>.*?<\/script>/g,
                            f = /<[^>]*>|/g,
                            v = t.replace(h, "").replace(p, "").replace(f, "");
                        u = v.length > 200 ? "article" : "robot";
                        var g = d.test(t);
                        u = g ? "article" : u, 0 === t.length && (t = initData.sorryMsg || "\u5bf9\u4e0d\u8d77\u6211\u8fd8\u5728\u95ed\u5173\u5b66\u4e60\uff0c\u627e\u6211\u5e08\u5085\u6765\u5e2e\u5fd9\u5427")
                    }
                    return "7" === e.knowType && (n = "", s = "card", window.cardAnswerContent = t, window.cardAnswerId = e.answerId || ""), {
                        messageType: "robot",
                        serviceAvatar: this.paInfo.avatar || "https://os.alipayobjects.com/rmsportal/ueUSTNmLwcjDmfq.png",
                        rechatid: o,
                        styleType: u,
                        questionType: l,
                        answerTitle: a.unEscape(n),
                        answerContent: t,
                        similarHeader: i,
                        similarQuestions: r,
                        libraryVersion: c,
                        card: s
                    }
                },
                reSend: function(e, t, n, i) {}
            });
        e.exports = T
    },
    function(e, t, n) {
        "use strict";

        function i(e, t, n) {
            var i = e.closest(".J-switchHuman-wrap"),
                o = i.data() || {},
                r = "",
                a = i.data("link"),
                c = i.data("chat-id") || "",
                l = o.reqtoken;
            return t.getLastMessageByType("visitor") && (r = t.getLastMessageByType("visitor")), o.question = r, !i.hasClass("disabled") && ("ivr" === o.messageType ? (h.getRobotAnswer({
                robotId: window.initData ? window.initData.robotId : "",
                question: r,
                chatId: c,
                preReqToken: l,
                userId: window.USERID,
                serviceMode: "IVR",
                _input_charset: "utf-8"
            }, function(e) {
                var t = e.data || {};
                window.preReqToken = t.reqToken
            }), s(null), a || (a = "95188"), location.href = "tel:" + a) : "clive" === o.messageType ? h.getRobotAnswer({
                robotId: window.initData ? window.initData.robotId : "",
                question: r,
                questionType: "1",
                userId: window.USERID,
                chatId: c,
                preReqToken: l,
                serviceMode: "CLIVE",
                _input_charset: "utf-8"
            }, function(e) {
                var i = e.data;
                if (window.preReqToken = i.reqToken, console.log("before-directConnect", i), window.ATSMERCHANTLOGIN) {
                    var r = {};
                    h.checkSkill(r, function(e) {
                        var a = null;
                        try {
                            a = JSON.parse(d.unEscape(e.compProps.CLIVE_ENTRANCE.skill_group_area))
                        } catch (s) {}
                        null !== a && a.length > 0 ? (console.log("need show skillGroup"), f.render(a, function(e) {
                            r.skillGroup = e, console.log("selected groupId\uff1a" + e), n.getSkillHint(e), h.getSkillDigest(r, function(e) {
                                i.onlineVO = e.compProps.DIRECT_CONNECT_CLIVE.onlinevo, t.directConnect(i, o, n)
                            }, function() {
                                t.renderMessage({
                                    messageType: "system-replace",
                                    message: void 0 == window.ATSSKILLHINT ? v.onlineText.connectFail : window.ATSSKILLHINT
                                })
                            })
                        })) : t.directConnect(i, o, n)
                    }, function() {
                        t.renderMessage({
                            messageType: "system-replace",
                            message: void 0 == window.ATSSKILLHINT ? v.onlineText.connectFail : window.ATSSKILLHINT
                        })
                    })
                } else t.directConnect(i, o, n)
            }) : "taobao" === o.messageType && (h.getRobotAnswer({
                question: r,
                robotId: window.initData ? window.initData.robotId : "",
                scene: SCENE_CODE,
                preReqToken: l,
                serviceMode: "taobao",
                userId: USERID,
                _input_charset: "utf-8"
            }, function(e) {
                var t = e.data || {};
                window.preReqToken = t.reqToken
            }), a && u.pushWindowFn(a)), void i.addClass("disabled"))
        }

        function o(e, t, n) {
            g.hideShare(), g.listEvent(e, t), g.chatWrapEvent(e, t, n)
        }

        function r(e, t) {
            e = e.toLowerCase();
            var n = u.getUrlData(e),
                i = t.closest(".J-wrap-answer-section").data("chatid") || "",
                o = t.closest(".J-wrap-answer-section").data("libversion") || "";
            console.log("url-data", n), n.uniqid && (window.$chooseTradeHandel = t, window.chooseTradeChatId = i, window.chooseCardLibVersion = o, l.seed("mypaBi", "cardClick", "cardClick", {
                uniqid: n.uniqid,
                token: n.token || "",
                chatId: i
            }))
        }

        function a(e) {
            window.AlipayJSBridge ? AlipayJSBridge.call("startApp", {
                appId: "20000038",
                param: {
                    url: e,
                    bizCode: "appeal"
                },
                closeCurrentApp: !1
            }, function(e) {}) : location.hre = e
        }

        function s(e) {
            var t = "call95188InKnowledge";
            e && e.hasClass("J-strategy") && (t = "call95188InStrategy"), l.seed("mypaBi", "call95188", t)
        }
        var c = n(3),
            l = n(9),
            u = n(5),
            d = n(31),
            h = n(35),
            p = n(153),
            f = n(141),
            v = n(62),
            g = {
                hideShare: function() {
                    window.AlipayJSBridge && AlipayJSBridge.call("hideOptionMenu")
                },
                listEvent: function(e, t) {
                    d.$chatWrap.on("tap", ".J-know-list", function(t) {
                        var n = c(t.currentTarget),
                            i = n.closest(".J-wrap-answer-section"),
                            o = c.trim(n.text()),
                            r = c.trim(n.data("id"));
                        e.sendMessage(o, r, {
                            questionType: n.data("questiontype"),
                            libVersion: n.data("libversion") || "",
                            chatId: i.data("chatid")
                        })
                    }), d.$chatWrap.on("tap", ".J-lists-item", function(e) {
                        var t = c(e.currentTarget),
                            n = t.closest(".J-wrap-answer-section"),
                            i = c.trim(n.data("token")),
                            o = "",
                            r = c.trim(t.data("know-type")),
                            a = c.trim(t.data("know-id"));
                        a && (o = MOBILE_SERVER + "/detailSolution.htm?questionId=" + a + "&knowledgeType=" + r + "&token=" + i, u["goto"](o))
                    }), d.$chatWrap.on("tap", ".J-offline-invite", function(e) {
                        var t, n = c(e.target),
                            i = c(e.currentTarget),
                            o = n.parents(".J-message-wrap").data("sid");
                        n.hasClass("J-satisfied") ? t = "satisfied" : n.hasClass("J-unsatisfied") && (t = "unsatisfied"), h.feedbackRate(o, t), i.addClass("disabled")
                    })
                },
                chatWrapEvent: function(e, t, n) {
                    d.$chatWrap.on("tap", ".J-switchHuman-handle", function(n) {
                        var o = c(n.currentTarget);
                        i(o, e, t)
                    }), d.$chatWrap.on("tap", ".J-article-show-more", function(e) {
                        var t = c(e.currentTarget),
                            i = t.closest(".J-wrap-answer-section");
                        i.find(".J-answer-wrap").removeClass("hide-content"), l.seed("mypaBi", "showMore", "showMore", {
                            chatId: i.data("chatid")
                        }), d.scrollRefresh(n), t.remove()
                    }), d.$chatWrap.on("click", "a", function(e) {
                        e.preventDefault()
                    }), d.$chatWrap.on("tap", "a", function(i) {
                        function o(n, i) {
                            t.visitorOffline({
                                userTrigger: !0
                            }), e.renderMessage({
                                messageType: "system-replace",
                                message: '\u8f6c\u63a5\u5df2\u53d6\u6d88\uff0c\u60a8\u53ef\u80fd\u8981<a href="javascript:;" question="' + n + '" req-token="' + i + '" class="J-reconnect">\u91cd\u65b0\u8fde\u63a5\u4eba\u5de5\u5ba2\u670d</a>'
                            })
                        }
                        i.preventDefault();
                        var g = c(i.currentTarget),
                            m = g.closest(".J-switchHuman-wrap"),
                            w = (m.data() || {}, g.attr("question")),
                            y = g.attr("req-token"),
                            T = g.closest(".J-wrap-answer-section"),
                            b = g.data("libversion") || T.data("libversion") || "",
                            C = T.data("chatid") || "",
                            k = g[0].getAttribute("href");
                        if (e.getLastMessageByType("visitor") && (w = e.getLastMessageByType("visitor")), g.hasClass("J-skill-notice") && o(w, y), /^https?/.test(k) && (r(k, g), k = decodeURI(k), k = encodeURI(k), /(\/appeal\/entrance)/.test(k) && u.isIos() ? a(k) : u.pushWindowFn(k)), /(^alipays:)|(^afwealth:)/.test(k) && (u.isAlipay() ? location.href = k : (k = u.landing(k), u.pushWindowFn(k))), /tel:/.test(k) && (location.href = k, h.getRobotAnswer({
                                robotId: window.initData ? window.initData.robotId : "",
                                scene: SCENE_CODE,
                                preReqToken: y || window.preReqToken,
                                serviceMode: "IVR",
                                userId: USERID,
                                _input_charset: "utf-8"
                            }, function(e) {
                                var t = e.data || {};
                                window.preReqToken = t.reqToken
                            }), s(g)), /#ctu-plugin/.test(k) && p.render(e, n), g.attr("knowid") && e.sendMessage(c.trim(g.text()), g.attr("knowid"), {
                                libVersion: b,
                                chatId: C
                            }), g.hasClass("J-reconnect") && !g.hasClass("disabled")) {
                            if ("online" === t.current) return;
                            l.seed("mypaBi", "reConnectClive", "reConnectClive"), h.getRobotAnswer({
                                robotId: window.initData ? window.initData.robotId : "",
                                question: w,
                                questionType: "1",
                                preReqToken: y,
                                userId: window.CHATCONFIG.userId,
                                chatId: y,
                                serviceMode: "CLIVE",
                                _input_charset: "utf-8"
                            }, function(n) {
                                var i = n.data,
                                    o = i.onlineVO || {};
                                if (window.preReqToken = i.reqToken, window.ATSISVIPMERCHANT === !0) {
                                    var r = {};
                                    return void h.getSkillDigest(r, function(e) {
                                        var n = e.compProps.DIRECT_CONNECT_CLIVE.onlinevo;
                                        t.getSkillHint(n.skillGroup), t.connect({
                                            userId: window.CHATCONFIG.userId,
                                            lastQuestion: "",
                                            instanceId: window.CHATCONFIG.instanceId,
                                            digest: n.digest || "",
                                            serviceToken: e.reqToken,
                                            timestamp: n.timestamp || "",
                                            groupId: n.skillGroup || "",
                                            priority: n.priority || 0,
                                            baseGroupId: n.baseGroupId || "",
                                            sessionUuid: window.initData ? window.initData.robotId : "",
                                            is_src: "wireless",
                                            _input_charset: "utf-8"
                                        }, "YES")
                                    }, function() {
                                        e.renderMessage({
                                            messageType: "system-replace",
                                            message: void 0 == window.ATSSKILLHINT ? v.onlineText.connectFail : window.ATSSKILLHINT
                                        })
                                    })
                                }
                                if (window.ATSMERCHANTLOGIN) {
                                    var r = {};
                                    h.checkSkill(r, function(n) {
                                        var a = null;
                                        try {
                                            a = JSON.parse(d.unEscape(n.compProps.CLIVE_ENTRANCE.skill_group_area))
                                        } catch (s) {}
                                        null !== a && a.length > 0 ? (console.log("need show skillGroup"), f.render(a, function(n) {
                                            console.log("selected groupId\uff1a" + n), r.skillGroup = n, t.getSkillHint(n), h.getSkillDigest(r, function(e) {
                                                o = e.compProps.DIRECT_CONNECT_CLIVE.onlinevo, t.connect({
                                                    userId: window.CHATCONFIG.userId,
                                                    lastQuestion: w,
                                                    instanceId: window.CHATCONFIG.instanceId,
                                                    digest: o.digest || "",
                                                    serviceToken: i.reqToken,
                                                    timestamp: o.timestamp || "",
                                                    groupId: o.skillGroup || "",
                                                    priority: o.priority || 0,
                                                    baseGroupId: o.baseGroupId || "",
                                                    sessionUuid: window.initData ? window.initData.robotId : "",
                                                    is_src: "wireless",
                                                    _input_charset: "utf-8"
                                                }, "YES")
                                            }, function() {
                                                e.renderMessage({
                                                    messageType: "system-replace",
                                                    message: void 0 == window.ATSSKILLHINT ? v.onlineText.connectFail : window.ATSSKILLHINT
                                                })
                                            })
                                        })) : t.connect({
                                            userId: window.CHATCONFIG.userId,
                                            lastQuestion: w,
                                            instanceId: window.CHATCONFIG.instanceId,
                                            digest: o.digest || "",
                                            serviceToken: i.reqToken,
                                            timestamp: o.timestamp || "",
                                            groupId: o.skillGroup || "",
                                            priority: o.priority || 0,
                                            baseGroupId: o.baseGroupId || "",
                                            sessionUuid: window.initData ? window.initData.robotId : "",
                                            is_src: "wireless",
                                            _input_charset: "utf-8"
                                        }, "YES")
                                    }, function() {
                                        e.renderMessage({
                                            messageType: "system-replace",
                                            message: void 0 == window.ATSSKILLHINT ? v.onlineText.connectFail : window.ATSSKILLHINT
                                        })
                                    })
                                } else t.connect({
                                    userId: window.CHATCONFIG.userId,
                                    lastQuestion: w,
                                    instanceId: window.CHATCONFIG.instanceId,
                                    digest: o.digest || "",
                                    serviceToken: i.reqToken,
                                    timestamp: o.timestamp || "",
                                    groupId: o.skillGroup || "",
                                    priority: o.priority || 0,
                                    baseGroupId: o.baseGroupId || "",
                                    sessionUuid: window.initData ? window.initData.robotId : "",
                                    is_src: "wireless",
                                    _input_charset: "utf-8"
                                }, "YES")
                            })
                        }
                        g.hasClass("J-online-cancel") && o(w, y)
                    })
                }
            };
        e.exports = o
    },
    function(e, t, n) {
        "use strict";

        function i(e) {
            f.getRobotAnswer({
                robotId: window.initData ? window.initData.robotId : "",
                scene: SCENE_CODE,
                reConnect: g.hasRecord().toString(),
                userId: USERID,
                _input_charset: "utf-8"
            }, function(t) {
                var n = t.data;
                window.preReqToken = n.reqToken, e.checkDirectConnect(n, {}, function() {
                    g.render(e)
                })
            })
        }

        function o() {
            h.bridgeReady(function() {
                AlipayJSBridge.call("setGestureBack", {
                    val: !1
                }), T.registerSync()
            }), "5" !== window.CHATCONFIG.prodChannel ? (window.ATSMERCHANTLOGIN = !1, r()) : f.checkPidLogin({}, function(e) {
                window.ATSMERCHANTLOGIN = e.compProps.COMMON_LOGON.forceLogon;
                try {
                    window.ATSSKILLHINTGROUP = JSON.parse(d.unEscape(e.compProps.QUEUING_NOTICE.queuing_text))
                } catch (t) {}
                r()
            }, function() {
                window.ATSMERCHANTLOGIN = !1, r()
            })
        }

        function r() {
            f.robotInit({
                scene: SCENE_CODE,
                bizToken: window.CHATCONFIG.bizToken,
                bizType: window.CHATCONFIG.bizTypeCode
            }, function(e) {
                window.initData = e.data, window.CHATCONFIG.MOODSTATE = "0", window.BIZ_CATE = "", window.context = e.context || {}, C()
            })
        }

        function a() {
            var e = {};
            try {
                e = JSON.parse(window.CHATCONFIG.socialParams)
            } catch (t) {
                e = {}
            }
            return e
        }
        var s = n(3),
            c = n(45),
            l = (n(62), n(145)),
            u = n(146),
            d = n(31),
            h = n(5),
            p = n(148),
            f = n(35),
            v = n(152),
            g = n(60),
            m = n(149),
            w = n(144),
            y = n(72),
            T = n(156),
            b = n(142);
        window.SOCIALPARAMS = a(), window.CHATTIME = 0, window.SENDSTATUS = !1;
        var C = function() {
            var e = new c(document.querySelector("#scroll"), {
                    ignoreOverflow: !0
                }).init(),
                t = s("#iptBox"),
                n = s("#chat-wrap"),
                o = new l({
                    triggerElem: n,
                    scroll: e
                }),
                r = new m({
                    onlineChat: !1,
                    robotId: window.initData.robotId,
                    chatInstance: o
                });
            r.register();
            var a = new p({
                    triggerElem: t,
                    chat: o
                }),
                d = new v({
                    $iptBox: t,
                    chatInstance: o,
                    backInstance: r,
                    inputInstance: a
                });
            if (window.onlineInstance = d, u(o, d, e), window.ATSMERCHANTLOGIN) b.render({
                chatInstance: window.onlineInstance,
                inputInstance: a
            });
            else if (g.getReconnectSwitch() === !0) window.onlineInstance.onlineAlive(function(e) {
                "true" == e.data.isAlive ? (o.onlineParams.current = "clive", o.onlineParams.sid = g.getRecord().sid, o.onlineParams.token = g.getRecord().connectToken, window.onlineInstance.startKeepAlive("queueKeepAliveGap", o.onlineParams.token), window.onlineInstance.setStatus("connecting"), window.onlineInstance.fetchMessage({
                    token: o.onlineParams.token,
                    question: g.getRecord().question,
                    uid: g.getRecord().historyUid,
                    sid: o.onlineParams.sid
                })) : "false" == e.data.isAlive && "false" == e.data.isTimeOut ? f.getRobotAnswer({
                    robotId: window.initData ? window.initData.robotId : "",
                    question: g.getRecord().question,
                    questionType: "1",
                    preReqToken: g.getRecord().chatId,
                    userId: window.CHATCONFIG.userId,
                    chatId: g.getRecord().chatId,
                    serviceMode: "CLIVE",
                    _input_charset: "utf-8"
                }, function(e) {
                    var t = e.data,
                        n = t.onlineVO || {};
                    window.preReqToken = t.reqToken, window.onlineInstance.connect({
                        reconnect: "true",
                        sessionUuid: g.getRecord().sessionUuid,
                        userId: window.CHATCONFIG.userId,
                        lastQuestion: g.getRecord().question,
                        instanceId: window.CHATCONFIG.instanceId,
                        digest: n.digest || "",
                        serviceToken: t.reqToken,
                        timestamp: n.timestamp || "",
                        groupId: n.skillGroup || "",
                        priority: n.priority || 0,
                        baseGroupId: n.baseGroupId || "",
                        is_src: "wireless",
                        _input_charset: "utf-8"
                    }, "YES")
                }) : "true" == e.data.isTimeOut ? g.setReconnectSwitch(!1) : i(o)
            }, function(e) {
                i(o)
            });
            else {
                var T = h.getUrlData();
                T.question ? o.sendMessage(T.question) : i(o)
            }
            w(o, e), SOCIALPARAMS && 1 === SOCIALPARAMS.sync && h.bridgeReady(function() {
                y()
            })
        };
        e.exports = o
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(29),
            r = n(7),
            a = n(155),
            s = (n(35), n(31)),
            c = n(9),
            l = n(5),
            u = n(126),
            d = n(128),
            h = o.extend({
                attr: {
                    triggerElem: i("#iptBox")
                },
                setup: function() {
                    var e = this;
                    this.iptFocusInterval = null, this.$iptBox = this.get("triggerElem"), this.mode = "text", this.chat = this.get("chat"), this.checkSpeechAvailable(function(t) {
                        t = t || "", e.speechAvailable = t.toString(), e.render(), e.toggleMode()
                    })
                },
                checkSpeechAvailable: function(e) {
                    l.isAlipay() && l.isIos() && r.app && parseFloat(r.app.version) < 9.3 ? e(!1) : l.isAlipay() && window.AlipayJSBridge ? AlipayJSBridge.call("isSpeechAvailable", function(t) {
                        var n = t.success && "true" === CHATCONFIG.speechEnable;
                        e && e(n)
                    }) : e(!1)
                },
                useSpeech: function() {
                    var e = this;
                    this.$iptBox.append(u()), window.speechInstance = new a({
                        triggerElem: e.$iptBox,
                        chat: e.chat
                    })
                },
                render: function() {
                    var e = this;
                    this.$iptBox.append(d({
                        enableSpeech: e.speechAvailable,
                        placeholder: window.initData.searchTips
                    })), this.$ipt = this.$iptBox.find("#ipt"), "true" === e.speechAvailable && this.useSpeech(), this.$iptHolder = this.$iptBox.find("#iptHolder"), this._unbindEvent(), this._initEvent(), this.contentTouch(this.$ipt)
                },
                contentTouch: function(e) {
                    i("#content").on("touchstart", function() {
                        "YES" === e.attr("focusFlag") && (window.SENDSTATUS = !1, e.blur())
                    })
                },
                _unbindEvent: function() {
                    this.$iptBox.off(), this.$ipt.off()
                },
                _initEvent: function() {
                    var e = this;
                    i(document).one("focus.textarea", ".autoExpand", function() {
                        var e = this.value;
                        this.value = "", this.baseScrollHeight = this.scrollHeight, this.value = e
                    }).on("input.textarea", ".autoExpand", function() {
                        this.value.length ? e.enabledBtn() : e.disabledBtn();
                        var t, n = 1,
                            i = 5;
                        this.rows = n, t = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 24), this.rows = n + t > i ? i : n + t
                    }), this.$iptBox.on("tap", "#subBtn", function() {
                        e.send()
                    }), this.$iptBox.on("tap", "#switchBtn", function() {
                        e.mode = "speech" === e.mode ? "text" : "speech";
                        var t = "speech2text";
                        "speech" === e.mode && (t = "text2speech"), e.toggleMode(), c.seed("mypaBi", t, t)
                    }), this.$ipt.on("keydown", function(t) {
                        if (13 === t.keyCode) return e.send(), !1
                    }), this.$ipt.on("tap", function() {
                        l.isIos() && /(^7.1)|(^7.0)/.test(r.os.fullVersion) && i(this).focus()
                    }), this.$ipt.on("blur", function() {
                        e.clearIptFocusInterval(), i(this).attr("focusFlag", "NO"), window.SENDSTATUS && e.$ipt.focus()
                    }), this.$ipt.on("focus", function() {
                        i(this).attr("focusFlag", "YES"), e.createIptFocusInterval()
                    })
                },
                detectInputIntoView: function() {
                    l.isIos() && (this.needScrollIntoView() && this.$iptBox[0].scrollIntoView(!0), this.iptFocusInterval = setTimeout(this.detectInputIntoView.bind(this), 500))
                },
                createIptFocusInterval: function() {
                    l.isIos() && (this.clearIptFocusInterval(), this.iptFocusInterval = setTimeout(this.detectInputIntoView.bind(this), 500))
                },
                clearIptFocusInterval: function() {
                    l.isIos() && this.iptFocusInterval && clearTimeout(this.iptFocusInterval)
                },
                needScrollIntoView: function() {
                    var e = this.$iptBox[0].getBoundingClientRect().top,
                        t = window.innerHeight;
                    return t < parseInt(e)
                },
                valReplace: function(e) {
                    return e.replace(/\s*\r*\n*/gm, "")
                },
                flexTextArea: function() {
                    var e = this,
                        t = e.$ipt.val();
                    this.$iptHolder.html(s.escape(t))
                },
                toggleMode: function() {
                    var e = i("#speechWrapper"),
                        t = i("#textWrapper");
                    window.AlipayJSBridge && AlipayJSBridge.call("cancelSpeech"), "text" === this.mode ? (e.hide(), t.show()) : "speech" === this.mode && (e.show(), t.hide())
                },
                disabledBtn: function() {
                    var e = this.$iptBox.find("#subBtn button"),
                        t = e.attr("disabled");
                    "disabled" !== t && e.attr("disabled", "disabled")
                },
                disabledInput: function() {
                    var e = this.$iptBox.find("#ipt"),
                        t = e.attr("disabled");
                    "disabled" !== t && e.attr("disabled", "disabled")
                },
                enabledBtn: function() {
                    var e = this.$iptBox.find("#subBtn button"),
                        t = e.attr("disabled");
                    "disabled" === t && e.removeAttr("disabled")
                },
                enabledInput: function() {
                    var e = this.$iptBox.find("#ipt"),
                        t = e.attr("disabled");
                    "disabled" === t && e.removeAttr("disabled")
                },
                send: function(e) {
                    var t = this,
                        n = e ? e : i.trim(t.$ipt.val());
                    if ("" === n) return !1;
                    var o = i("#chat-wrap").find(".J-wrap-answer-section").last(),
                        r = o.data("chatid") || "";
                    this.chat.sendMessage(n, "", {
                        chatId: r
                    }), t.$ipt.val(""), this.disabledBtn(), t.$ipt.attr("rows", 1), t.$ipt.focus(), window.SENDSTATUS = !0
                }
            });
        e.exports = h
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(35),
            r = n(7),
            a = n(5),
            s = n(71),
            c = n(150),
            l = n(31),
            u = n(9),
            d = n(72);
        n(168);
        var h = n(60),
            p = function(e) {
                this.params = e || {}, this.connectStatus = e.connectStatus || !1, this.onlineChat = e.onlineChat || !1, this.cliveToken = e.cliveToken || "", this.robotId = e.robotId || "", this.skillGroup = e.skillGroup || "", this.lastQuestion = e.lastQuestion || "", this.sid = "", this.chatInstance = e.chatInstance, window.ifRobotEvaluate = this.ifRobotEvaluate
            };
        p.prototype = {
            popWindow: function() {
                this.EvaluatePop && (this.EvaluatePop.destroy(), this.EvaluatePop = null);
                try {
                    window.AlipayJSBridge && AlipayJSBridge.call("popWindow")
                } catch (e) {}
            },
            pushWindowFn: function(e) {
                if (window.AlipayJSBridge) try {
                    AlipayJSBridge.call("pushWindow", {
                        url: e,
                        param: {
                            readTitle: !0,
                            showOptionMenu: !1,
                            showToolBar: !1,
                            showLoading: !0,
                            showTitleBar: !0
                        }
                    })
                } catch (t) {} else window.location.href = e
            },
            leaveAjax: function(e, t, n) {
                e = e || {};
                var i = "",
                    s = this,
                    c = e.type,
                    u = "";
                switch (c) {
                    case "1":
                        i = "satisfy", u = "1";
                        break;
                    case "-1":
                        i = e.code ? e.code : "unsatisfy", u = "3";
                        break;
                    case "0":
                        i = "none", u = "5";
                        break;
                    case null:
                        i = !1
                }
                var d = window.initData.robotId || "",
                    p = window.CHATCONFIG.sessionStatus,
                    f = (this.get("onlineChat"), this.get("sid") || ""),
                    v = s.cliveNeedEvaluate(p),
                    g = s.cliveNeedOffline(p),
                    m = this.get("connectStatus");
                f = h.getReconnectSwitch() === !0 ? h.getRecord().sid : f;
                var w = h.getReconnectSwitch() === !0 ? h.getRecord().connectToken : this.get("cliveToken"),
                    y = "robot" === p ? "ROBOT" : "ONLINE",
                    T = "robot" === p ? window.chatId4Bi : w,
                    b = {
                        serviceType: y,
                        robotId: d,
                        chatId: T,
                        cliveSid: f,
                        evalType: c,
                        evalWords: i,
                        _input_charset: "utf-8"
                    };
                if (!r.app.is || a.isAfwealth() || a.isAlipay() && r.app.version <= 8.3) {
                    if (n) return void o.cliveOffline(w, f);
                    v && u && o.feedbackClive(f, u, i), (g || m || h.getReconnectSwitch() === !0) && o.cliveOffline(w, f), i && o.evaluateAnswer(b), d && o.robotOffline(d)
                } else {
                    var C = h.getReconnectSwitch() === !0 ? o.urls.tempOffline : o.urls.cliveOffline,
                        k = a.csmobileUrl(o.urls.robotOffline),
                        I = "robotId=" + d,
                        E = a.cliveUrl(C) + "?userId=" + window.CHATCONFIG.userId + "&sid=" + f + "&instanceId=" + window.CHATCONFIG.instanceId + "&token=" + w + "&ctoken=" + l.getCtoken(),
                        S = a.csmobileUrl(o.urls.evaluate),
                        x = a.cliveUrl(o.urls.feedbackClive) + "?sid=" + f + "&feedback=" + u + "&feedbackNote=" + i + "&ctoken=" + l.getCtoken(),
                        A = "serviceType=" + y + "&robotId=" + d + "&chatId=" + T + "&cliveSid=" + f + "&evalType=" + c + "&evalWords=" + i;
                    if (n) return void a.appHttpRequest(E);
                    "ios" === r.os.name ? (i && a.appHttpRequest(S, "POST", A), d && a.appHttpRequest(k, "POST", I)) : (A = "?serviceType=" + y + "&robotId=" + d + "&chatId=" + T + "&cliveSid=" + f + "&evalType=" + c + "&evalWords=" + i, i && a.appHttpRequest(S + A), I = "?robotId=" + d, d && a.appHttpRequest(k + I)), v && u && a.appHttpRequest(x), (g || m || h.getReconnectSwitch() === !0) && a.appHttpRequest(E)
                }
                "ios" === r.os.name ? t && s.popWindow() : setTimeout(function() {
                    t && s.popWindow()
                }, 200), this.EvaluatePop && this.EvaluatePop.destroy()
            },
            offline: function(e) {
                e = e || {};
                var t = this,
                    n = e.no;
                this.EvaluatePop = c.render({
                    title: e.title,
                    yes: e.yes,
                    no: n,
                    giveUp: e.giveUp,
                    behavior: e.behavior,
                    leaveOk: function() {
                        t.leaveAjax({
                            type: "1"
                        }, !0)
                    },
                    leaveShit: function() {
                        t.leaveAjax({
                            type: "-1"
                        }, !0)
                    },
                    unSolveReason: function(e) {
                        var n = e.data("code");
                        t.leaveAjax({
                            type: "-1",
                            code: n
                        }, !0)
                    },
                    callHotline: function() {
                        t.leaveAjax({
                            type: "-1"
                        }, !0)
                    },
                    leaveRefused: function() {
                        t.leaveAjax({
                            type: "0"
                        }, !0)
                    },
                    callback: function(e) {
                        return window.context && 5 === window.context.prodChannel ? void(e && e(!0, [], "leave")) : t.onlineChat ? void o.sendGetRequest("checkCallback", {
                            skillGroup: t.skillGroup,
                            lastQuestion: t.lastQuestion
                        }, function(n) {
                            var i = n.checkCall || {};
                            if ("true" === i.isCall) {
                                t.leaveAjax({
                                    type: "-1"
                                }, !1);
                                var o = "?userMobile=" + i.userMobile + "&callToken=" + i.callToken + "&callGroup=" + i.callGroup + "&accessId=" + t.sid + "&bizToken=" + window.CHATCONFIG.bizToken + "&sid=" + SESSIONID;
                                t.pushWindowFn(a.csmobileUrl("/mypa/bookCall.htm" + o))
                            } else e && e()
                        }, function() {
                            e && e()
                        }) : e && e(!t.onlineChat, n.item || [])
                    },
                    backChat: function(e) {
                        if ("mask" === e) {
                            var n = "evaluateMaksInRobot";
                            t.get("onlineChat") && (n = "evaluateMaksInHuman"), u.seed("mypaBi", "evaluateMaksClick", n)
                        } else if ("button" === e)
                            if (t.get("onlineChat") || "serviceClosed" === window.CHATCONFIG.sessionStatus) u.seed("mypaBi", "keepChat", "keepChat");
                            else {
                                u.seed("mypaBi", "backToIndex", "backToIndex");
                                var o = "-1";
                                i("body").find(".J-hotline").hasClass("fn-hide") && (o = null), t.leaveAjax({
                                    type: o
                                }, !0)
                            }
                        t.chatInstance.clearWritingInfo()
                    }
                })
            },
            ifRobotEvaluate: function() {
                var e = this;
                o.robotNeedEvaluate({
                    bizToken: window.CHATCONFIG.bizToken
                }, function(t) {
                    if ("ok" === t.stat) {
                        var n = t.data || {};
                        if (n.needEval) {
                            var i = {
                                title: " \u672c\u6b21\u670d\u52a1\u662f\u5426\u89e3\u51b3\u4e86\u60a8\u7684\u95ee\u9898\uff1f",
                                yes: "\u89e3\u51b3",
                                no: {
                                    text: "\u672a\u89e3\u51b3"
                                },
                                behavior: "\u8fd4\u56de\u9996\u9875"
                            };
                            i.no.item = s.evaluateList(window.CHATCONFIG.evaluation, 4), window.robotBackData = i, e.offline(i)
                        } else e.leaveAjax({
                            type: null
                        }, !0)
                    } else e.leaveAjax({
                        type: null
                    }, !0)
                }, function() {
                    e.leaveAjax({
                        type: null
                    }, !0)
                })
            },
            register: function() {
                var e = this,
                    t = this.robotId;
                window.offline = this.offline, this.inApp() ? document.addEventListener("back", function(t) {
                    window.SOCIALPARAMS && 1 === SOCIALPARAMS.sync && d("back"), e.get("onlineChat") ? (t.preventDefault(), h.getReconnectSwitch() !== !0 ? e.offline({
                        title: "\u5bf9\u5728\u7ebf\u5ba2\u670d\u7684\u670d\u52a1\u60a8\u662f\u5426\u6ee1\u610f\uff1f",
                        yes: "\u6ee1\u610f",
                        no: {
                            text: "\u4e0d\u6ee1\u610f"
                        },
                        giveUp: "\u6682\u4e0d\u8bc4\u4ef7",
                        behavior: "\u7ee7\u7eed\u804a\u5929"
                    }) : e.leaveAjax({
                        type: null
                    }, !0)) : e.get("onlineChat") || "robot" !== window.CHATCONFIG.sessionStatus ? (t.preventDefault(), e.leaveAjax({
                        type: null
                    }, !0)) : (t.preventDefault(), e.chatInstance.validAnswer ? e.ifRobotEvaluate() : e.leaveAjax({
                        type: null
                    }, !0))
                }, !1) : window.onbeforeunload = function(n) {
                    var i = n.target.activeElement;
                    console.log("onbeforeunload"), i && /tel:/.test(i.href) || (o.robotOffline(t), e.get("onlineChat") && o.cliveOffline(h.getRecord().connectToken, h.getRecord().sid))
                }
            },
            cliveNeedEvaluate: function(e) {
                return !("robot" === e || "userOvertime" === e)
            },
            cliveNeedOffline: function(e) {
                return !("robot" === e)
            },
            inApp: function() {
                var e = r.app;
                return e.is && window.AlipayJSBridge
            },
            get: function(e) {
                return this[e]
            },
            set: function(e, t) {
                this[e] = t
            }
        }, e.exports = p
    },
    function(e, t, n) {
        "use strict";
        var i = n(44),
            o = n(157),
            r = (n(35), n(31)),
            a = n(9),
            s = n(5),
            c = n(3),
            l = {
                render: function(e) {
                    var t = this;
                    r.packUpkeyBoard(function() {
                        t.renderPop(e)
                    })
                },
                renderPop: function(e) {
                    if (this.model = e || {}, !this.pop) {
                        this.pop = new i({
                            template: o({
                                title: this.model.title,
                                yes: this.model.yes,
                                no: this.model.no,
                                giveUp: this.model.giveUp,
                                behavior: this.model.behavior
                            }),
                            width: "100%",
                            className: "wrap-Evaluate-pop",
                            mask: !0,
                            maskTpl: '<div class="am-mask J-chat-evaluate-mask" style="width:100%;height:100%;top:0;left:0;"></div>',
                            align: {
                                type: "bottom"
                            },
                            effect: "slide",
                            direction: "up"
                        }), this.pop.show(), window.pop = this.pop;
                        var t = this.pop.element;
                        return this.bindEvaluateEvent(t), this.pop
                    }
                },
                _showMore: function(e, t) {
                    e.addClass("fn-hide"), t.removeClass("fn-hide");
                    var n = this.pop.get("y"),
                        i = t.height() - 53;
                    this.pop.set("y", n - i)
                },
                bindEvaluateEvent: function(e) {
                    var t = this,
                        n = e.find(".J-ok"),
                        i = e.find(".J-shit"),
                        o = e.find(".J-none"),
                        r = e.find(".J-hotline"),
                        l = e.find(".J-unSolved-btn"),
                        u = e.find(".J-call"),
                        d = e.find(".J-shit-back"),
                        h = c("body").find(".J-chat-evaluate-mask"),
                        p = e.find(".J-back");
                    n.on("tap", function() {
                        i.addClass("disabled"), c(this).hasClass("disabled") || (t.model.leaveOk && t.model.leaveOk(), t.destroy())
                    }), i.on("tap", function() {
                        n.addClass("disabled"), c(this).hasClass("disabled") || t.model.callback && t.model.callback(function(e, n, o) {
                            o && "leave" === o && t.destroy(), console.log("reasonData", n), e ? n.length ? t._showMore(i, r) : t.model.leaveShit && t.model.leaveShit() : "true" === window.CHATCONFIG.turn2Hotline ? t._showMore(i, r) : t.model.leaveShit && t.model.leaveShit()
                        })
                    }), u.on("tap", function(e) {
                        var n = c(e.currentTarget)[0].getAttribute("href");
                        location.href = n, s.isAndroid() ? setTimeout(function() {
                            t.model.callHotline && t.model.callHotline()
                        }, 200) : t.model.callHotline && t.model.callHotline(), a.seed("mypaBi", "call95188", "call95188InBack")
                    }), d.on("click", function(e) {
                        e.preventDefault()
                    }), d.on("tap", function() {
                        t.destroy(), t.model.leaveShit && t.model.leaveShit()
                    }), l.on("tap", function(e) {
                        var n = c(e.currentTarget);
                        t.model.unSolveReason && t.model.unSolveReason(n), t.destroy()
                    }), o.on("tap", function(e) {
                        t.model.leaveRefused && t.model.leaveRefused(), t.destroy()
                    }), h.on("tap", function() {
                        t.model.backChat && t.model.backChat("mask"), t.destroy()
                    }), p.on("tap", function() {
                        t.model.backChat && t.model.backChat("button"), t.destroy()
                    })
                },
                destroy: function() {
                    this.pop && this.pop.destroy(), this.pop = null
                }
            };
        e.exports = l
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(35),
            r = n(97),
            a = n(31),
            s = n(102),
            c = n(62),
            l = n(9);
        n(170);
        var u = "SAFE_AREA_QUESTION_WINDOW",
            d = "NORMAL_VALIDATE_QUESTION_WINDOW",
            h = "H5_NORMAL_VALIDATE_QUESTION_WINDOW",
            p = {
                checkType: function(e, t, n) {
                    switch (e) {
                        case u:
                        case d:
                            this.showIdentifyCheck(e, this.parseExtParams(n));
                            break;
                        default:
                            this.defaultCheck(e, t)
                    }
                },
                buildConfirm: function(e, t) {
                    a.packUpkeyBoard(function() {
                        s.Confirm.show({
                            message: c.onlineText.idCheckConfirmTitle,
                            okButton: c.onlineText.idCheckOk,
                            className: "identify-check-confirm",
                            align: {
                                type: "center"
                            },
                            cancelButton: c.onlineText.idCheckCancel
                        }, function(e) {
                            t && t(e)
                        })
                    })
                },
                buildIdCheckPushPrams: function(e, t, n) {
                    var i = "pushType=VISITOR_COMMIT&msg_code=PUSH_SERVICE&windowCode=" + e;
                    return n && (i += n), {
                        sid: this.extParams.sid,
                        visitorId: this.extParams.visitorId,
                        token: this.extParams.token,
                        windowCode: e,
                        pushType: t ? "VISITOR_COMMIT" : "VISITOR_REFUSE",
                        pushValues: i
                    }
                },
                parseExtParams: function(e) {
                    console.log("extParams", e), e = e || {};
                    var t = e.extAttrs;
                    try {
                        t = decodeURIComponent(t), t = JSON.parse(t)
                    } catch (n) {
                        t = {}
                    }
                    return console.log("extAttrs", t), i.extend(t, this.extParams)
                },
                idCheckParams: function(e, t) {
                    var n = {};
                    return e === u ? n.token = t : n.verifyId = t, n
                },
                getClientInfo: function(e) {
                    var t = this;
                    window.AlipayJSBridge.call("getClientInfo", function(n) {
                        t.getAppToken(function(t) {
                            e && e(n, t)
                        })
                    })
                },
                getAppToken: function(e) {
                    window.AlipayJSBridge && AlipayJSBridge.call("checkJSAPI", {
                        api: "getAppToken"
                    }, function(t) {
                        t.available ? AlipayJSBridge.call("getAppToken", {
                            appName: "kefugongzuotai",
                            appKey: "G2UfjSjeYXD6ZGFO"
                        }, function(t) {
                            console.log("getApptoken", t), e && e(t.appToken)
                        }) : e && e("")
                    })
                },
                showIdentifyCheck: function(e, t) {
                    var n = this,
                        i = t.input_lable;
                    console.log("verifyId", i), i && this.buildConfirm("", function(t) {
                        var o = "&verifyId=" + i;
                        if (t.ok)
                            if (e !== h) try {
                                console.log("verifyIdentity-params:", n.idCheckParams(e, i)), window.AlipayJSBridge && AlipayJSBridge.call("verifyIdentity", n.idCheckParams(e, i), function(t) {
                                    console.log("verifyIdentityResult", t), t = t || {}, l.seed("mypaBi", "idCheck", "idCheck", t), n.getClientInfo(function(i, r) {
                                        o = o + "&umidToken=" + i.umidToken + "&verifyCode=" + t.verifyCode + "&code=" + t.code + "&appToken=" + r, n.pushWindowAjax(n.buildIdCheckPushPrams(e, !0, o))
                                    })
                                })
                            } catch (r) {} else n.getClientInfo(function(t) {
                                o = o + "&umidToken=" + t.umidToken, n.pushWindowAjax(n.buildIdCheckPushPrams(e, !0, o), function() {
                                    try {
                                        AlipayJSBridge.call("pushWindow", {
                                            url: window.CHATCONFIG.mobileicServer + "/enterMobileVerify.htm?verifyId=" + i,
                                            param: {
                                                readTitle: !0
                                            }
                                        })
                                    } catch (e) {}
                                })
                            });
                            else n.pushWindowAjax(n.buildIdCheckPushPrams(e, !1)), n.chatInstance.renderMessage({
                                messageType: "system",
                                message: c.onlineText.idCheck
                            })
                    })
                },
                defaultCheck: function(e, t) {
                    var n = this,
                        i = t.pushWindow;
                    i && "LOGIN_WINDOW" !== e && (this.pushWindow = i, this.formData = [], i.fieldList.forEach(function(e) {
                        n.formData.push(n._generatePopModel(i, e))
                    }), this.formLength = i.fieldList.length, this.formLength > 0 && this.buildPop())
                },
                render: function(e, t, n) {
                    n = n || {};
                    var i = this;
                    this.index = t, this.extParams = n, this.chatInstance = n.chatInstance, e && o.loadWindow(e, function(t) {
                        i.checkType(e, t, n)
                    })
                },
                getFormData: function(e, t) {
                    var n = this.pushWindow.windowCode,
                        o = this.extParams,
                        r = o.recordId,
                        a = "";
                    if (e && e.forEach(function(e) {
                            a += e.name + "=" + (e.inputData || "") + "&"
                        }), a += "pushType=VISITOR_COMMIT&msg_code=PUSH_SERVICE&windowCode=" + n, r && (a += "&recordId=" + r), o.chatInstance) try {
                        delete o.chatInstance
                    } catch (s) {
                        o.chatInstance = null
                    }
                    return i.extend({
                        windowCode: n,
                        pushType: "submit" === t ? "VISITOR_COMMIT" : "VISITOR_REFUSE",
                        pushValues: a
                    }, this.extParams)
                },
                pushWindowAjax: function(e, t) {
                    var n = this;
                    o.pushWindow(e, function() {
                        n.pop && n.pop.destroy(), t && t()
                    })
                },
                buildPop: function() {
                    var e = this;
                    a.packUpkeyBoard(function() {
                        e.buildPopDom()
                    })
                },
                buildPopDom: function() {
                    var e = this;
                    this.pop && this.pop.destroy(), this.pop = new r({
                        model: e.formData[e.index],
                        submit: function(t, n) {
                            e.formData[e.index].inputData = t, e.formData.length > e.index + 1 ? (e.index++, e.buildPop()) : e.pushWindowAjax(e.getFormData(e.formData, "submit"))
                        },
                        cancel: function(t) {
                            e.pushWindowAjax(e.getFormData("", "cancel"))
                        }
                    }), this.pop.render()
                },
                _generatePopModel: function(e, t) {
                    return {
                        title: this._subStringWindowTitle(e.title),
                        errMsg: t.not_match_tip,
                        placeholder: t.label,
                        type: t.type,
                        pushCode: e.windowCode,
                        reg: t.allowFormat,
                        name: t.name,
                        cancelText: e.reset || "\u53d6\u6d88",
                        submitText: e.submit || "\u63d0\u4ea4"
                    }
                },
                _subStringWindowTitle: function(e) {
                    if (e) {
                        e = e.replace("\uff0c", ",");
                        var t = e.indexOf(",");
                        t > 0 && (e = e.substring(0, t))
                    }
                    return e
                }
            };
        e.exports = p
    },
    function(e, t, n) {
        "use strict";

        function i(e) {
            this.params = e || {}, this.status = "stopped", this.chatInstance = e.chatInstance, this.backInstance = e.backInstance, this.inputInstance = e.inputInstance, this.mids = [], this.queueKeepAliveGap = window.CHATCONFIG.queueHeartBeatInterval, this.connectedKeepAliveGap = window.CHATCONFIG.connectedHeartBeatInterval, this.fetchFailInterval = this.params.fetchFailInterval || 5, this.maxFetchErrorCount = this.params.maxFetchErrorCount || 10, this.isOnlineAlive = !1
        }
        var o = n(3),
            r = n(35),
            a = n(31),
            s = n(62),
            c = n(96),
            l = n(60),
            u = n(151),
            d = n(9),
            h = n(83),
            p = n(159);
        i.prototype = {
            getPrams: function(e) {
                return this[e]
            },
            getStatus: function() {
                return this.status
            },
            setStatus: function(e) {
                this.status = e
            },
            onlineAlive: function(e, t) {
                return void 0 == l.getRecord().sid || "" == l.getRecord.sid ? void(this.isOnlineAlive = !1) : void r.onlineChatAlive({
                    accessId: l.getRecord().sid,
                    robotId: window.initData ? window.initData.robotId : "",
                    scene: SCENE_CODE,
                    userId: l.getRecord().historyUid,
                    _input_charset: "utf-8"
                }, e, t)
            },
            onlineEnable: function() {
                return "false" != window.CHATCONFIG.onlineEnable || (this.chatInstance.renderMessage({
                    messageType: "system",
                    message: window.CHATCONFIG.onlineDisabledTips
                }), !1)
            },
            chkCancelTpl: function(e, t, n) {
                var i = e;
                return /(J-online-cancel)/.test(e) || (i = e ? e + p({
                    reqToken: t,
                    question: n
                }) : this.cancelConnect), i
            },
            connect: function(e, t) {
                var n = this;
                if (window.CHATCONFIG.sessionStatus = "connecting", console.log("connectParams", e), this.preReqToken = e.serviceToken, this.chatInstance.clearWritingInfo(), this.onlineEnable()) {
                    this.chatInstance.renderMessage({
                        messageType: "system-replace",
                        message: s.onlineText.connecting
                    });
                    var i = e.groupId || "",
                        a = e.lastQuestion || "";
                    "stopped" === this.status && (this.status = "connecting", this.backInstance.set("connectStatus", !0), d.seed("mypaBi", "connectClive", "connectClive", {
                        chatId: this.preReqToken
                    }), this.cancelConnect = s.onlineText.connecting + p({
                        reqToken: e.serviceToken,
                        question: a
                    }), r.connectServer(e, function(e) {
                        console.log("connect==>ok", e), n.chatInstance.onlineParams.uname = e.uname, t && "YES" === t && o(".J-reconnect").addClass("disabled"), n._fetchErrorCount = 0, n.chatInstance.renderMessage({
                            messageType: "system-replace",
                            message: e.msg ? e.msg + p({
                                reqToken: n.preReqToken,
                                question: a
                            }) : n.cancelConnect
                        });
                        var s = e.token;
                        n.backInstance.set("skillGroup", i), n.backInstance.set("cliveToken", s), n.backInstance.set("lastQuestion", a), n.startKeepAlive("queueKeepAliveGap", s), n.fetchMessage({
                            token: s,
                            question: a,
                            uid: e.uid,
                            sid: e.sid
                        }), window.ATSMERCHANTLOGIN || l.setReconnectSwitch(e.openReconnect), r.syncSession({
                            cliveToken: s
                        })
                    }, function(e, t) {
                        d.seed("mypaBi", "connectCliveError", t, {
                            chatId: n.preReqToken
                        }), "stopped" !== n.status && n.stopService(), n.chatInstance.renderMessage({
                            messageType: "system-replace",
                            message: void 0 == window.ATSSKILLHINT ? s.onlineText.connectFail : window.ATSSKILLHINT
                        }), l.setReconnectSwitch(e.openReconnect)
                    }))
                }
            },
            stopService: function() {
                "stopped" !== this.status && (this.backInstance.set("onlineChat", !1), this._fetchTimer && clearTimeout(this._fetchTimer), this.stopKeepAlive(), this.status = "stopped", this.backInstance.set("connectStatus", !1), this.chatInstance.onlineParams.current = "robot")
            },
            visitorOffline: function(e) {
                e = e || {}, window.ATSSHOWSKILLHINT = !1, window.ATSSHOWSKILLED = !1, l.getReconnectSwitch() === !0 && "serviceClosed" == window.CHATCONFIG.sessionStatus ? this.stopService() : l.getReconnectSwitch() !== !0 && this.stopService(), e.userTrigger ? this.backInstance.leaveAjax({
                    type: null
                }, "", !0) : this.backInstance.offline({
                    title: "\u5bf9\u5728\u7ebf\u5ba2\u670d\u7684\u670d\u52a1\u60a8\u662f\u5426\u6ee1\u610f\uff1f",
                    yes: "\u6ee1\u610f",
                    no: {
                        text: "\u4e0d\u6ee1\u610f"
                    },
                    giveUp: "\u6682\u4e0d\u8bc4\u4ef7",
                    behavior: "\u7ee7\u7eed\u804a\u5929"
                }), this.chatInstance.onlineParams.current = "robot"
            },
            fetchMessage: function(e) {
                e = e || {};
                var t = this,
                    n = e.token || "",
                    i = {
                        mids: t.mids.join(),
                        token: n,
                        uid: e.uid,
                        question: e.question,
                        sid: e.sid
                    };
                "stopped" !== this.status && r.fetchMessage(i, function(n) {
                    t.onlineMessage(n, e), t._fetchErrorCount = 0
                }, function(e, n) {
                    t._fetchErrorCount++
                }, function(e, n) {
                    if ("stop" !== t.getStatus()) {
                        if ("success" === n) return t.fetchMessage(i);
                        if (Number(t._fetchErrorCount) <= Number(t.maxFetchErrorCount)) return t._fetchTimer && clearTimeout(t._fetchTimer), void(t._fetchTimer = setTimeout(function() {
                            t.fetchMessage(i);
                        }, 1e3 * t.fetchFailInterval));
                        t.chatInstance.renderMessage({
                            messageType: "system",
                            message: s.onlineText.netFail
                        }), t.stopService()
                    }
                })
            },
            startKeepAlive: function(e, t) {
                var n = this;
                r.keepAliveFn({
                    token: t
                }), this._beatTimer = setInterval(function() {
                    "stopped" !== n.status ? r.keepAliveFn({
                        token: t
                    }) : n.stopKeepAlive()
                }, 1e3 * this.getPrams(e))
            },
            stopKeepAlive: function() {
                this._beatTimer && (clearInterval(this._beatTimer), this._beatTimer = null)
            },
            onlineMessage: function(e, t) {
                console.log("onlineMessage", t);
                var n = this,
                    i = this.mids,
                    r = t.token,
                    s = t.question,
                    p = t.sid,
                    f = {},
                    v = {},
                    g = t.uid || "";
                i.length = 0, l.getReconnectSwitch() === !0 && this.backInstance.set("connectStatus", !0), r && "" != r && n.backInstance.set("cliveToken", r), p && "" != p && n.backInstance.set("sid", p), o.each(e, function(e, p) {
                    switch (n.sid = p.sid, i.push(p.mid), f = p.extValues || {}, p.cmd) {
                        case "userRemind":
                            n.chatInstance.renderMessage({
                                messageType: "system",
                                message: p.content
                            });
                            break;
                        case "text":
                        case "serverTimeOut":
                            if ("text" === p.cmd) {
                                n.backInstance.set("onlineChat", !0), n.status = "connected", n.chatInstance.clearWritingInfo(), v = a.parseCliveInfo(p.content);
                                var m = c.messageParser(v.content);
                                console.log("cive-said:", m), n.chatInstance.renderMessage({
                                    messageType: "online",
                                    message: m
                                });
                                var w = a.buildMsgRecievedTime(v.date[1]);
                                m && h.save([{
                                    content: {
                                        answerContent: m
                                    },
                                    messageType: "online",
                                    gmtCreate: w.gmtCreate,
                                    displayTime: w.displayTime,
                                    sourceType: 2,
                                    chatType: 2
                                }])
                            }
                            break;
                        case "queueWait":
                            (p.content.indexOf("\u67090\u4f4d\u8bbf\u5ba2") > 0 || p.content.indexOf("2147483647") > 0) && (p.content = n.cancelConnect), n.chatInstance.renderMessage({
                                messageType: "system-replace",
                                message: n.chkCancelTpl(p.content, n.preReqToken, s)
                            }), window.ATSMERCHANTLOGIN && (window.ATSISVIPMERCHANT && (n.inputInstance.disabledBtn(), n.inputInstance.disabledInput()), window.ATSSHOWSKILLHINT && !window.ATSISVIPMERCHANT && 5 === window.context.prodChannel && window.ATSSHOWSKILLED !== !0 && (n.chatInstance.renderMessage({
                                messageType: "skill-hint",
                                message: window.ATSSKILLHINT
                            }), window.ATSSHOWSKILLED = !0));
                            break;
                        case "sessionStart":
                            console.log("sessionStart", s), n.chatInstance.clearSystemInfo(), n.chatInstance.clearSkillHint(), window.ATSISVIPMERCHANT && (n.inputInstance.enabledBtn(), n.inputInstance.enabledInput()), p.serverName && n.chatInstance.renderMessage({
                                messageType: "system-replace",
                                message: "\u5ba2\u670d " + p.serverName + " \u4e3a\u60a8\u670d\u52a1"
                            });
                            var y = {
                                current: "online",
                                uid: g,
                                sid: n.sid,
                                token: r
                            };
                            n.chatInstance.onlineParams = o.extend(n.chatInstance.onlineParams, y), n.backInstance.set("onlineChat", !0), n.backInstance.set("sid", n.sid), window.CHATCONFIG.sessionStatus = "sessionStart", s && n.chatInstance.sendMessage(s, "", {}, {
                                hideQuestion: !0
                            }), window.ATSMERCHANTPID && n.chatInstance.sendMessage(window.ATSMERCHANTPID, "", {}, {
                                hideQuestion: !0
                            }), n.stopKeepAlive(), n.startKeepAlive("connectedKeepAliveGap", t.token), n.status = "connected";
                            var T = window.initData ? window.initData.robotId : "";
                            l.setRecord(s, n.preReqToken, n.sid, T, r), n.chatInstance.renderMessage({
                                messageType: "online",
                                message: p.content
                            }), n.chatInstance.clearWritingInfo();
                            break;
                        case "sessionSwitch":
                            n.status = "switching", n.chatInstance.renderMessage({
                                messageType: "online",
                                message: p.content
                            }), window.ATSISVIPMERCHANT && (n.inputInstance.disabledBtn(), n.inputInstance.disabledInput());
                            break;
                        case "sessionClosed":
                            console.log("sessionClosed", s), window.ATSISVIPMERCHANT && (n.inputInstance.disabledBtn(), n.inputInstance.disabledInput());
                            var b = f["^closeType$"],
                                C = p.content;
                            if (d.seed("mypaBi", "sessionClosed", "sessionClosed", {
                                    sid: n.sid,
                                    closeType: b
                                }), "1" === b) window.CHATCONFIG.sessionStatus = "serviceClosed", n.visitorOffline();
                            else {
                                window.CHATCONFIG.sessionStatus = "userOvertime";
                                var k = n.chatInstance.getLastMessageByType("visitor") || s;
                                C = '\u670d\u52a1\u5df2\u8d85\u65f6\u65ad\u5f00,\u70b9\u6b64\u91cd\u65b0<a href="javascript:;" req-token="' + n.preReqToken + '" question="' + k + '" class="reconnect-text J-reconnect">\u8054\u7cfb\u5ba2\u670d</a>', n.stopService(), n.chatInstance.validAnswer = !1
                            }
                            n.chatInstance.renderMessage({
                                messageType: "system",
                                message: C
                            });
                            break;
                        case "PUSH_SERVICE":
                            var I = 0,
                                E = {
                                    sid: n.sid,
                                    visitorId: g,
                                    token: r,
                                    chatInstance: n.chatInstance,
                                    extAttrs: f.extAttrs || {}
                                },
                                S = f && f.windowCode;
                            console.log("windowCode", S, I, E), f.recordId && (E.recordId = f.recordId), u.render(S, I, E)
                    }
                })
            },
            getSkillHint: function(e) {
                if (window.ATSSHOWSKILLHINT = !1, window.ATSSKILLHINTGROUP)
                    for (var t = 0; t < window.ATSSKILLHINTGROUP.length; t++)
                        if (window.ATSSKILLHINTGROUP[t].skill_group === e) {
                            window.ATSSHOWSKILLHINT = !0, window.ATSSKILLHINT = window.ATSSKILLHINTGROUP[t].group_text;
                            break
                        }
            }
        }, e.exports = i
    },
    function(e, t, n) {
        "use strict";
        var i = (n(3), n(35)),
            o = n(31),
            r = n(97),
            a = {
                handleFail: function(e, t) {
                    if ("NOT_LOGIN" == e.code) t.renderMessage({
                        messageType: "system",
                        message: "<p>\u64cd\u4f5c\u5931\u8d25,\u8bf7\u5c1d\u8bd5\u767b\u9646\u540e\u518d\u64cd\u4f5c</p>"
                    });
                    else {
                        var n = e.resultMsg || "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u64cd\u4f5c\uff01";
                        t.renderMessage({
                            messageType: "system",
                            message: n
                        })
                    }
                },
                checkLogin: function(e, t) {
                    var n = this;
                    i.checkLogin(function(i) {
                        i.success && 1 === i.success ? n.showPop(e, t) : n.handleFail(i, e)
                    }, function(t) {
                        n.handleFail(t, e)
                    })
                },
                showPop: function(e, t) {
                    var n = this;
                    n.ctuPop = new r({
                        model: {
                            title: "\u8bf7\u63d0\u4f9b\u60a8\u6709\u6548\u7684\u8054\u7cfb\u65b9\u5f0f",
                            type: "text",
                            pushCode: "",
                            name: "",
                            reg: "[+-d()]{8,}",
                            maxLength: "26",
                            placeholder: "\u8bf7\u586b\u5199\u624b\u673a\u6216\u56fa\u5b9a\u53f7\u7801",
                            errMsg: "\u60a8\u8f93\u5165\u7684\u4fe1\u606f\u6709\u8bef\uff0c\u8bf7\u6838\u5bf9\u540e\u91cd\u65b0\u8f93\u5165",
                            cancelText: "\u53d6\u6d88",
                            submitText: "\u63d0\u4ea4"
                        },
                        submit: function(r, a, s) {
                            i.ctuSelfServiceFn({
                                phoneNo: r
                            }, function(i) {
                                i.success && 1 === i.success ? (e.renderMessage({
                                    messageType: "robot",
                                    answerContent: i.resultMsg
                                }), o.scrollToBottom(t)) : n.handleFail(i, e)
                            }, function() {
                                n.handleFail(d, e)
                            }, function() {
                                n.ctuPop.destroy()
                            })
                        }
                    }), n.ctuPop.render()
                },
                render: function(e, t) {
                    this.checkLogin(e, t)
                }
            };
        e.exports = a
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(5),
            r = n(83),
            a = n(35),
            s = n(7),
            c = n(94),
            l = n(93),
            u = n(31),
            d = n(96),
            h = !0,
            p = {
                init: function(e, t, n) {
                    return this.tipsElem = i(".J-history-msg"), u.isLogin(window.CHATCONFIG.userId) ? (this.scrollBoundaryOffset = 50, this.$chatWrap = t, this.scroll = e, this.paInfo = n.paInfo || {}, e.addEventListener("pulldown", i.proxy(this, "recordDistance")), void e.addEventListener("pulldownend", i.proxy(this, "load"))) : void this.tipsElem.addClass("visibility")
                },
                renderHistory: function(e) {
                    e = e || [];
                    for (var t = "", n = e.length, i = "", a = u.userStyle(window.initData.userInfo), s = {}, h = {}, p = "visitor", f = "", v = "", g = 0; g < n; g++) {
                        if (s = e[g], h = s.content, i = s.displayType, v = s.chatType, f = s.sourceType, 1 === v) {
                            if (h) {
                                var m = u.escape(h);
                                t += c({
                                    messageType: p,
                                    question: m,
                                    msgBubbleBgColor: a.msgBubbleBgColor || "#A0E75A",
                                    msgBubbleBorderColor: a.msgBubbleBorderColor || "#7CD053",
                                    avatar: a.avatar
                                })
                            }
                        } else if (1 === f) h.answerContent = o.unEscape(h.answerContent), t += l(u.buildServiceReplyData("robot", h, this.paInfo));
                        else if (2 === f) {
                            console.log("contentObj___----====", h), h = h.answerContent ? o.unEscapeHtml(h.answerContent) : o.unEscapeHtml(h), console.log("after parse", h);
                            var w = u.parseCliveInfo(h),
                                y = w.content;
                            /(image\.htm\?path\=)/.test(y) ? y = y.replace(/&amp;/g, "&") : /(&[a-z]{1,};)/.test(y) && (y = o.unEscapeHtml(y)), y = d.messageParser(y), t += l({
                                messageType: "online",
                                styleType: "robot",
                                answerContent: y,
                                serviceAvatar: this.paInfo.cliveAvatar || "https://os.alipayobjects.com/rmsportal/ueUSTNmLwcjDmfq.png"
                            })
                        }
                        r.recordLastParams(0, 1, e)
                    }
                    return t
                },
                initTips: function() {
                    this.chatData && 0 !== this.chatData.length || this.setTips("\u6682\u65e0\u5386\u53f2\u8bb0\u5f55")
                },
                recordDistance: function(e) {
                    this.scrollBoundaryOffset = e.boundaryOffset
                },
                setTips: function(e) {
                    this.tipsElem.length && this.tipsElem.text(e)
                },
                loadHistory: function(e) {
                    if (u.isLogin(window.CHATCONFIG.userId) && "0" !== window.CHATCONFIG.keepHistory) {
                        var t = this.renderHistory(e),
                            n = this.$chatWrap.find("section");
                        if (n.length > 0) {
                            var i = n.first();
                            i.before(t)
                        } else this.$chatWrap.append(t);
                        this.scroll.refresh()
                    }
                },
                getHistoryChat: function(e, t, n) {
                    var i = r.getExt(),
                        o = i.endTime,
                        s = i.msgId,
                        c = {
                            ctoken: u.getCtoken()
                        };
                    o && (c.endTime = o), s && (c.msgId = s), a.getHisChat(c, function(e) {
                        e = e || {};
                        var n = e.data || {},
                            i = n.messages || [];
                        t && t(i.reverse(), n.hasMore), h = !1
                    }, function() {
                        n && n(), h = !1
                    })
                },
                load: function() {
                    var e = this;
                    this.scrollBoundaryOffset > 40 && e.getHistoryChat({}, function(t, n) {
                        var i = "\u6682\u65e0\u5386\u53f2\u8bb0\u5f55";
                        0 === t.length ? h || (i = "\u5df2\u52a0\u8f7d\u5168\u90e8\u5386\u53f2\u8bb0\u5f55") : (e.loadHistory(t), i = "\u4e0b\u62c9\u52a0\u8f7d\u5386\u53f2\u8bb0\u5f55"), 0 === n && (i = "\u5df2\u52a0\u8f7d\u5168\u90e8\u5386\u53f2\u8bb0\u5f55"), e.setTips(i)
                    }, function() {
                        e.setTips("\u6682\u65e0\u5386\u53f2\u8bb0\u5f55")
                    })
                },
                delay: function f() {
                    var f = 200;
                    return "ios" === s.os.name && /(^8.1)|(^8.2)/.test(s.os.fullVersion) && (f = 500), f
                }
            };
        e.exports = p
    },
    function(e, t, n) {
        "use strict";
        var i = n(3),
            o = n(9),
            r = n(29),
            a = n(62);
        n(31);
        n(106);
        var s = r.extend({
            attr: {
                triggerElem: i("#iptBox")
            },
            setup: function() {
                this.duration = 0, this.voiceId = "", this.speechProgress = i(".J-speech-progress"), this.$iptBox = this.get("triggerElem"), this.$speechBtn = this.$iptBox.find("#speech"), this.$infoMsgHolder = this.$iptBox.find("#info"), this.chat = this.get("chat"), this.status = {
                    longTap: !1,
                    displacementY: 0,
                    dragging: !1
                }, this.message = {
                    info: "",
                    result: "",
                    startError: "",
                    recognizeError: ""
                }, this.bindEvent();
                var e = this,
                    t = e.status,
                    n = e.message;
                document.addEventListener("speechRecognizer", function(i) {
                    i.data.uid && (e.voiceId = e.voiceId + "-" + i.data.uid), t.longTap && !t.dragging ? e.startSpeech() : (i.data.error ? (n.recognizeError = e._handleErrorCodeByErrorType(i.data.error), n.result || e.showMsg("recognizeError")) : i.data.result && (n.result += i.data.result), n.result && (e.showMsg("result"), o.seed("mypaBi", "voiceUsed", "voiceUsed", {
                        voiceId: e.voiceId,
                        duration: e.duration,
                        convertTxt: n.result
                    }), n.result = "", e.voiceId = "", e.duration = 0))
                })
            },
            bindEvent: function() {
                var e = this,
                    t = e.status;
                this.$speechBtn.on("touchstart", function(n) {
                    n.preventDefault(), e.$speechBtn.text("\u677e\u5f00   \u53d1\u9001"), t.displacementY = 0, e.startSpeech(), t.longTap = !0, e.startTimer()
                }), this.$speechBtn.on("touchmove", function(e) {
                    e.preventDefault()
                }), this.$speechBtn.on("touchend", function() {
                    console.log("touchend"), e.$speechBtn.text("\u6309\u4f4f   \u8bf4\u8bdd"), e.cancelTimer(), window.AlipayJSBridge && AlipayJSBridge.call("stopSpeech"), t.longTap = !1, e.duration = ((new Date).getTime() - e.duration) / 1e3
                }), this.$speechBtn.on("touchcancel", function() {
                    console.log("touchcancel"), window.AlipayJSBridge && AlipayJSBridge.call("stopSpeech"), e.message && e.message.result ? (e.showMsg("result"), e.message.result = "") : e.showMsg("toast", "\u521a\u624d\u6709\u70b9\u6ca1\u542c\u61c2\uff0c\u80fd\u6362\u4e2a\u8bf4\u6cd5\u518d\u4e00\u6b21\u561b")
                }), this.$speechBtn.on("drag", function(n) {
                    e.$speechBtn.text("\u6309\u4f4f   \u8bf4\u8bdd"), t.dragging || (t.displacementY = Math.abs(n.displacementY), e.showMsg("info", t.displacementY), t.displacementY > 80 && (t.dragging = !0, AlipayJSBridge.call("cancelSpeech")))
                })
            },
            startSpeech: function() {
                var e = this;
                this.duration = (new Date).getTime(), window.AlipayJSBridge && AlipayJSBridge.call("startSpeech", {
                    iOSKey: "21812030",
                    androidKey: "21812030"
                }, function(t) {
                    if (t.error) {
                        var n = e._handleErrorCodeByErrorType(t.error);
                        e.showMsg("toast", n)
                    }
                })
            },
            _handleErrorCodeByErrorType: function(e) {
                var t = a.speechRecognizeErrorText;
                return t ? t[e] ? t[e] : t["default"] || "" : ""
            },
            startTimer: function() {
                this.speechProgress.removeClass("fn-hide")
            },
            handleTime: function(e) {
                var t = e.toString();
                return t.length > 2 ? t : "0" + t
            },
            cancelTimer: function() {
                this.speechProgress.addClass("fn-hide")
            },
            showMsg: function(e, t) {
                var n = this.message,
                    o = n[e] ? n[e] : t;
                switch (e) {
                    case "toast":
                    case "startError":
                    case "recognizeError":
                        AlipayJSBridge.call("toast", {
                            content: o,
                            duration: 3e3
                        }, function() {}), this.chat.clearWritingInfo();
                        break;
                    case "info":
                        this.$infoMsgHolder.text(o);
                        break;
                    case "result":
                        this.chat.sendMessage(o);
                        break;
                    case "time":
                        i("#time").text(o)
                }
            }
        });
        e.exports = s
    },
    function(e, t) {
        "use strict";
        var n = {
            syncMsg: function(e) {
                var t = this;
                console.log("\u5f00\u59cb\u76d1\u542c: syncMessage_MYPA-CHAT"), document.addEventListener("syncMessage_MYPA-CHAT", function(n) {
                    console.log("\u76d1\u542c\u7684\u7ed3\u679c:", n);
                    var i = n.data;
                    e && e(i), t.responseSyncNotify(i)
                }, !1)
            },
            registerSync: function(e, t) {
                console.log(this), this.syncMsg(t), console.log("\u5f00\u59cb\u6ce8\u518c===>"), AlipayJSBridge.call("registerSync", {
                    bizType: "MYPA-CHAT"
                }, function(e) {
                    console.log("\u6ce8\u518c\u8fd4\u56de\u7ed3\u679c===> ", e)
                })
            },
            unregisterSync: function(e) {
                AlipayJSBridge.call("unregisterSync", {
                    bizType: "MYPA-CHAT"
                }, function(e) {
                    console.log("\u6ce8\u9500sync\u7ed3\u679c", e)
                })
            },
            responseSyncNotify: function(e) {
                AlipayJSBridge.call("responseSyncNotify", {
                    message: e
                }, function(e) {
                    console.log(e.error, e.errorMessage)
                })
            }
        };
        e.exports = n
    },
    function(e, t) {
        "use strict";
        e.exports = function(e) {
            return function(e, t, n, i, o) {
                var r = '<div class="am-dialog mypa-dialog" am-mode="show"><div class="am-dialog-wrap"><div class="am-dialog-header">';
                return r += e, r += '</div><div class="am-dialog-body feedback-dialog-body"><button type="button" class="mypa-dialog-button J-ok button-ok">', r += t, r += '</button><button type="button" class="mypa-dialog-button J-shit button-shit">', r += n.text, r += '</button><div class="J-hotline fn-hide hotline wrap-no">', n.item && n.item.length > 0 ? n.item.forEach(function(e) {
                    r += '<div class="am-flexbox reason-list">', e.list.forEach(function(e) {
                        r += '<div class="am-flexbox-item" ', e.width && (r += ' style="width:', r += e.width, r += '"'), r += ">", e.code && (r += '<button class="J-unSolved-btn" data-code="', r += e.code, r += '">', r += e.comment, r += "</button>"), r += "</div>"
                    }), r += "</div>"
                }) : r += '<div>\u95ee\u9898\u672a\u89e3\u51b3\u5417\uff1f\u4e3a\u4f60\u5b89\u6392\u4e86\u7535\u8bdd\u5ba2\u670d\u7684\u5feb\u901f\u901a\u9053<a href="tel:95188" class="J-call">\u70b9\u6b64\u62e8\u6253</a>\uff0c\u4f60\u8fd8\u53ef\u4ee5<a href="javascript:;" class="J-shit-back">\u8fd4\u56de\u9996\u9875</a></div>', r += "</div>", i && (r += '<button type="button" class="mypa-dialog-button J-none button-giveup">', r += i, r += "</button>"), r += '<button type="button" class="mypa-dialog-button J-back button-back">', r += o, r += "</button></div></div></div>"
            }(e.title, e.yes, e.no, e.giveUp, e.behavior)
        }
    },
    function(e, t) {
        "use strict";
        e.exports = function(e) {
            return function(e, t, n, i, o, r, a, s, c, l) {
                var u = '<div class="am-dialog mypa-dialog" am-mode="show"><div class="am-dialog-wrap"><div class="am-dialog-header"><h3>';
                return u += e, u += '</h3></div><div class="am-dialog-body"><input class="am-password-former J-ipt" type="', u += t, u += '" pushcode="', u += n, u += '" name="', u += i, u += '" reg="', u += o, u += '" maxlength="', u += r, u += '" value="" placeholder="', u += a, u += '"><p class="am-dialog-brief err-msg J-errMsg fn-hide">', u += s, u += '</p></div><div class="am-dialog-footer"><button type="button" class="am-dialog-button J-cancel">', u += c, u += '</button><button type="button" class="am-dialog-button J-sub">', u += l, u += "</button></div></div></div>"
            }(e.title, e.type, e.pushCode, e.name, e.reg, e.maxLength, e.placeholder, e.errMsg, e.cancelText, e.submitText)
        }
    },
    function(e, t) {
        "use strict";
        e.exports = function(e) {
            return function(e, t) {
                var n = '<a href="javascript:;" question="';
                return n += e, n += '" req-token="', n += t, n += '" class="J-online-cancel">\u53d6\u6d88</a>'
            }(e.question, e.reqToken)
        }
    },
    function(e, t) {
        "use strict";
        e.exports = function(e) {
            return function(e, t, n, i, o) {
                var r = '<ul class="wrap-trade-info"> <li> <div class="title">\u4ea4\u6613\u65f6\u95f4\uff1a</div> <div class="value">';
                return r += e, r += '</div> </li> <li> <div class="title">\u4ea4\u6613\u72b6\u6001\uff1a</div> <div class="value">', r += t, r += '</div> </li> <li> <div class="title">\u4ea4\u6613\u540d\u79f0\uff1a</div> <div class="value">', r += n, r += '</div> </li> <li> <div class="title">\u4ea4\u6613\u91d1\u989d\uff1a</div> <div class="value">', r += i, r += '</div> </li> <li> <div class="title">\u8ba2\u5355\u53f7\uff1a</div> <div class="value">', r += o, r += "</div> </li></ul>"
            }(e.time, e.stateDesc, e.title, e.amount, e.bizInNo)
        }
    }, , , , , , , , 27, 27, 27, , 27, , , , , ,
    function(e, t) {
        function n(e) {
            return e = e || 7, Math.random().toString(35).substr(2, e)
        }
        e.exports = n
    }, , , ,
    function(e, t, n, i, o) {
        var r = n(i);
        n(o), e.exports = r
    }, , , , , ,
    function(e, t, n, i, o) {
        var r = n(1);
        n(2), n(i), n(o), e.exports = r
    }
]));
