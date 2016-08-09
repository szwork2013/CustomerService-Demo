import React from 'react';
import ReactDOM from 'react-dom';

var MessageInputView = React.createClass({

    propTypes: {
        inputOnFocus: React.PropTypes.func.isRequired,
        plusButtonClick: React.PropTypes.func.isRequired,
        switchBtnClick: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {inputViewUp: false, showSendBtn: false};
    },

    plusButtonClick: function() {
        var up = !this.state.inputViewUp;
        this.setState({inputViewUp: up});
        console.log('MessageInputView-this.state.inputViewUp ' + this.state.inputViewUp);
        this.props.plusButtonClick();
    },
    faceButtonClick: function() {
        // var up = !this.state.inputViewUp;
        // this.setState({inputViewUp: up});
        // console.log('MessageInputView-this.state.inputViewUp ' + this.state.inputViewUp);
        // this.props.plusButtonClick();
    },
    switchBtnClick: function() {
        // var up = !this.state.inputViewUp;
        this.setState({inputViewUp: false, inputViewUp: false});
        this.props.switchBtnClick();
    },

    inputViewOnFocus: function() {
        console.log('inputViewOnFocus');
        this.setState({inputViewUp: false});
        this.props.inputOnFocus();
    },

    inputChange: function(e) {
        this.setState({
            showSendBtn: e.target.value.length != 0
        });
    },

    render: function() {


        var classN = {};
        if (this.state.inputViewUp) {
            classN = {
                'bottom': '280px'
            }
        }

        var sendBtn = null;
        if (this.state.showSendBtn) {
            sendBtn = (
                <div className="btn-wrap-right " id="subBtn ">
                    <button>发送</button>
                </div>
            );
        } else {
            sendBtn = (
                <div className="btn-wrap-right-plus" id="switchBtn">
                    <button className="icon-plus" onClick={this.plusButtonClick}></button>
                </div>
            );
        }

        return (

            <footer className="footer " id="iptBox " style={classN}>
                <div id="textWrapper " className="footer ">
                    <div className="btn-wrap-left" id="switchBtn">
                        <button className="icon-speak" onClick={this.switchBtnClick}></button>
                    </div>
                    <div className="ipt-wrap ">
                        <textarea className="autoExpand" name="" id="ipt" rows="1" placeholder="有问题就向我提问吧" data-min-rows="1" focusflag="NO" onFocus={this.inputViewOnFocus} onChange={this.inputChange}></textarea>
                    </div>
                    <div className="btn-wrap-mid" id="switchBtn">
                        <button className="icon-face"></button>
                    </div>
                    {sendBtn}
                </div>
            </footer>
        );
    }
});

module.exports = MessageInputView;
