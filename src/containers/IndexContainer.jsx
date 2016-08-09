import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import MessageInputView from '../components/MessageInputView';
import PluginBoardView from '../components/PluginBoardView';
import MessageSpeechView from '../components/MessageSpeechView';

// import * as ActionType from '../constants/ActionType';

let ChatContent = React.createClass({

    render: function() {
        return (
            <div className="main"></div>
        );
    }
});

let CustomerServiceMainUI = React.createClass({

    getInitialState: function() {
        return {inputViewUp: false, showSpeechView: false};
    },

    onFocus: function() {
        console.log('onFocus');

        this.setState({inputViewUp: false});
        console.log(' before window.scrollY :' + window.scrollY);
        console.log(' before window.scrollX :' + window.scrollX);
        //https://segmentfault.com/q/1010000002914610
        var SCROLLY = 100;
        var TIMER_NAME = 200; // focus事件中200ms后进行判断
        var MAX_SCROLL = 99999; // 越大越好
        setTimeout(function() {
            if (window.scrollY < SCROLLY) {
                window.scrollTo(0, MAX_SCROLL);
            }
            console.log(' after window.scrollY :' + window.scrollY);
            console.log(' after window.scrollX :' + window.scrollX);

        }, TIMER_NAME);
    },

    plusButtonClick: function() {
        var up = !this.state.inputViewUp;
        this.setState({inputViewUp: up});

        console.log('CustomerServiceMainUI-this.state.inputViewUp ' + this.state.inputViewUp);
    },

    switchBtnClick: function() {
        console.log('switchBtnClick');
        this.setState({showSpeechView: !this.state.showSpeechView, inputViewUp: false});
    },

    pluginItemClick: function() {},

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.inputViewUp) {
            console.log('componentDidUpdate');
            var SCROLLY = 100;
            var TIMER_NAME = 500;
            var MAX_SCROLL = 99999; // 越大越好
            setTimeout(function() {
                if (window.scrollY < SCROLLY) {
                    window.scrollTo(0, MAX_SCROLL);
                }
            }, TIMER_NAME);
        }
    },

    render: function() {

        var pluginView = null;
        if (this.state.inputViewUp) {
            pluginView = <PluginBoardView itemClick={this.pluginItemClick}/>;
        } else {
            pluginView = <div/>
        }

        var inputView = null;
        if (this.state.showSpeechView) {
            inputView = (<MessageSpeechView switchBtnClick={this.switchBtnClick}/>);
        } else {
            inputView = (<MessageInputView inputOnFocus={this.onFocus} plusButtonClick={this.plusButtonClick} switchBtnClick={this.switchBtnClick}/>);
        }

        return (
            <div className="out-wrap">
                <section className="main">
                    <section className="content" id="content">
                        <div className="am-viewport">
                            <div className="active">
                                <section className="am-scroll" id="scroll" style={{
                                    'backfaceVisibility': 'hidden',
                                    'transformStyle': 'preserve-3d',
                                    'height': '114px',
                                    'transform': 'translate3d(0px, 0px, 0px)'
                                }}>
                                    <div id="chat-wrap" className="chat-wrap"></div>
                                </section>
                            </div>
                        </div>
                    </section>
                    {inputView}
                </section>
                {pluginView}
            </div>
        );
    }
});

CustomerServiceMainUI.contextTypes = {
    history: PropTypes.object.isRequired
}

module.exports = connect()(CustomerServiceMainUI);
