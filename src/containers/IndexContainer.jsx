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
            showSpeechView: false,
            transText:'',
            items: [],
            show: false,

            isRecording: false,
            shouldCancel: false
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.showPluginView != prevState.showPluginView || this.state.showFaceView != prevState.showFaceView ) {
            this.refs.iScroll.withIScroll(function(iScroll) {
                iScroll.refresh();
            });
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

    sendButtonClick: function(text) {
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

        // if (this.state.showPluginView || this.state.showFaceView) {
        //     this.setState({showPluginView: false, showFaceView: false});
        // }
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
    // -(void)startRecording:(JSValue *)callback;
    // -(void)cancelRecording:(JSValue *)callback;
    // -(void)endRecording:(JSValue *)callback;
    // -(void)resultRecording:(JSValue *)callback;
    // 录音相关
    startRecording: function() {
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
                self.props.sendTextMessage(result);
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
                // self.props.sendTextMessage(result);

                self.setState({showSpeechView: false, showPluginView: false, showFaceView: false, transText:result});
            }
        });
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
            faceView = <FaceBoardView />;
        } else {
            faceView = <div/>
        }

        var contentStyle = {};
        if (this.state.showPluginView || this.state.showFaceView ) {
            contentStyle = {'bottom': '332'};
        }

        var inputView = null;
        if (this.state.showSpeechView) {
            // 开始录音 取消录音 录音完成 提醒内容切换
            inputView = (<MessageSpeechView switchBtnClick={this.switchBtnClick} startRecording={this.startRecording} endRecording={this.endRecording} cancelRecording={this.cancelRecording} tipChange={this.tipChange}/>);
        } else {
            inputView = (<MessageInputView inputOnFocus={this.onFocus} sendButtonClick={this.sendButtonClick} plusButtonClick={this.plusButtonClick} faceButtonClick={this.faceButtonClick} switchBtnClick={this.switchBtnClick}/>);
        }
        // var messagesView = this.props.messages.map(function(item, index) {
        var messagesView = this.state.items.map(function(item, index) {
            if (item.type === ActionType.TEXT_MESSAGE) {
                return (
                    <li className="text-message-session" key={index}>{item.messageID} :{item.text} </li>
                );
            }
            if (item.type === ActionType.IMAGE_MESSAGE) {
                // console.log(item.progress);
                var divStyle = {
                    backgroundImage: 'url(' + item.imageSrc + ')'
                };

                if (item.progress == 1) {
                    return (
                        <li className="text-message-session" key={index} onClick={self.imageCellClick.bind(null, index)}>
                            <p>{item.messageID}:{item.progress}</p>
                            <div className="weui_uploader_file" style={divStyle}>
                            </div>
                        </li>
                    );
                } else {

                    var num  = item.progress;
                    num = num.toFixed(2);

                    return (
                        <li className="text-message-session" key={index} onClick={self.imageCellClick.bind(null, index)}>
                            <p>{item.messageID}:{item.progress}</p>
                            <div className="weui_uploader_file weui_uploader_status" style={divStyle}>
                                <div className="weui_uploader_status_content">{num * 100}%</div>
                            </div>
                        </li>
                    );
                }
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
                            <div>
                                <div className="history-msg J-history-msg visibility">
                                    下拉加载历史记录
                                </div>
                                <ul id="chat-wrap" className="chat-wrap">
                                    {messagesView}
                                </ul>
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
