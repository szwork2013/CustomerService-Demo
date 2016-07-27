import React,{PropTypes} from 'react';
import {connect} from 'react-redux';

import MessageInputView from '../components/MessageInputView'

// import * as ActionType from '../constants/ActionType';

let CustomerServiceMainUI = React.createClass({

    onFocus: function() {
        console.log('onFocus');

        //https://segmentfault.com/q/1010000002914610
        var SCROLLY=100;
        var TIMER_NAME=200 ;// focus事件中200ms后进行判断
        var MAX_SCROLL=99999; // 越大越好
        setTimeout(function() {
            if(window.scrollY < SCROLLY) {
                window.scrollTo(0, MAX_SCROLL);
            }
        }, TIMER_NAME);
    },

    render: function() {
        return (
            <div>
                <div className="main">
                    <p>nsdnisndisnisnisdnsidnsd1\n</p>
                    <p>nsdnisndisnisnisdnsidnsd2\n</p>
                    <p>nsdnisndisnisnisdnsidnsd3\n</p>
                    <p>nsdnisndisnisnisdnsidnsd4\n</p>
                    <p>nsdnisndisnisnisdnsidnsd5\n</p>
                    <p>nsdnisndisnisnisdnsidnsd6\n</p>
                    <p>nsdnisndisnisnisdnsidnsd7\n</p>
                    <p>nsdnisndisnisnisdnsidnsd8\n</p>
                    <p>nsdnisndisnisnisdnsidnsd9\n</p>
                    <p>nsdnisndisnisnisdnsidnsd11\n</p>
                    <p>nsdnisndisnisnisdnsidnsd12\n</p>
                    <p>nsdnisndisnisnisdnsidnsd13\n</p>
                    <p>nsdnisndisnisnisdnsidnsd14\n</p>
                    <p>nsdnisndisnisnisdnsidnsd14\n</p>
                    <p>nsdnisndisnisnisdnsidnsd15\n</p>
                    <p>nsdnisndisnisnisdnsidnsd16\n</p>
                    <p>nsdnisndisnisnisdnsidnsd17\n</p>
                    <p>nsdnisndisnisnisdnsidnsd18\n</p>
                    <p>nsdnisndisnisnisdnsidnsd19\n</p>
                    <p>nsdnisndisnisnisdnsidnsd20\n</p>
                    <p>nsdnisndisnisnisdnsidnsd21\n</p>
                    <p>nsdnisndisnisnisdnsidnsd22\n</p>
                    <p>nsdnisndisnisnisdnsidnsd23\n</p>
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
