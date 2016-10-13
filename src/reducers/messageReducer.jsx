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
    status: '',
    count: 0,
    messages: []
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {

        case ActionType.SEND_TEXT_MESSAGE: {
                var obj = _extends({}, state);
                var id = state.count + 1;
                var timeStamp = new Date().getTime();
                var txtMessage = {
                    messageID: id,
                    type: ActionType.TEXT_MESSAGE,
                    timeStamp: timeStamp,
                    text: action.text,
                    status: ActionType.SENDING
                };
                obj.messages.push(txtMessage);
                // obj.messages = [].concat(obj.messages);
                obj.count += 1;
                return obj;
            }
        case ActionType.SEND_TEXT_MESSAGE_SUCCESS: {
                return state;
            }
        case ActionType.SEND_TEXT_MESSAGE_ERROR: {
                return state;
            }
        case ActionType.SEND_IMAGE_MESSAGE: {
                var obj = _extends({}, state);
                var id = state.count + 1;
                var timeStamp = new Date().getTime();
                var message = {
                    messageID: id,
                    type: ActionType.IMAGE_MESSAGE,
                    timeStamp: timeStamp,
                    imageSrc: action.imageSrc,
                    status: ActionType.SENDING,
                    progress: 0
                };
                obj.messages.push(message);
                // obj.messages = [].concat(obj.messages);
                obj.count += 1;
                return obj;
            }
        case ActionType.SEND_IMAGE_MESSAGE_PROGRESS: {
                var objs = _extends({}, state);
                // var messages = objs.messages;
                var  index = -1;
                var id = -1;
                for (var i = 0; i < objs.messages.length; i++) {
                    var obj = objs.messages[i];
                    if (obj.imageSrc == action.imageSrc) {
                        index = i;
                        id = obj.messageID;
                        timeStamp = obj.timeStamp;
                    }
                }

                if (index >= 0) {
                    var message = {
                        messageID: id,
                        type: ActionType.IMAGE_MESSAGE,
                        timeStamp: timeStamp,
                        imageSrc: action.imageSrc,
                        status: ActionType.SENDING,
                        progress: action.progress
                    };

                    objs.messages.splice(index, 1, message);
                    // objs.messages = [].concat(objs.messages);
                    return objs;
                    // return _extends({}, objs);
                } else {
                    return state;
                }
            }
        case ActionType.SEND_IMAGE_MESSAGE_SUCCESS: {
                var objs = _extends({}, state);
                objs.status = ActionType.SEND_IMAGE_MESSAGE_SUCCESS;
                return objs;
            }
        case ActionType.SEND_IMAGE_MESSAGE_ERROR: {
                return state;
            }

        case ActionType.LOAD_MORE_MESSAGE_REQUEST: {
                var objs = _extends({}, state);
                objs.status = ActionType.LOAD_MORE_MESSAGE_REQUEST;
                return objs;
            }
        case ActionType.LOAD_MORE_MESSAGE_SUCCESS: {
                var objs = _extends({}, state);
                // var objs = state.clone();
                objs.status = ActionType.LOAD_MORE_MESSAGE_SUCCESS;
                var id = state.count + 1;
                var timeStamp = new Date().getTime();
                var message = {
                    messageID: id,
                    type: ActionType.TEXT_MESSAGE,
                    text: "loaded more",
                    status: ActionType.SENDING,
                    timeStamp: timeStamp,
                };
                objs.messages.unshift(message);
                // objs.messages = [].concat(objs.messages);
                return objs;
            }
        case ActionType.LOAD_MORE_MESSAGE_ERROR: {
                var objs = _extends({}, state);
                objs.status = ActionType.LOAD_MORE_MESSAGE_ERROR;
                return objs;
            }

        default:
            return state;
    }
}
