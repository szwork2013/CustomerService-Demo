import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';


var MessageInputView = React.createClass({

    // propTypes: {
    //     faceButtonClick: React.PropTypes.func ,
    //     inputOnFocus: React.PropTypes.func ,
    //     plusButtonClick: React.PropTypes.func ,
    //     sendButtonClick: React.PropTypes.func ,
    //     switchBtnClick: React.PropTypes.func ,
    // },

    getInitialState: function() {
        return {
            showPluginView: false,
            showFaceView: false,
            showSendBtn: false,
            inputText: ''
        };
    },

    componentWillReceiveProps: function(nextProps) {

        console.log('componentWillReceiveProps');

        // if (nextProps.inputText.length > 0) {
        //     this.setState({
        //         showSendBtn: true
        //     });
        //     console.log('this.refs.ipt.focus');
        //     this.refs.ipt.focus();
        // }
    },

    // componentDidUpdate: function() {
    //
    //     if (this.props.inputText.length > 0) {
    //         this.setState({
    //             showSendBtn: true
    //         });
    //         console.log('this.refs.ipt.focus');
    //         this.refs.ipt.focus();
    //     }
    //
    // },

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
        this.props.sendButtonClick(this.props.inputText);
        this.refs.ipt.focus();
    },

    inputViewOnFocus: function() {
        console.log('inputViewOnFocus');
        this.setState({showPluginView: false, showFaceView: false});
        this.props.inputOnFocus();
    },
    inputViewOnBlur: function() {
        console.log('inputViewOnBlur');
    },
    inputChange: function(e) {
        this.setState({
            showSendBtn: e.target.value.length != 0,
            inputText: e.target.value
        });

        this.props.inputTextChange(e.target.value);
    },

    render: function() {

        var classN = {};
        // if (this.state.showPluginView || this.state.showFaceView) {
        //     classN = {
        //         'bottom': '280px'
        //     }
        // }
        if (this.props.shouldUp) {
            classN = {
                'bottom': '170px'
            }
        }

        var sendBtn = null;
        if (this.state.showSendBtn || this.props.showSendBtn) {
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
                        <TextareaAutosize ref="ipt" maxRows={5} placeholder="有问题就向我提问吧" onFocus={this.inputViewOnFocus} onBlur={this.inputViewOnBlur} onChange={this.inputChange} value={this.props.inputText} />
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
