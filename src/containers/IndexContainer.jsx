import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ReactDom, { unstable_batchedUpdates } from 'react-dom';

import iScroll from '../../js/iscroll-probe'
import ReactIScroll from 'react-iscroll'

import MessageInputView from '../components/MessageInputView';
import MessageSpeechView from '../components/MessageSpeechView';
import PluginBoardView from '../components/PluginBoardView';
import FaceBoardView from '../components/FaceBoardView';

import LoadingView from '../components/LoadingView';

import * as ActionType from '../constants/ActionType';

import { sendTextMessage, sendImageMessage, uploadImageProgress, sendImageMessageSuccess, loadmoreMessage} from '../actions/messageAction'

import Slide from '../components/Slide'

import WebPullToRefresh from '../../js/wptr.1.1';

var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
const iScrollOptions = {
    mouseWheel: true,
    scrollbars: false,
    scrollX: true,
	probeType: 3
}

let ImageMessageCell = React.createClass({

    render: function() {
        return (
            <li className="text-message-session">
                <p>{this.props.messageID}:{this.props.progress}</p>
                <img style={{'maxWidth': '100px', 'maxHeight': '100px'}} src={this.props.imageSrc}></img>
            </li>
        );
    }
});

let CustomerServiceMainUI = React.createClass({

    getInitialState: function() {

        return {
            showPluginView: false,
            showFaceView: false,
            inputText:'',

            showSpeechView: false,

            items: [],

            isRecording: false,
            shouldCancel: false,

			loadingMore: false

        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.showPluginView !== prevState.showPluginView || this.state.showFaceView !== prevState.showFaceView ) {
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.refresh();
            });
        }

        // this.refs.iScroll.withIScroll(function(iScroll) {
        //     iScroll.refresh();
        // });
    },

    componentWillReceiveProps: function(nextProps) {

        console.log('componentWillReceiveProps');

        var self = this;
		if (nextProps.messageStatus === ActionType.LOAD_MORE_MESSAGE_SUCCESS || nextProps.messageStatus === ActionType.LOAD_MORE_MESSAGE_ERROR) {
            // var items = [].concat(nextProps.messages);
			this.setState({
				items: nextProps.messages,
				loadingMore: false
			});
            window.SiLinJSBridge.showLoading(false);
		} else {
            // var items = [].concat(nextProps.messages);
			this.setState({
				items: nextProps.messages,
			});
		}

    },


    onFocus: function() {
        // console.log('onFocus');
        this.setState({showPluginView: false, showFaceView: false});
        // console.log(window.SiLinJSBridge.keyboardHeight());
        //https://segmentfault.com/q/1010000002914610
        var SCROLLY = 100;
        var TIMER_NAME = 200; // focus事件中200ms后进行判断
        var MAX_SCROLL = 99999; // 越大越好
        setTimeout(function() {
            if (window.scrollY < SCROLLY) {
                window.scrollTo(0, MAX_SCROLL);
            }

        }, TIMER_NAME);
    },
    inputTextChange: function (text) {

		var txt = this.state.inputText;
		var matchs = txt.match(/\[.{1,3}\]/g);
		console.log(matchs);
		if (txt.length - text.length  === 1) {
			if (matchs) {
				if (matchs.length > 0) {
                    var m = matchs[matchs.length - 1];

                    var includeEmoji = false;
                    for (var i = 0; i < emojis.length; i++) {
                        var e = emojis[i];
                        if (m === e.name) {
                            includeEmoji = true;
                            break;
                        }
                    }
                    if (includeEmoji) {
                        var lastIndex = txt.lastIndexOf(m);
        				if (lastIndex + m.length === txt.length) {
        					this.setState({
        			            inputText: txt.substring(0, lastIndex)
        			        })
        				} else {
        					this.setState({
        			            inputText: txt.substring(0,txt.length-1)
        			        })
        				}
                    } else {
                        this.setState({
                            inputText: txt.substring(0,txt.length-1)
                        })
    				}
				} else {
					this.setState({
			            inputText: text
			        });
				}
			} else {
				this.setState({
		            inputText: text
		        });
			}
		} else {
			this.setState({
				inputText: text
			});
		}


		// this.setState({
        //     inputText: text
        // });
    },
    sendButtonClick: function(text) {
        this.setState({
            inputText: ''
        });
        this.props.sendTextMessage(text);
    },
    plusButtonClick: function() {
        var up = !this.state.showPluginView;
        this.setState({showPluginView: up, showFaceView: false});
    },
    faceButtonClick: function() {
        var up = !this.state.showFaceView;
        this.setState({showPluginView: false, showFaceView: up});
    },
    switchBtnClick: function() {
        // console.log('switchBtnClick');
        this.setState({showSpeechView: !this.state.showSpeechView, showPluginView: false, showFaceView: false});
    },
    contentViewClick: function() {
        // this.setState({showPluginView: false, showFaceView: false});
    },

    imageCellClick: function(index) {
        // console.log('imageCellClick ' + index);
        var message = this.state.items[index];
        // console.log('imageCellClick ' + message.imageSrc);
        window.SiLinJSBridge.previewImage(message.imageSrc);
    },

	//页面滚动
    onScrollStart: function(iScrollInstance) {
// 		myScroll.x/y, current position
// 		myScroll.directionX/Y, last direction (-1 down/right, 0 still, 1 up/left)
        // console.log('onScrollStart');
        if(!!document.activeElement){
            document.activeElement.blur();
        }

        if (this.state.showPluginView || this.state.showFaceView) {
            this.setState({showPluginView: false, showFaceView: false});
        }
    },
	scrollViewOnScroll: function(iScrollInstance) {
		// console.log('onScroll' + iScrollInstance.directionY + ' ' + iScrollInstance.y + ' ' + this.state.loadingMore + ' ' + ' ');

		if (iScrollInstance.directionY !== 1 && iScrollInstance.y > 40) {
			if (!this.state.loadingMore) {
				this.setState({
					loadingMore: true
				});
                window.SiLinJSBridge.showLoading(true);
				this.props.loadmoreMessage();
			}
		}
	},
    onScrollEnd: function(iScrollInstance) {
        // console.log('onScrollEnd');
    },
    onScrollRefresh: function(iScrollInstance) {
        console.log('onScrollRefresh');
        iScrollInstance.scrollTo(0,iScrollInstance.maxScrollY);
    },

    // 点击
    pluginItemClick: function(index) {
        // console.log('pluginItemClick');
        var self = this;
        window.SiLinJSBridge.chooseImageWithTypeCallback(index, {
            chooseImageSuccess: function(url) {
                console.log('chooseImageSuccess ' + url);
                // self.props.sendImageMessage(url);
                self.sendImageMessage(url);
            },
            uploadImageProgress: function(url, progress) {
                console.log('uploadImageProgress ' + url + ' ' + progress);
                // self.props.uploadImageProgress(url, progress);
                self.updateProgress(url, progress);
            },
            uploadImageSuccess: function(url) {
                console.log('uploadImageSuccess ' + url);
                // self.props.sendImageMessageSuccess(url);
                self.updateSuccess(url);
            },
            uploadImageError: function(url) {
                console.log('uploadImageError ' + url);
                // self.props.sendImageMessageSuccess(url);
            }
        });
    },
    sendImageMessage: function (url, progress) {
        this.props.sendImageMessage(url, progress);
    },
    updateProgress: function(url, progress) {
        this.props.uploadImageProgress(url, progress);
    },
    updateSuccess: function(url) {
        this.props.sendImageMessageSuccess(url);
    },

    getRandomArbitrary: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 录音相关
    startRecording: function(err) {

        if (err) {
            return;
        }

        this.setState({
            isRecording: true,
            shouldCancel: false
        });
        window.SiLinJSBridge.startRecording(function(){
            console.log('window.SiLinJSBridge.startRecording');
        });

        var self = this;
        window.SiLinJSBridge.onVoiceRecordEnd(function (result){
            console.log('window.SiLinJSBridge.onVoiceRecordEnd: ' + result);
            if (result.length == 0) {
                self.props.sendTextMessage('你不说话，我怎么知道你想要知道什么(请重新发送语音消息)');
            } else {
                self.test(result);
            }
        });
    },
    endRecording: function() {
        this.setState({
            isRecording: false,
            shouldCancel: false
        });
        var self = this;
        window.SiLinJSBridge.endRecording(function(result){
            console.log('window.SiLinJSBridge.endRecording: ' + result);

            if (!result || result == 'null' || result.length == 0) {
                self.props.sendTextMessage('你不说话，我怎么知道你想要知道什么(请重新发送语音消息)');
            } else {
                self.test(result);
            }
        });
    },

    test: function(result){
        this.setState({showSpeechView: false, showPluginView: false, showFaceView: false, inputText:result});
    },

    cancelRecording: function() {
        this.setState({
            isRecording: false,
            shouldCancel: false
        });

        window.SiLinJSBridge.cancelRecording(function(){
            console.log('window.SiLinJSBridge.cancelRecording');
        });
    },
    tipChange: function(status) {
        this.setState({
            shouldCancel: status
        });
    },

    emojiClick: function(emoji) {
        var txt = this.state.inputText + emoji;
        console.log(txt + 'length = ' + txt.length);
        this.setState({
            inputText: txt
        })
    },
    deleteEmojiAction: function() {
        var txt = this.state.inputText;

		var matchs = txt.match(/\[.{1,3}\]/g);
		console.log(matchs);
		if (matchs) {
			if (matchs.length > 0) {
				var m = matchs[matchs.length - 1];

                var includeEmoji = false;
                for (var i = 0; i < emojis.length; i++) {
                    var e = emojis[i];
                    if (m === e.name) {
                        includeEmoji = true;
                        break;
                    }
                }
                if (includeEmoji) {
                    var lastIndex = txt.lastIndexOf(m);
    				if (lastIndex + m.length === txt.length) {
    					this.setState({
    			            inputText: txt.substring(0, lastIndex)
    			        })
    				} else {
    					this.setState({
    			            inputText: txt.substring(0,txt.length-1)
    			        })
    				}
                } else {
                    this.setState({
                        inputText: txt.substring(0,txt.length-1)
                    })
				}
			} else {
				this.setState({
		            inputText: txt.substring(0,txt.length-1)
		        })
			}
		} else {
			this.setState({
				inputText: txt.substring(0,txt.length-1)
			})
		}
    },

    render: function() {
        console.log('render');

        var self = this;

        var pluginView = null;
        if (this.state.showPluginView) {
            pluginView = <PluginBoardView itemClick={this.pluginItemClick}/>;
        } else {
            pluginView = <div/>
        }

        var faceView = null;
        if (this.state.showFaceView) {
            var emojiArr = [];
            for (var i = 0; i < emojis.length/20; i++) {
                var start = i * 20;
                var end = start + 20;
                emojiArr.push(emojis.slice(start, end));
            }
            console.log(emojiArr);
            faceView = <Slide emojiClick={this.emojiClick} deleteEmojiAction={this.deleteEmojiAction} emojis={emojiArr} />
        } else {
            faceView = <div/>
        }

        var contentStyle = {};
        var shouldUp = false;
        if (this.state.showPluginView || this.state.showFaceView ) {
            contentStyle = {'bottom': '222'};
            shouldUp = true;
        }

        var inputView = null;
        var showSendBtn = (this.state.inputText.length != 0);

        if (this.state.showSpeechView) {
            // 开始录音 取消录音 录音完成 提醒内容切换
            inputView = (<MessageSpeechView switchBtnClick={this.switchBtnClick} startRecording={this.startRecording} endRecording={this.endRecording} cancelRecording={this.cancelRecording} tipChange={this.tipChange}/>);
        } else {
            inputView = (<MessageInputView shouldUp={shouldUp} showSendBtn={showSendBtn} inputText={this.state.inputText} inputTextChange={this.inputTextChange} inputOnFocus={this.onFocus} sendButtonClick={this.sendButtonClick} plusButtonClick={this.plusButtonClick} faceButtonClick={this.faceButtonClick} switchBtnClick={this.switchBtnClick}/>);
        }

        var messagesView = this.state.items.map(function(item, index) {
			var hour = (new Date(item.timeStamp)).getHours();
			if (String(hour).length === 1) {
				hour = '0' + hour;
			}
			var minit = (new Date(item.timeStamp)).getMinutes()
			if (String(minit).length === 1) {
				minit = '0' + minit;
			}
			var time = hour + ':' + minit;
			var timeCell = null;
			if (true) {
				timeCell = (
					<section  className="message-wrap system-info-wrap J-system-message-wrap ">
						<section className="message-info-inner ">{time}</section>
					</section>
				);
			}
            if (item.type === ActionType.TEXT_MESSAGE) {

				var txtContent = [];
				var matchs = item.text.match(/\[.{1,3}\]/g);

				console.log('match ');
				console.log(matchs);

				var content = item.text;

				if (matchs) {

					for (var i = 0; i < matchs.length; i++) {
						var m = matchs[i];
						var matchindex = content.indexOf(m);
						var first = content.slice(0, matchindex);
						var last = content.slice(matchindex + m.length);
						content = last;

 						txtContent.push(<span key={'a'+i}>{first}</span>);

						var src;
						for (var j = 0; j < emojis.length; j++) {
							var emoji = emojis[j];
							if (emoji.name === m) {
								src = emoji.src;
								console.log(src);
								break;
							}
						}
 						txtContent.push(<img key={'b'+i} className="inline_emoji_content" style={{'width': '24px','height': '24px'}} src={src}/>);

					}
 					txtContent.push(<span key={'b'+i}>{content}</span>);
				} else {

					txtContent.push(<span key={index}>{item.text}</span>);
				}

                if (index % 2 == 0) {
                    return (
						<div key={index}>
							{timeCell}
	                        <section  className="J-wrap-answer-section message-wrap robot" data-libversion="undefined" data-message-type="robot" message-wrap="">
	                            <div className="service-avatar ">
	                                <img src="../../img/zVBCcOVAtHFuRJJ.png "/>
	                            </div>
	                            <div className="message ">
	                                <div className="bubble-arrow "></div>
	                                <article className="answer-wrap J-answer-wrap ">
	                                    <div className="J-answerContent-wrap answer-inner-wrap ">
	                                        <span>{txtContent}</span>
	                                    </div>
	                                </article>
	                            </div>
	                        </section>
						</div>
                    );
                } else {

                    return (
						<div key={index}>
							{timeCell}
	                        <section className="message-wrap visitor " data-message-type="visitor">
	                            <div className="message " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                                <div className="bubble-arrow " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                                </div>
	                                <article className="ask-wrap">{txtContent}</article>
	                            </div>
	                            <div className="visitor-avatar ">
	                                <img src="../../img/pEMnDuflOnsZLkH.jpg"/>
	                            </div>
	                        </section>
						</div>
                    );

                }

            }
            if (item.type === ActionType.IMAGE_MESSAGE) {
                var divStyle = {
                    maxWidth:'150px',
                    maxHeight: '150px'
                };
                console.log('item.progress ' + item.progress);
                return (
					<div  key={index}>
						{timeCell}
	                    <section className="message-wrap visitor " data-message-type="visitor">
	                        <div className="message " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                            <div className="bubble-arrow " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                            </div>
	                            <article className="ask-wrap ">
                                    <p>{item.progress}</p>
	                                <img src={item.imageSrc} style={divStyle}></img>
	                            </article>
	                        </div>
	                        <div className="visitor-avatar ">
	                            <img src="../../img/pEMnDuflOnsZLkH.jpg"/>
	                        </div>
	                    </section>
					</div>
                 );
             }
            return null;
        });

        var loading = null;
        if (this.state.isRecording) {
            if (this.state.shouldCancel) {
                loading = ( <LoadingView tipText='松开手指,取消发送'/> );
            } else {
                loading = ( <LoadingView tipText='松开发送,上划取消'/> );
            }
        }

        // console.log('messagesView: ' + messagesView);
        return (
            <div className="out-wrap">
                <section className="main">
                    <section className="content" id="content" style={contentStyle}>
                        <ReactIScroll ref="iScroll" iScroll={iScroll} options={iScrollOptions} onRefresh={this.onScrollRefresh} onScrollStart={this.onScrollStart} onScrollEnd={this.onScrollEnd} onScroll={this.scrollViewOnScroll}>
							<div className="chat-wrap">
								{messagesView}
							</div>
                        </ReactIScroll>
                        {loading}
                    </section>
                    {inputView}
                </section>
                {pluginView}
                {faceView}
            </div>
        );
    }
});


