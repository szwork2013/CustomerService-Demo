import React from 'react';
import ReactDOM from 'react-dom';

var MessageSpeechView = React.createClass({

    propTypes: {
        switchBtnClick: React.PropTypes.func.isRequired
    },

    switchBtnClick: function() {
        this.props.switchBtnClick();
    },

    render: function() {

        return (
            <div id="speechWrapper" className="footer">
                <div className="btn-wrap-left" id="switchBtn">
                    <button className="icon-keyboard" onClick={this.switchBtnClick}></button>
                </div>
                <div className="ipt-wrap">
                    <button className="speech-button" id="speech">按住 说话</button>
                </div>
            </div>
        );
    }
});

module.exports = MessageSpeechView;
