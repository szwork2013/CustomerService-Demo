import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import MessageInputView from '../components/MessageInputView';
import MessageSpeechView from '../components/MessageSpeechView';
import PluginBoardView from '../components/PluginBoardView';
import FaceBoardView from '../components/FaceBoardView';

// import * as ActionType from '../constants/ActionType';

let CustomerServiceMainUI = React.createClass({

    getInitialState: function() {
        return {showPluginView: false, showFaceView: false, showSpeechView: false};
    },

    onFocus: function() {
        console.log('onFocus');

        this.setState({showPluginView: false, showFaceView: false});

        //https://segmentfault.com/q/1010000002914610
        var SCROLLY = 100;
        var TIMER_NAME = 200; // focus事件中200ms后进行判断
        var MAX_SCROLL = 99999; // 越大越好
        setTimeout(function() {
            if (window.scrollY < SCROLLY) {
                window.scrollTo(0, MAX_SCROLL);
            }

        }, TIMER_NAME);
    },

    plusButtonClick: function() {
        var up = !this.state.showPluginView;
        this.setState({showPluginView: up, showFaceView: false});
    },
    faceButtonClick: function() {
        var up = !this.state.showFaceView;
        this.setState({showPluginView: false, showFaceView: up});
    },
    switchBtnClick: function() {
        console.log('switchBtnClick');
        this.setState({showSpeechView: !this.state.showSpeechView, showPluginView: false, showFaceView: false});
    },

    pluginItemClick: function() {},

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.showPluginView || this.state.showFaceView ) {
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
        if (this.state.showPluginView) {
            pluginView = <PluginBoardView itemClick={this.pluginItemClick}/>;
        } else {
            pluginView = <div/>
        }

        var faceView = null;
        if (this.state.showFaceView) {
            faceView = <FaceBoardView />;
        } else {
            faceView = <div/>
        }


        var inputView = null;
        if (this.state.showSpeechView) {
            inputView = (<MessageSpeechView switchBtnClick={this.switchBtnClick}/>);
        } else {
            inputView = (<MessageInputView inputOnFocus={this.onFocus} plusButtonClick={this.plusButtonClick} faceButtonClick={this.faceButtonClick} switchBtnClick={this.switchBtnClick}/>);
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
                {faceView}
            </div>
        );
    }
});

CustomerServiceMainUI.contextTypes = {
    history: PropTypes.object.isRequired
}

module.exports = connect()(CustomerServiceMainUI);
