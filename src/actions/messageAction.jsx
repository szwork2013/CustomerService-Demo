 /* jshint esversion: 6 */
import * as ActionType from '../constants/ActionType';

exports.sendTextMessage = function (text) {
    // body...
    return {
        type: ActionType.SEND_TEXT_MESSAGE,
        text: text
    }
};