CustomerServiceMainUI.contextTypes = {
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
        messages: state.messageReducer.messages ,
		count: state.messageReducer.count,
        messageStatus: state.messageReducer.status
	};
}

module.exports = connect(mapStateToProps, {
	sendTextMessage,
    sendImageMessage,
    uploadImageProgress,
    sendImageMessageSuccess,
	loadmoreMessage,
})(CustomerServiceMainUI);



const emojis = [];
emojis.push({src:"img/wechat/100.gif", name:"[微笑]"});
emojis.push({src:"img/wechat/101.gif", name:"[伤心]"});
emojis.push({src:"img/wechat/102.gif", name:"[美女]"});
emojis.push({src:"img/wechat/103.gif", name:"[发呆]"});
emojis.push({src:"img/wechat/104.gif", name:"[墨镜]"});
emojis.push({src:"img/wechat/105.gif", name:"[哭]"});
emojis.push({src:"img/wechat/106.gif", name:"[羞]"});
emojis.push({src:"img/wechat/107.gif", name:"[哑]"});
emojis.push({src:"img/wechat/108.gif", name:"[睡]"});
emojis.push({src:"img/wechat/109.gif", name:"[哭]"});
emojis.push({src:"img/wechat/110.gif", name:"[囧]"});
emojis.push({src:"img/wechat/111.gif", name:"[怒]"});
emojis.push({src:"img/wechat/112.gif", name:"[调皮]"});
emojis.push({src:"img/wechat/113.gif", name:"[笑]"});
emojis.push({src:"img/wechat/114.gif", name:"[惊讶]"});
emojis.push({src:"img/wechat/115.gif", name:"[难过]"});
emojis.push({src:"img/wechat/116.gif", name:"[酷]"});
emojis.push({src:"img/wechat/117.gif", name:"[汗]"});
emojis.push({src:"img/wechat/118.gif", name:"[抓狂]"});
emojis.push({src:"img/wechat/119.gif", name:"[吐]"});
emojis.push({src:"img/wechat/120.gif", name:"[笑]"});
emojis.push({src:"img/wechat/121.gif", name:"[快乐]"});
emojis.push({src:"img/wechat/122.gif", name:"[奇]"});
emojis.push({src:"img/wechat/123.gif", name:"[傲]"});
emojis.push({src:"img/wechat/124.gif", name:"[饿]"});
emojis.push({src:"img/wechat/125.gif", name:"[累]"});
emojis.push({src:"img/wechat/126.gif", name:"[吓]"});
emojis.push({src:"img/wechat/127.gif", name:"[汗]"});
emojis.push({src:"img/wechat/128.gif", name:"[高兴]"});
emojis.push({src:"img/wechat/129.gif", name:"[闲]"});
emojis.push({src:"img/wechat/130.gif", name:"[努力]"});
emojis.push({src:"img/wechat/131.gif", name:"[骂]"});
emojis.push({src:"img/wechat/132.gif", name:"[疑问]"});
emojis.push({src:"img/wechat/133.gif", name:"[秘密]"});
emojis.push({src:"img/wechat/134.gif", name:"[乱]"});
emojis.push({src:"img/wechat/135.gif", name:"[疯]"});
emojis.push({src:"img/wechat/136.gif", name:"[哀]"});
emojis.push({src:"img/wechat/137.gif", name:"[鬼]"});
emojis.push({src:"img/wechat/138.gif", name:"[打击]"});
emojis.push({src:"img/wechat/139.gif", name:"[bye]"});
emojis.push({src:"img/wechat/140.gif", name:"[汗]"});
emojis.push({src:"img/wechat/141.gif", name:"[抠]"});
emojis.push({src:"img/wechat/142.gif", name:"[鼓掌]"});
emojis.push({src:"img/wechat/143.gif", name:"[糟糕]"});
emojis.push({src:"img/wechat/144.gif", name:"[恶搞]"});
emojis.push({src:"img/wechat/145.gif", name:"[左哼哼]"});
emojis.push({src:"img/wechat/146.gif", name:"[右哼哼]"});
emojis.push({src:"img/wechat/147.gif", name:"[累]"});
emojis.push({src:"img/wechat/148.gif", name:"[看]"});
emojis.push({src:"img/wechat/149.gif", name:"[委屈]"});
emojis.push({src:"img/wechat/150.gif", name:"[难过]"});
emojis.push({src:"img/wechat/151.gif", name:"[坏]"});
emojis.push({src:"img/wechat/152.gif", name:"[亲]"});
emojis.push({src:"img/wechat/153.gif", name:"[吓]"});
emojis.push({src:"img/wechat/154.gif", name:"[可怜]"});
emojis.push({src:"img/wechat/155.gif", name:"[刀]"});
emojis.push({src:"img/wechat/156.gif", name:"[水果]"});
emojis.push({src:"img/wechat/157.gif", name:"[酒]"});
emojis.push({src:"img/wechat/158.gif", name:"[篮球]"});
emojis.push({src:"img/wechat/159.gif", name:"[乒乓]"});
emojis.push({src:"img/wechat/160.gif", name:"[咖啡]"});
emojis.push({src:"img/wechat/161.gif", name:"[美食]"});
emojis.push({src:"img/wechat/162.gif", name:"[动物]"});
emojis.push({src:"img/wechat/163.gif", name:"[鲜花]"});
emojis.push({src:"img/wechat/164.gif", name:"[枯]"});
emojis.push({src:"img/wechat/165.gif", name:"[唇]"});
emojis.push({src:"img/wechat/166.gif", name:"[爱]"});
emojis.push({src:"img/wechat/167.gif", name:"[分手]"});
emojis.push({src:"img/wechat/168.gif", name:"[生日]"});
emojis.push({src:"img/wechat/169.gif", name:"[电]"});
emojis.push({src:"img/wechat/170.gif", name:"[炸弹]"});
emojis.push({src:"img/wechat/171.gif", name:"[刀子]"});
emojis.push({src:"img/wechat/172.gif", name:"[足球]"});
emojis.push({src:"img/wechat/173.gif", name:"[瓢虫]"});
emojis.push({src:"img/wechat/174.gif", name:"[翔]"});
emojis.push({src:"img/wechat/175.gif", name:"[月亮]"});
emojis.push({src:"img/wechat/176.gif", name:"[太阳]"});
emojis.push({src:"img/wechat/177.gif", name:"[礼物]"});
emojis.push({src:"img/wechat/178.gif", name:"[抱抱]"});
emojis.push({src:"img/wechat/179.gif", name:"[拇指]"});
emojis.push({src:"img/wechat/180.gif", name:"[贬低]"});
emojis.push({src:"img/wechat/181.gif", name:"[握手]"});
emojis.push({src:"img/wechat/182.gif", name:"[剪刀手]"});
emojis.push({src:"img/wechat/183.gif", name:"[抱拳]"});
emojis.push({src:"img/wechat/184.gif", name:"[勾引]"});
emojis.push({src:"img/wechat/185.gif", name:"[拳头]"});
emojis.push({src:"img/wechat/186.gif", name:"[小拇指]"});
emojis.push({src:"img/wechat/187.gif", name:"[拇指八]"});
emojis.push({src:"img/wechat/188.gif", name:"[食指]"});
emojis.push({src:"img/wechat/189.gif", name:"[ok]"});
emojis.push({src:"img/wechat/190.gif", name:"[情侣]"});
emojis.push({src:"img/wechat/191.gif", name:"[爱心]"});
emojis.push({src:"img/wechat/192.gif", name:"[蹦哒]"});
emojis.push({src:"img/wechat/193.gif", name:"[颤抖]"});
emojis.push({src:"img/wechat/194.gif", name:"[怄气]"});
emojis.push({src:"img/wechat/195.gif", name:"[跳舞]"});
emojis.push({src:"img/wechat/196.gif", name:"[发呆]"});
emojis.push({src:"img/wechat/197.gif", name:"[背着]"});
emojis.push({src:"img/wechat/198.gif", name:"[伸手]"});
emojis.push({src:"img/wechat/199.gif", name:"[耍帅]"});
emojis.push({src:"img/wechat/200.png", name:"[微笑]"});
emojis.push({src:"img/wechat/201.png", name:"[生病]"});
emojis.push({src:"img/wechat/202.png", name:"[哭泣]"});
emojis.push({src:"img/wechat/203.png", name:"[吐舌]"});
emojis.push({src:"img/wechat/204.png", name:"[迷糊]"});
emojis.push({src:"img/wechat/205.png", name:"[瞪眼]"});
emojis.push({src:"img/wechat/206.png", name:"[恐怖]"});
emojis.push({src:"img/wechat/207.png", name:"[忧愁]"});
emojis.push({src:"img/wechat/208.png", name:"[眨眉]"});
emojis.push({src:"img/wechat/209.png", name:"[闭眼]"});
emojis.push({src:"img/wechat/210.png", name:"[鄙视]"});
emojis.push({src:"img/wechat/211.png", name:"[阴暗]"});
emojis.push({src:"img/wechat/212.png", name:"[小鬼]"});
emojis.push({src:"img/wechat/213.png", name:"[礼物]"});
emojis.push({src:"img/wechat/214.png", name:"[拜佛]"});
emojis.push({src:"img/wechat/215.png", name:"[力量]"});
emojis.push({src:"img/wechat/216.png", name:"[金钱]"});
emojis.push({src:"img/wechat/217.png", name:"[蛋糕]"});
emojis.push({src:"img/wechat/218.png", name:"[彩带]"});
emojis.push({src:"img/wechat/219.png", name:"[礼物]"});
