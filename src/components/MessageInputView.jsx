import React from 'react';
import ReactDOM from 'react-dom';

var MessageInputView = React.createClass({

    propTypes: {
        inputOnFocus: React.PropTypes.func.isRequired
    },

    render: function() {
        // onFocus={this.props.inputOnFocus}
        return (
            <div className="message-input-view">
                <div className="message-input-change-button"><img src="img/voice.png"/></div>
                <div className="message-input"><input onFocus={this.props.inputOnFocus} title="Send"/></div>
                <div className="message-input-face-button"><img src="img/face.png"/></div>
                <div className="message-input-plus-button"><img src="img/multiMedia.png"/></div>
            </div>
        );
    }
});

module.exports = MessageInputView;
