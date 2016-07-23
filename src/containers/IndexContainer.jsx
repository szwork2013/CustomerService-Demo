import React,{PropTypes} from 'react';
import {connect} from 'react-redux';

import MessageInputView from '../components/MessageInputView'

// import * as ActionType from '../constants/ActionType';

let CustomerServiceMainUI = React.createClass({

    onFocus: function() {
        console.log('onFocus');
        setTimeout(function(){
            console.log(document.body.scrollTop);
            document.body.scrollTop = 0;
        },200);
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollTop;
        // ReactDOM.findDOMNode(this).scrollTop = 0;
    },

    render: function() {
        return (
            <div>
                <div className="main">
                    <div className="content">
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                        <p>nsdnisndisnisnisdnsidnsd\n</p>
                    </div>
                </div>
                <MessageInputView inputOnFocus={this.onFocus}/>
            </div>
        );
    }
});

CustomerServiceMainUI.contextTypes = {
    history: PropTypes.object.isRequired
}

module.exports = connect()(CustomerServiceMainUI);
