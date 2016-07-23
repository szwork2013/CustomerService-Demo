import React from 'react';
import ReactDOM from 'react-dom';

var MessageInputView = React.createClass({

    propTypes: {
        inputOnFocus: React.PropTypes.func.isRequired
    },

    onFocus: function() {
        console.log('onFocus');
        ReactDOM.findDOMNode(this).scrollTop = 0;
    },
    render: function() {
        return (
            <div className="message-input-view">
                <div className="message-input-change-button"><img src="img/voice.png"/></div>
                <div className="message-input"><input onFocus={this.props.inputOnFocus}/></div>
                <div className="message-input-face-button"><img src="img/face.png"/></div>
                <div className="message-input-plus-button"><img src="img/multiMedia.png"/></div>
            </div>
        );
    }
});

module.exports = MessageInputView;
