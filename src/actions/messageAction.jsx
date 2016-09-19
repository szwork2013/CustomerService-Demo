 /* jshint esversion: 6 */
import * as ActionType from '../constants/ActionType';

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
        progress: 100
    }
};
