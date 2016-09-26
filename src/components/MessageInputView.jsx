import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';


var MessageInputView = React.createClass({

    propTypes: {
        faceButtonClick: React.PropTypes.func.isRequired,
        inputOnFocus: React.PropTypes.func.isRequired,
        plusButtonClick: React.PropTypes.func.isRequired,
        sendButtonClick: React.PropTypes.func.isRequired,
        switchBtnClick: React.PropTypes.func.isRequired,
    },

    getInitialState: function() {
        return {
            showPluginView: false,
            showFaceView: false,
            showSendBtn: false,
            inputText: ''
        };
    },

    plusButtonClick: function() {
        var up = !this.state.showPluginView;
        this.setState({showPluginView: up, showFaceView: false});
        this.props.plusButtonClick();
    },
    faceButtonClick: function() {
        var up = !this.state.showFaceView;
        this.setState({showPluginView: false, showFaceView: up});
        this.props.faceButtonClick();
    },
    switchBtnClick: function() {
        this.setState({showPluginView: false, showFaceView: false});
        this.props.switchBtnClick();
    },

    sendBtnClick: function() {
        console.log('sendButtonClick: ' + this.state.inputText);
        var text = this.state.inputText;
        this.setState({
            inputText: '',
            showSendBtn: false
        });
        this.props.sendButtonClick(text);
        this.refs.ipt.focus();
    },

    inputViewOnFocus: function() {
        console.log('inputViewOnFocus');
        this.setState({showPluginView: false, showFaceView: false});
        this.props.inputOnFocus();
    },
    inputViewOnBlur: function() {
        console.log('inputViewOnBlur');
        // this.setState({showPluginView: false, showFaceView: false});
    },
    inputChange: function(e) {
        this.setState({
            showSendBtn: e.target.value.length != 0,
            inputText: e.target.value
        });
    },

    render: function() {


        var classN = {};
        if (this.state.showPluginView || this.state.showFaceView) {
            classN = {
                'bottom': '280px'
            }
        }

        var sendBtn = null;
        if (this.state.showSendBtn) {
            sendBtn = (
                <div className="btn-wrap-right " id="subBtn ">
                    <button onClick={this.sendBtnClick}>发送</button>
                </div>
            );
        } else {
            sendBtn = (
                <div className="btn-wrap-right-plus" id="switchBtn">
                    <button className="icon-plus" onClick={this.plusButtonClick}></button>
                </div>
            );
        }

        var txt = this.state.inputText;
        // if (this.state.inputText) {
        // }
        return (

            <footer className="footer " id="iptBox " style={classN}>
                <div id="textWrapper " className="footer ">
                    <div className="btn-wrap-left" id="switchBtn">
                        <button className="icon-speak" onClick={this.switchBtnClick}></button>
                    </div>
                    <div className="ipt-wrap ">
                        <TextareaAutosize ref="ipt" maxRows={5} placeholder="有问题就向我提问吧"  onFocus={this.inputViewOnFocus} onBlur={this.inputViewOnBlur} onChange={this.inputChange} value={txt} />
                    </div>
                    <div className="btn-wrap-mid" id="switchBtn">
                        <button className="icon-face" onClick={this.faceButtonClick}></button>
                    </div>
                    {sendBtn}
                </div>
            </footer>
        );
    }
});

module.exports = MessageInputView;
