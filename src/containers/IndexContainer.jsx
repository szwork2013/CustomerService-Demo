import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ReactDom, { unstable_batchedUpdates } from 'react-dom';

import iScroll from 'iscroll'
import ReactIScroll from 'react-iscroll'

import MessageInputView from '../components/MessageInputView';
import MessageSpeechView from '../components/MessageSpeechView';
import PluginBoardView from '../components/PluginBoardView';
import FaceBoardView from '../components/FaceBoardView';

import LoadingView from '../components/LoadingView';

import * as ActionType from '../constants/ActionType';

import { sendTextMessage, sendImageMessage, uploadImageProgress, sendImageMessageSuccess} from '../actions/messageAction'

import Slide from '../components/Slide'

import WebPullToRefresh from '../../js/wptr.1.1';


const iScrollOptions = {
    mouseWheel: true,
    scrollbars: false,
    scrollX: true
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
            show: false,

            isRecording: false,
            shouldCancel: false,

			initialized: false,
			disabled: false
        };
    },

	componentDidMount: function() {
	  	if (!this.state.disabled) {
			this.init();
	  	}
  	},
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.showPluginView != prevState.showPluginView || this.state.showFaceView != prevState.showFaceView ) {
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.refresh();
            });
        }
		if (!this.state.disabled) {
	  		this.init();
	  	}
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;

        if (nextProps.messageSendStatus == ActionType.SEND_IMAGE_MESSAGE_SUCCESS) {
            self.setState({
                items: nextProps.messages,
                show: true
            },function () {
                this.refs.iScroll.withIScroll(function(iScroll) {
                    iScroll.refresh();
                });
            });
        } else {
            self.setState({
                items: nextProps.messages,
                show: false
            },function () {
                this.refs.iScroll.withIScroll(function(iScroll) {
                    iScroll.refresh();
                });
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
        this.setState({
            inputText: text
        });
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

    onScrollStart: function() {
        // console.log('onScrollStart');
        if(!!document.activeElement){
            document.activeElement.blur();
        }

        if (this.state.showPluginView || this.state.showFaceView) {
            this.setState({showPluginView: false, showFaceView: false});
        }
    },

    onScrollEnd: function(iScrollInstance) {
        // console.log('onScrollEnd');
    },
    onScrollRefresh: function(iScrollInstance) {
        // console.log('onScrollRefresh');
        iScrollInstance.scrollTo(0,iScrollInstance.maxScrollY);
    },

    // 点击
    pluginItemClick: function(index) {
        // console.log('pluginItemClick');
        var self = this;
        window.SiLinJSBridge.chooseImageWithTypeCallback(index, {
            chooseImageSuccess: function(url) {
                console.log('chooseImageSuccess ' + url);
                self.props.sendImageMessage(url);
            },
            uploadImageProgress: function(url, progress) {
                console.log('uploadImageProgress ' + url + ' ' + progress);
                self.props.uploadImageProgress(url, progress);
            },
            uploadImageSuccess: function(url) {
                console.log('uploadImageSuccess ' + url);
                self.props.sendImageMessageSuccess(url);
            }
        });
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
            // var num = self.getRandomArbitrary(0, 10);
            // console.log(num);
            // if (num % 2 == 0) {
            //     result = 'hello world';
            // } else {
            //     result = '';
            // }

            if (result.length == 0) {
                self.props.sendTextMessage('你不说话，我怎么知道你想要知道什么(请重新发送语音消息)');

            } else {
                // self.props.sendTextMessage(result);
                //
                // self.setState({showSpeechView: false, showPluginView: false, showFaceView: false, inputText:result});

                // self.setState({
                //     showSpeechView: false,
                //     showPluginView: false,
                //     showFaceView: false,
                //     inputText:result
                // });
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

            // var num = self.getRandomArbitrary(0, 10);
            // console.log(num);
            // if (num % 2 == 0) {
            //     result = 'hello world';
            // } else {
            //     result = '';
            // }

            if (!result || result == 'null' || result.length == 0) {
                self.props.sendTextMessage('你不说话，我怎么知道你想要知道什么(请重新发送语音消息)');

                // result = '你不说话，我怎么知道你想要知道什么(请重新发送语音消息)';

            } else {
                // self.props.sendTextMessage(result);
                // self.setState({showSpeechView: false, showPluginView: false, showFaceView: false, inputText:result});
                self.test(result);
            }

            // self.setState({showSpeechView: false, showPluginView: false, showFaceView: false, inputText:result});
        });
    },

    test: function(result){
        this.setState({showSpeechView: false, showPluginView: false, showFaceView: false, inputText:result});
        // this.refs.ipt.focus();
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
        // var txt = this.state.inputText + ' ' + emoji + ' ';
        var txt = this.state.inputText + emoji;
        console.log(txt + 'length = ' + txt.length);
        this.setState({
            inputText: txt
        })
    },
    deleteEmojiAction: function() {
        var txt = this.state.inputText;
        this.setState({
            inputText: txt.substring(0,txt.length-1)
        })
    },

	onPullRefresh: function(resolve, reject) {
		let self = this;
	    setTimeout(function () {
	      	self.addItem() ? resolve() : reject();
	    }, 50000);
	},
	addItem() {
		this.state.items.push(this.state.items);
		this.setState({
			items: this.state.items
		});
		return true;
    },

	handleRefresh: function() {
		console.log('handleRefresh');
		var self = this;
      	return new Promise((resolve, reject) => {
        	self.onPullRefresh(resolve, reject);
      	});
  	},
	init: function() {
		var self = this;
      	if (!this.state.initialized) {
        	WebPullToRefresh().init({
          		contentEl: self.refs.refresh,
          		ptrEl: self.refs.ptr,
          		bodyEl: self.refs.body,
          		distanceToRefresh:  undefined,
          		loadingFunction: self.handleRefresh,
          		resistance:  undefined,
          		hammerOptions:  undefined
        	});
        	this.setState({
          		initialized: true
        	});
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
            // faceView = <FaceBoardView emojiClick={this.emojiClick} />;

            var emojiArr = [];
            for (var i = 0; i < 4; i++) {
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
        // var messagesView = this.props.messages.map(function(item, index) {
        // <li className="text-message-session" key={index}>{item.messageID} :{item.text} </li>
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
	                                        <div>{item.text}</div>
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
	                                <article className="ask-wrap ">{item.text}</article>
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
                // console.log(item.progress);
                var divStyle = {
                    // backgroundImage: 'url(' + item.imageSrc + ')',
                    maxWidth:'150px',
                    maxHeight: '150px'
                };

                return (
					<div  key={index}>
						{timeCell}
	                    <section className="message-wrap visitor " data-message-type="visitor">
	                        <div className="message " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                            <div className="bubble-arrow " style={{"backgroundColor":"#A0E75A","borderColor":"#7CD053" }}>
	                            </div>
	                            <article className="ask-wrap ">
	                                <img src={item.imageSrc} style={divStyle}></img>
	                            </article>
	                        </div>
	                        <div className="visitor-avatar ">
	                            <img src="../../img/pEMnDuflOnsZLkH.jpg"/>
	                        </div>
	                    </section>
					</div>
                    // <li  className="J-wrap-answer-section message-wrap robot" data-libversion="undefined" data-message-type="robot" message-wrap="" key={index}>
                    //     <div className="service-avatar ">
                    //         <img src="../../img/zVBCcOVAtHFuRJJ.png "/>
                    //     </div>
                    //     <div className="message ">
                    //         <div className="bubble-arrow "></div>
                    //         <article className="answer-wrap J-answer-wrap ">
                    //             <div className="J-answerContent-wrap answer-inner-wrap ">
                    //                 <div></div>
                    //                 <img src={item.imageSrc} style={divStyle}></img>
                    //             </div>
                    //         </article>
                    //     </div>
                    // </li>
                );

                // if (item.progress == 1) {
                //     return (
                //         <li className="text-message-session" key={index} onClick={self.imageCellClick.bind(null, index)}>
                //             <p>{item.messageID}:{item.progress}</p>
                //             <div className="weui_uploader_file" style={divStyle}>
                //             </div>
                //         </li>
                //     );
                // } else {
                //     var num  = item.progress;
                //     num = num.toFixed(2);
                //
                //     return (
                //         <li className="text-message-session" key={index} onClick={self.imageCellClick.bind(null, index)}>
                //             <p>{item.messageID}:{item.progress}</p>
                //             <div className="weui_uploader_file weui_uploader_status" style={divStyle}>
                //                 <div className="weui_uploader_status_content">{num * 100}%</div>
                //             </div>
                //         </li>
                //     );
                // }
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
                        <ReactIScroll ref="iScroll" iScroll={iScroll} options={iScrollOptions} onRefresh={this.onScrollRefresh} onScrollStart={this.onScrollStart} onScrollEnd={this.onScrollEnd}>
                            <div ref="body">
                                <div ref="ptr" className="history-msg J-history-msg ptr-element">
						           <span className="genericon genericon-next"></span>
						            <div className="loading">
						              <span className="loading-ptr-1"></span>
						              <span className="loading-ptr-2"></span>
						              <span className="loading-ptr-3"></span>
						           </div>
                                </div>
                                <div ref="refresh" className="chat-wrap">
                                    {messagesView}
                                </div>
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
        messageSendStatus: state.messageReducer.status
	};
}

module.exports = connect(mapStateToProps, {
	sendTextMessage,
    sendImageMessage,
    uploadImageProgress,
    sendImageMessageSuccess
})(CustomerServiceMainUI);

const emojis =
   ["😃",
    "😍",
    "😒",
    "😳",
    "😁",
    "😘",
    "😉",
    "😠",
    "😞",
    "😞",
    "😭",
    "😝",
    "😡",
    "😣",
    "😔",
    "😄",
    "😷",
    "😚",
    "😓",
    "😂",
    "😊",
    "😢",
    "😜",
    "😨",
    "😰",
    "😲",
    "😏",
    "😱",
    "😪",
    "😖",
    "😌",
    "👿",
    "👻",
    "🎅",
    "👧",
    "👦",
    "👩",
    "👨",
    "🐶",
    "🐱",
    "👍",
    "👎",
    "👊",
    "✊",
    "✌",
    "💪",
    "💪",
    "👈",
    "👆",
    "👉",
    "👇",
    "👌",
    "❤",
    "💔",
    "🙏",
    "☀",
    "🌙",
    "🌟",
    "⚡",
    "☁",
    "☔",
    "🍁",
    "🌻",
    "🍃",
    "👗",
    "🎀",
    "👄",
    "🌹",
    "☕",
    "🎂",
    "🕙",
    "🍺",
    "🔍",
    "📱",
    "🏠",
    "🚗",
    "🎁",
    "⚽",
    "💣",
    "💎"];
