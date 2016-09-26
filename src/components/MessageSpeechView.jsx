import React from 'react';
import ReactDOM from 'react-dom';

var Hammer = require('react-hammerjs');

var MessageSpeechView = React.createClass({

    // 对外 开始录音 取消录音 录音完成 提醒内容切换
    propTypes: {
        switchBtnClick: React.PropTypes.func.isRequired

    },

    getInitialState:function(){
        return {
            startRecording: false,
            shouldCancel: false
        };
    },

    switchBtnClick: function() {
        this.props.switchBtnClick();
    },

    handleTap: function() {
        console.log('handleTap');
    },
    handlePress: function() {
        console.log('开始录音');
        this.setState({startRecording: true});
        this.props.startRecording();
    },
    handlePressUp: function() {
        if (this.state.shouldCancel) {
            console.log('取消录音');
            this.setState({startRecording: false, shouldCancel: false});
            this.props.cancelRecording();
        } else {
            console.log('发送录音');
            this.setState({startRecording: false, shouldCancel: false});
            this.props.endRecording();
        }
    },
    handlePan: function(e) {
        var dY = e.deltaY;
        // console.log(' Y:' + e.deltaY);
        if (this.state.startRecording) {
            if (e.deltaY < -50) {
                if (!this.state.shouldCancel) {
                    this.setState({shouldCancel: true});
                    console.log('松开手指,取消发送');
                    this.props.tipChange(true);
                }
            } else {
                if (this.state.shouldCancel) {
                    this.setState({shouldCancel: false});
                    console.log('松开发送,上划取消');
                    this.props.tipChange(false);
                }
            }
        } else {
            this.setState({startRecording: true});
            console.log('开始录音');
            this.props.startRecording();
        }
    },
    handlePanEnd: function() {
        if (this.state.shouldCancel) {
            console.log('取消录音');
            this.setState({startRecording: false, shouldCancel: false});
            this.props.cancelRecording();
        } else {
            console.log('发送录音');
            this.setState({startRecording: false, shouldCancel: false});
            this.props.endRecording();
        }
    },
    handlePanCancel: function() {
        console.log('handlePanCancel');
    },
    handlePanStart: function() {
        console.log('handlePanStart');
    },
    render: function() {
// onTap={this.handleTap} onPan={this.handlePan} onPanCancel={this.handlePanCancel} onPanEnd={this.handlePanEnd} onPanStart={this.handlePanStart}
        return (
            <footer id="speechWrapper" className="footer">
                <div id="textWrapper " className="footer ">
                    <div className="btn-wrap-left" id="switchBtn">
                        <button className="icon-keyboard" onClick={this.switchBtnClick}></button>
                    </div>
                    <div className="ipt-wrap">
                        <Hammer onPress={this.handlePress} onPressUp={this.handlePressUp}  onPan={this.handlePan} onPanEnd={this.handlePanEnd} ><button className="speech-button" id="speech">按住 说话</button></Hammer>
                    </div>
                </div>
            </footer>
        );
    }
});

module.exports = MessageSpeechView;
