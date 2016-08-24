import * as ActionType from '../constants/ActionType';

var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

const initialState = {
    count: 0,
    messages: []
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {

        case ActionType.SEND_TEXT_MESSAGE:
            {
                var obj = _extends({}, state);
                var id = state.count + 1;
                var txtMessage = {
                    messageID: id,
                    type: ActionType.TEXT_MESSAGE,
                    text: action.text,
                    status: ActionType.SENDING
                };
                obj.messages.push(txtMessage);
                obj.count += 1;
                return obj;
            }
        case ActionType.SEND_TEXT_MESSAGE_SUCCESS:
            {
                return state;
            }
        case ActionType.SEND_TEXT_MESSAGE_ERROR:
            {
                return state;
            }
        case ActionType.SEND_IMAGE_MESSAGE:
            {
                var obj = _extends({}, state);
                var id = state.count + 1;
                var txtMessage = {
                    messageID: id,
                    type: ActionType.IMAGE_MESSAGE,
                    imageSrc: action.imageSrc,
                    status: ActionType.SENDING
                };
                obj.messages.push(txtMessage);
                obj.count += 1;
                return obj;
            }
        case ActionType.SEND_IMAGE_MESSAGE_PROGRESS:
            {
                return state;
            }
        case ActionType.SEND_IMAGE_MESSAGE_SUCCESS:
            {
                return state;
            }
        case ActionType.SEND_IMAGE_MESSAGE_ERROR:
            {
                return state;
            }
        default:
            return state;
    }
}
