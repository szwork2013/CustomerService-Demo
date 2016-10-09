 /* jshint esversion: 6 */
import * as ActionType from '../constants/ActionType';
import request from 'superagent';


exports.sendTextMessage = function (text) {
    // body...
    return {
        type: ActionType.SEND_TEXT_MESSAGE,
        text: text
    }
};


exports.sendImageMessage = function (src) {
    // body...
    return {
        type: ActionType.SEND_IMAGE_MESSAGE,
        imageSrc: src,
        progress: 0
    }
};

exports.uploadImageProgress = function (src, progress) {
    // body...
    return {
        type: ActionType.SEND_IMAGE_MESSAGE_PROGRESS,
        imageSrc: src,
        progress: progress
    }
};

exports.sendImageMessageSuccess = function (src) {
    // body...
    return {
        type: ActionType.SEND_IMAGE_MESSAGE_SUCCESS,
        imageSrc: src,
        progress: 1
    }
};


exports.loadmoreMessage = function () {
    console.log('loadmoreMessage');
    let locked = false;
    return dispatch => {
        if(true === locked) {
            return;
        }
        locked = true;

        dispatch({
            type: ActionType.LOAD_MORE_MESSAGE_REQUEST,
            status: ActionType.LOAD_MORE_MESSAGE_REQUEST,
            msg: ''
        });

        setTimeout(function() {
            locked = false;
            return dispatch({
                type: ActionType.LOAD_MORE_MESSAGE_SUCCESS,
                status:ActionType.LOAD_MORE_MESSAGE_SUCCESS,
            });
        },1000)
    }
};
