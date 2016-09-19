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
                var message = {
                    messageID: id,
                    type: ActionType.IMAGE_MESSAGE,
                    imageSrc: action.imageSrc,
                    status: ActionType.SENDING,
                    progress: 0
                };
                obj.messages.push(message);
                obj.count += 1;
                return obj;
            }
        case ActionType.SEND_IMAGE_MESSAGE_PROGRESS:
            {
                var objs = _extends({}, state);

                var  index = -1;
                var id = -1;
                for (var i = 0; i < objs.messages.length; i++) {
                    var obj = objs.messages[i];
                    if (obj.imageSrc == action.imageSrc) {
                        index = i;
                        id = obj.messageID;
                    }
                }

                if (index >= 0) {
                    var message = {
                        messageID: id,
                        type: ActionType.IMAGE_MESSAGE,
                        imageSrc: action.imageSrc,
                        status: ActionType.SENDING,
                        progress: action.progress
                    };
                    objs.messages.splice(index, 1, message);
                    return objs;
                } else {
                    return state;
                }

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
