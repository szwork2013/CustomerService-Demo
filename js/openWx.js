! function(g, initFunc) {
    'function' == typeof define && (define.amd || define.cmd) ? define(function() {
            return initFunc(g);
        }: initFunc(g, true)
    }(this, function(glob, setGlobal) {

        // 从原生注入 WeixinJSBridge 后，直接调用原生方法，没有的话直接debug输出
        function invokeCmd(cmd, param, callbackObj) {
            glob.WeixinJSBridge ? WeixinJSBridge.invoke(cmd, normParameter(param), function(res) {
                completeBridgeInteraction(cmd, res, callbackObj);
            }) : debugBridgeInteraction(cmd, callbackObj)
        }

        // 事件绑定
        function bindEvent(targetItem, callbackObj, debugCallback) {
            glob.WeixinJSBridge ? WeixinJSBridge.on(targetItem, function(res) {
                if (debugCallback && debugCallback.trigger)
                    debugCallback.trigger(res);
                completeBridgeInteraction(targetItem, res, callbackObj);
            }) : debugCallback ? debugBridgeInteraction(targetItem, debugCallback) : debugBridgeInteraction(targetItem, callbackObj);
        }

        function normParameter(param) {
            param = param || {};
            param.appId = cfg.appId;
            param.verifyAppId = cfg.appId;
            param.verifySignType = 'sha1';
            param.verifyTimestamp = cfg.timestamp + '';
            param.verifyNonceStr = cfg.nonceStr;
            param.verifySignature = cfg.signature;

            return param;
        }

        function buildPayParameter(obj) {
            return {
                timeStamp: obj.timestamp + '',
                nonceStr: obj.nonceStr,
                'package': obj.package,
                paySign: obj.paySign,
                signType: obj.signType || 'SHA1'
            };
        }

        function completeBridgeInteraction(cmd, res, callbackObj) {
            //var d, e, f;
            var errMsg, resMsg;

            delete res.err_code;
            delete res.err_desc;
            delete res.err_detail;
            errMsg = res.errMsg;
            if (!errMsg) {
                errMsg = res.err_msg;
                delete res.err_msg;
                errMsg = parseResultMsg(cmd, errMsg, callbackObj);
                res.errMsg = errMsg;
            }

            callbackObj = callbackObj || {};
            if (callbackObj._complete) {
                callbackObj._complete(res);
                delete callbackObj._complete;
            }
            //debug, show command result
            if (cfg.debug && !callbackObj.isInnerInvoke)
                alert(JSON.stringify(res));

            errMsg = res.errMsg || '';
            resMsg = errMsg.substring(errMsg.indexOf(':') + 1);
            switch (resMsg) {
                case 'ok':
                    {
                        if (callbackObj.success) {
                            callbackObj.success(res);
                        }
                        // callbackObj.success && callbackObj.success(res);
                        break;
                    }
                case 'cancel':
                    {
                        if (callbackObj.cancel) {
                            callbackObj.cancel(res);
                        }
                        // callbackObj.cancel && callbackObj.cancel(res);
                        break;
                    }
                default:
                    {
                        if (callbackObj.fail) {
                            callbackObj.fail(res);
                        }
                        // callbackObj.fail && callbackObj.fail(res);
                    }
            }
            if (callbackObj.complete) {
                callbackObj.complete(res);
            }
            // callbackObj.complete && callbackObj.complete(res);
        }

        function parseResultMsg(cmd, errMsg) {
            var idx, cmdStr, msgStr;

            if (errMsg) {
                idx = errMsg.indexOf(':');

                switch (cmd) {
                    case apiNameMap.config:
                        cmdStr = 'config';
                        break;
                    case apiNameMap.openProductSpecificView:
                        cmdStr = 'openProductSpecificView';
                        break;
                    default:
                        cmdStr = errMsg.substring(0, idx).replace(/_/g, ' ').replace(/\b\w+\b/g, function(str) {
                            return str.substring(0, 1).toUpperCase() + str.substring(1);
                        });

                        cmdStr = cmdStr.substring(0, 1).toLowerCase() + cmdStr.substring(1);
                        cmdStr = cmdStr.replace(/ /g, '');
                        if (cmdStr.indexOf('Wcpay') != -1)
                            cmdStr = cmdStr.replace('Wcpay', 'WCPay');

                        if (apiNameMapInv[cmdStr])
                            cmdStr = apiNameMapInv[cmdStr];
                } //end switch

                msgStr = errMsg.substring(idx + 1);
                if (msgStr == 'confirm')
                    msgStr = 'ok';
                if (msgStr == 'failed')
                    msgStr = 'fail';
                if (msgStr.indexOf('failed_') != -1)
                    msgStr = msgStr.substring(7);
                if (msgStr.indexOf('fail_') != -1)
                    msgStr = msgStr.substring(5);

                msgStr = msgStr.replace(/_/g, ' ').toLowerCase();
                if (msgStr == 'access denied' || msgStr == 'no permission to execute')
                    msgStr = 'permission denied';
                if (cmdStr == 'config' && msgStr == 'function not exist')
                    msgStr = 'ok';

                errMsg = cmdStr + ':' + msgStr;
            }

            return errMsg;
        }


        function mapApiBridgeId(names) {
            if (names) {
                for (var idx = 0, len = names.length; idx < len; idx++) {
                    var n = names[idx];
                    if (apiNameMap[n])
                        names[idx] = apiNameMap[n];
                }

                return names;
            }
        }


        function debugBridgeInteraction(cmd, callbackObj) {
            if (cfg.debug && !callbackObj.isInnerInvoke) {
                if (apiNameMapInv[cmd])
                    cmd = apiNameMapInv[cmd];
                if (callbackObj && callbackObj._complete)
                    delete callbackObj._complete;

                console.log('"' + cmd + '",', callbackObj || '');
            }
        }


        function reportSDK() {
            if (!('6.0.2' > wxVer || sdkInfo.systemType < 0)) {
                var img = new Image();

                sdkInfo.appId = cfg.appId,
                    sdkInfo.initTime = timeInfo.initEndTime - timeInfo.initStartTime,
                    sdkInfo.preVerifyTime = timeInfo.preVerifyEndTime - timeInfo.preVerifyStartTime,
                    wxAPI.getNetworkType({
                        isInnerInvoke: true,
                        success: function(typeInfo) {
                            sdkInfo.networkType = typeInfo.networkType;
                            var url = 'https://open.weixin.qq.com/sdk/report?v=' + sdkInfo.version + '&o=' + sdkInfo.isPreVerifyOk + '&s=' + sdkInfo.systemType + '&c=' + sdkInfo.clientVersion + '&a=' + sdkInfo.appId + '&n=' + sdkInfo.networkType + '&i=' + sdkInfo.initTime + '&p=' + sdkInfo.preVerifyTime + '&u=' + sdkInfo.url;
                            img.src = url;
                        }
                    })
            }
        }


        function getCurrentTimestamp() {
            return (new Date()).getTime();
        }


        function regWXReadyFunc(readyFunc) {
            if (isWXBrowser) {
                glob.WeixinJSBridge ? readyFunc() : doc.addEventListener && doc.addEventListener('WeixinJSBridgeReady', readyFunc, false);
            }
        }

        function extendBridgeInteraction() {
            if (!wxAPI.invoke) {
                wxAPI.invoke = function(cmd, param, callbackFunc) {
                    if (glob.WeixinJSBridge)
                        WeixinJSBridge.invoke(cmd, normParameter(param), callbackFunc);
                };
                wxAPI.on = function(targetItem, callbackFunc) {
                    if (glob.WeixinJSBridge)
                        WeixinJSBridge.on(targetItem, callbackFunc);
                };
            }
        }



        var wxAPI; //API object, C
        var isWXBrowser; //is weixin browser? t
        var isAndroid; //is android browser? u
        var isIOS; //is iphone or ipad browser? v
        var doc; //document object, q
        var apiNameMap; //api name - bridge command mapping, o
        var apiNameMapInv; //bridge command - api name mapping, p
        var title; //document title, r
        var nav; //navigator string, s
        var wxVer; //weixin version, w
        var timeInfo; //timestamp information, x
        var sdkInfo; //sdk information, y
        var cfg; //config information, z
        var cmdExecCB; //command execution callback, A
        var stateInfo; //state information, B

        if (!glob.jWeixin) {
            apiNameMap = {
                config: 'preVerifyJSAPI',
                onMenuShareTimeline: 'menu:share:timeline',
                onMenuShareAppMessage: 'menu:share:appmessage',
                onMenuShareQQ: 'menu:share:qq',
                onMenuShareWeibo: 'menu:share:weiboApp',
                onMenuShareQZone: 'menu:share:QZone',
                previewImage: 'imagePreview',
                getLocation: 'geoLocation',
                openProductSpecificView: 'openProductViewWithPid',
                addCard: 'batchAddCard',
                openCard: 'batchViewCard',
                chooseWXPay: 'getBrandWCPayRequest'
            };

            apiNameMapInv = function() {
                var map = {};
                for (var attr in apiNameMap)
                    map[apiNameMap[attr]] = attr;

                return map;
            }();

            doc = glob.document;
            title = doc.title;
            nav = navigator.userAgent.toLowerCase();
            isWXBrowser = (nav.indexOf('micromessenger') != -1);
            isAndroid = (nav.indexOf('android') != -1);
            isIOS = (nav.indexOf('iphone') != -1 || nav.indexOf('ipad') != -1);

            wxVer = function() {
                var m = nav.match(/micromessenger\/(\d+\.\d+\.\d+)/) || nav.match(/micromessenger\/(\d+\.\d+)/);
                return m ? m[1] : '';
            }();

            timeInfo = {
                initStartTime: getCurrentTimestamp(),
                initEndTime: 0,
                preVerifyStartTime: 0,
                preVerifyEndTime: 0
            };

            sdkInfo = {
                version: 1,
                appId: '',
                initTime: 0,
                preVerifyTime: 0,
                networkType: '',
                isPreVerifyOk: 1, //OK-0, FAIL-1
                systemType: isIOS ? 1 : isAndroid ? 2 : -1,
                clientVersion: wxVer,
                url: encodeURIComponent(location.href)
            };

            cfg = {};
            cmdExecCB = {
                _completes: []
            };
            stateInfo = {
                state: 0, //-1:fail, 1:complete
                res: {} //result data
            };

            regWXReadyFunc(function() {
                timeInfo.initEndTime = getCurrentTimestamp();
            });

            wxAPI = {
                config: function(paramObj) {
                    cfg = paramObj;
                    debugBridgeInteraction('config', paramObj);
                    var preVerifyAPI = (cfg.check === false) ? false : true;

                    regWXReadyFunc(function() {
                        //verify API
                        if (preVerifyAPI) {
                            //preform 'preVerifyJSAPI' command
                            invokeCmd(apiNameMap.config, {
                                verifyJsApiList: mapApiBridgeId(cfg.jsApiList)
                            }, function() {
                                //build command execution callback object
                                cmdExecCB._complete = function(res) {
                                    timeInfo.preVerifyEndTime = getCurrentTimestamp();
                                    stateInfo.state = 1;
                                    stateInfo.res = res;
                                };
                                cmdExecCB.success = function() {
                                    sdkInfo.isPreVerifyOk = 0;
                                };
                                cmdExecCB.fail = function(res) {
                                    cmdExecCB._fail ? cmdExecCB._fail(res) : cmdExecCB.state = -1;
                                };

                                var cbArray = cmdExecCB._completes; //a
                                cbArray.push(function() {
                                    if (!cfg.debug)
                                        reportSDK();
                                });
                                cmdExecCB.complete = function() {
                                    for (var i = 0, len = cbArray.length; i < len; ++i)
                                        cbArray[i]();

                                    cmdExecCB._completes = []; //clear registered complete callbacks
                                };

                                return cmdExecCB;
                            }());

                            timeInfo.preVerifyStartTime = getCurrentTimestamp();
                        } else {
                            stateInfo.state = 1;
                            var cbArray = cmdExecCB._completes;
                            for (var i = 0, len = cbArray.length; i < len; ++i)
                                cbArray[i]();

                            cmdExecCB._completes = [];
                        }
                    }); //end 'ready' function registration

                    if (cfg.beta)
                        extendBridgeInteraction();
                }, //end 'config' API



                ready: function(completeFunc) {
                    if (stateInfo.state != 0) {
                        //api-call already finished
                        completeFunc();
                    } else {
                        cmdExecCB._completes.push(completeFunc);
                        if (!isWXBrowser && cfg.debug)
                            completeFunc();
                    }
                }, //end 'ready' API



                error: function(errorFunc) {
                    if (wxVer >= '6.0.2') {
                        if (stateInfo.state == -1)
                            errorFunc(stateInfo.res);
                        else
                            cmdExecCB._fail = errorFunc;
                    }
                }, //end 'error' API



                checkJsApi: function(checkParam) {
                    //fix command with api name
                    var fixApiName = function(res) {
                        var c, d, b = res.checkResult;

                        var apiObj = res.checkResult;
                        for (var cmdName in apiObj) {
                            var apiName = apiNameMapInv[cmdName];
                            if (apiName) {
                                apiObj[apiName] = apiObj[cmdName];
                                delete apiObj[cmdName];
                            }
                        }

                        return res;
                    };

                    invokeCmd('checkJsApi', {
                        jsApiList: mapApiBridgeId(checkParam.jsApiList)
                    }, function() {
                        checkParam._complete = function(res) {
                            if (isAndroid) {
                                if (res.checkResult)
                                    res.checkResult = JSON.parse(res.checkResult);
                            }

                            res = fixApiName(res);
                        };

                        return checkParam;
                    }());
                }, //end 'checkJsApi' API



                onMenuShareTimeline: function(shareParam) {
                    bindEvent(apiNameMap.onMenuShareTimeline, {
                        complete: function() {
                            invokeCmd('shareTimeline', {
                                title: shareParam.title || title,
                                desc: shareParam.title || title,
                                img_url: shareParam.imgUrl || '',
                                link: shareParam.link || location.href
                            }, shareParam);
                        }
                    }, shareParam);
                }, //end 'onMenuShareTimeline' API



                onMenuShareAppMessage: function(shareParam) {
                    bindEvent(apiNameMap.onMenuShareAppMessage, {
                        complete: function() {
                            invokeCmd('sendAppMessage', {
                                title: shareParam.title || title,
                                desc: shareParam.desc || '',
                                link: shareParam.link || location.href,
                                img_url: shareParam.imgUrl || '',
                                type: shareParam.type || 'link',
                                data_url: shareParam.dataUrl || ''
                            }, shareParam);
                        }
                    }, shareParam);
                }, //end 'onMenuShareAppMessage' API



                onMenuShareQQ: function(shareParam) {
                    bindEvent(apiNameMap.onMenuShareQQ, {
                        complete: function() {
                            invokeCmd('shareQQ', {
                                title: shareParam.title || title,
                                desc: shareParam.desc || '',
                                img_url: shareParam.imgUrl || '',
                                link: shareParam.link || location.href
                            }, shareParam);
                        }
                    }, shareParam);
                }, //end 'onMenuShareQQ' API



                onMenuShareWeibo: function(shareParam) {
                    bindEvent(apiNameMap.onMenuShareWeibo, {
                        complete: function() {
                            invokeCmd('shareWeiboApp', {
                                title: shareParam.title || title,
                                desc: shareParam.desc || '',
                                img_url: shareParam.imgUrl || '',
                                link: shareParam.link || location.href
                            }, shareParam);
                        }
                    }, shareParam);
                }, //end 'onMenuShareWeibo' API



                onMenuShareQZone: function(shareParam) {
                    bindEvent(apiNameMap.onMenuShareQZone, {
                        complete: function() {
                            invokeCmd('shareQZone', {
                                title: shareParam.title || title,
                                desc: shareParam.desc || '',
                                img_url: shareParam.imgUrl || '',
                                link: shareParam.link || location.href
                            }, shareParam);
                        }
                    }, shareParam);
                }, //end 'onMenuShareQZone' API



                startRecord: function(callbackObj) {
                    invokeCmd('startRecord', {}, callbackObj);
                }, //end 'startRecord' API



                stopRecord: function(callbackObj) {
                    invokeCmd('stopRecord', {}, callbackObj);
                }, //end 'stopRecord' API



                onVoiceRecordEnd: function(callbackObj) {
                    bindEvent('onVoiceRecordEnd', callbackObj);
                }, //end 'onVoiceRecordEnd' API



                playVoice: function(callbackObj) {
                    invokeCmd('playVoice', {
                        localId: callbackObj.localId
                    }, callbackObj);
                }, //end 'playVoice' API



                pauseVoice: function(callbackObj) {
                    invokeCmd('pauseVoice', {
                        localId: callbackObj.localId
                    }, callbackObj);
                }, //end 'pauseVoice' API



                stopVoice: function(callbackObj) {
                    invokeCmd('stopVoice', {
                        localId: callbackObj.localId
                    }, callbackObj);
                }, //end 'stopVoice' API



                onVoicePlayEnd: function(callbackObj) {
                    bindEvent('onVoicePlayEnd', callbackObj);
                }, //end 'onVoicePlayEnd' API



                uploadVoice: function(callbackObj) {
                    invokeCmd('uploadVoice', {
                        localId: callbackObj.localId,
                        isShowProgressTips: (callbackObj.isShowProgressTips == 0) ? 0 : 1
                    }, callbackObj);
                }, //end 'uploadVoice' API



                downloadVoice: function(callbackObj) {
                    invokeCmd('downloadVoice', {
                        serverId: callbackObj.serverId,
                        isShowProgressTips: (callbackObj.isShowProgressTips == 0) ? 0 : 1
                    }, callbackObj);
                }, //end 'downloadVoice' API



                translateVoice: function(callbackObj) {
                    invokeCmd('translateVoice', {
                        localId: callbackObj.localId,
                        isShowProgressTips: (callbackObj.isShowProgressTips == 0) ? 0 : 1
                    }, callbackObj);
                }, //end 'translateVoice' API



                chooseImage: function(callbackObj) {
                    invokeCmd('chooseImage', {
                        scene: '1|2',
                        count: callbackObj.count || 9,
                        sizeType: callbackObj.sizeType || ['original', 'compressed']
                    }, function() {
                        callbackObj._complete = function(res) {
                            if (isAndroid) {
                                if (res.localIds)
                                    res.localIds = JSON.parse(res.localIds);
                            }
                        };

                        return callbackObj;
                    }());
                }, //end 'chooseImage' API



                previewImage: function(callbackObj) {
                    invokeCmd(apiNameMap.previewImage, {
                        current: callbackObj.current,
                        urls: callbackObj.urls
                    }, callbackObj);
                }, //end 'previewImage' API



                uploadImage: function(callbackObj) {
                    invokeCmd('uploadImage', {
                        localId: callbackObj.localId,
                        isShowProgressTips: (callbackObj.isShowProgressTips == 0) ? 0 : 1
                    }, callbackObj);
                }, //end 'uploadImage' API



                downloadImage: function(callbackObj) {
                    invokeCmd('downloadImage', {
                        serverId: callbackObj.serverId,
                        isShowProgressTips: (callbackObj.isShowProgressTips == 0) ? 0 : 1
                    }, callbackObj);
                }, //end 'downloadImage' API



                getNetworkType: function(callbackObj) {
                    var parseNetworkResult = function(res) {
                        var msg = res.errMsg,
                            stype = res.subtype;
                        delete res.subtype;
                        res.errMsg = 'getNetworkType:ok';

                        if (stype) {
                            res.networkType = stype;
                        } else {
                            stype = msg.substring(msg.indexOf(':') + 1);
                            switch (stype) {
                                case 'wifi':
                                case 'edge':
                                case 'wwan':
                                    res.networkType = stype;
                                    break;
                                default:
                                    res.errMsg = 'getNetworkType:fail';
                            }
                        }

                        return res;
                    };

                    invokeCmd('getNetworkType', {}, function() {
                        callbackObj._complete = function(res) {
                            res = parseNetworkResult(res);
                        };
                        return callbackObj;
                    }());
                }, //end 'getNetworkType' API



                openLocation: function(callbackObj) {
                    invokeCmd('openLocation', {
                        latitude: callbackObj.latitude,
                        longitude: callbackObj.longitude,
                        name: callbackObj.name || '',
                        address: callbackObj.address || '',
                        scale: callbackObj.scale || 28,
                        infoUrl: callbackObj.infoUrl || ''
                    }, callbackObj);
                }, //end 'openLocation' API



                getLocation: function(callbackObj) {
                    callbackObj = callbackObj || {};

                    invokeCmd(apiNameMap.getLocation, {
                        type: callbackObj.type || 'wgs84'
                    }, function() {
                        callbackObj._complete = function(res) {
                            delete res.type;
                        };
                        return callbackObj;
                    }());
                }, //end 'getLocation' API



                hideOptionMenu: function(callbackObj) {
                    invokeCmd('hideOptionMenu', {}, callbackObj);
                }, //end 'hideOptionMenu' API



                showOptionMenu: function(callbackObj) {
                    invokeCmd('showOptionMenu', {}, callbackObj);
                }, //end 'showOptionMenu' API



                closeWindow: function(callbackObj) {
                    callbackObj = callbackObj || {};

                    invokeCmd('closeWindow', {
                        immediate_close: callbackObj.immediateClose || 0
                    }, callbackObj);
                }, //end 'closeWindow' API



                hideMenuItems: function(callbackObj) {
                    invokeCmd('hideMenuItems', {
                        menuList: callbackObj.menuList
                    }, callbackObj);
                }, //end 'hideMenuItems' API



                showMenuItems: function(callbackObj) {
                    invokeCmd('showMenuItems', {
                        menuList: callbackObj.menuList
                    }, callbackObj);
                }, //end 'showMenuItems' API



                hideAllNonBaseMenuItem: function(callbackObj) {
                    invokeCmd('hideAllNonBaseMenuItem', {}, callbackObj);
                }, //end 'hideAllNonBaseMenuItem' API



                showAllNonBaseMenuItem: function(callbackObj) {
                    invokeCmd('showAllNonBaseMenuItem', {}, callbackObj);
                }, //end 'showAllNonBaseMenuItem' API



                scanQRCode: function(callbackObj) {
                    callbackObj = callbackObj || {};

                    invokeCmd('scanQRCode', {
                        needResult: callbackObj.needResult || 0,
                        scanType: callbackObj.scanType || ['qrCode', 'barCode']
                    }, function() {
                        callbackObj._complete = function(res) {
                            if (isIOS && res.resultStr) {
                                var resObj = JSON.parse(res.resultStr);
                                res.resultStr = resObj;
                                return resObj.scan_code && resObj.scan_code.scan_result;
                            }
                        };

                        return callbackObj;
                    }());
                }, //end 'scanQRCode' API



                openProductSpecificView: function(callbackObj) {
                    invokeCmd(apiNameMap.openProductSpecificView, {
                        pid: callbackObj.productId,
                        view_type: callbackObj.viewType || 0
                    }, callbackObj);
                }, //end 'openProductSpecificView' API



                addCard: function(callbackObj) {
                    //prepare card information
                    var cards = callbackObj.cardList;
                    var cardInfos = [];
                    for (var i = 0, len = cards.length; i < len; ++i) {
                        cardInfos.push({
                            card_id: cards[i].cardId,
                            card_ext: cards[i].cardExt
                        });
                    }

                    invokeCmd(apiNameMap.addCard, {
                        card_list: cardInfos
                    }, function() {
                        callbackObj._complete = function(res) {
                            var cards = res.card_list;
                            if (cards) {
                                cards = JSON.parse(cards);
                                for (var i = 0, len = cards.length; i < len; ++i) {
                                    var card = cards[i];
                                    card.cardId = card.card_id;
                                    card.cardExt = card.card_ext;
                                    card.isSuccess = card.is_succ ? true : false;

                                    delete card.card_id;
                                    delete card.card_ext;
                                    delete card.is_succ;
                                }

                                res.cardList = cards;
                                delete res.card_list;
                            }
                        };

                        return callbackObj;
                    }());
                }, //end 'addCard' API



                chooseCard: function(callbackObj) {
                    invokeCmd('chooseCard', {
                        app_id: cfg.appId,
                        location_id: callbackObj.shopId || '',
                        sign_type: callbackObj.signType || 'SHA1',
                        card_id: callbackObj.cardId || '',
                        card_type: callbackObj.cardType || '',
                        card_sign: callbackObj.cardSign,
                        time_stamp: callbackObj.timestamp + '',
                        nonce_str: callbackObj.nonceStr
                    }, function() {
                        callbackObj._complete = function(res) {
                            res.cardList = res.choose_card_info;
                            delete res.choose_card_info;
                        };
                        return callbackObj;
                    }());
                }, //end 'chooseCard' API



                openCard: function(callbackObj) {
                    var cards = callbackObj.cardList;
                    var cardInfos = [];
                    for (var i = 0, len = cards.length; i < len; ++i) {
                        cardInfos.push({
                            card_id: cards[i].cardId,
                            code: cards[i].code
                        });
                    }

                    invokeCmd(apiNameMap.openCard, {
                        card_list: cardInfos
                    }, callbackObj);
                }, //end 'openCard' API


                chooseWXPay: function(callbackObj) {
                    invokeCmd(apiNameMap.chooseWXPay, buildPayParameter(callbackObj), callbackObj);
                }
            };

            if (setGlobal)
                glob.wx = glob.jWeixin = wxAPI;

            return wxAPI;
        } //end api object initialize

    });
