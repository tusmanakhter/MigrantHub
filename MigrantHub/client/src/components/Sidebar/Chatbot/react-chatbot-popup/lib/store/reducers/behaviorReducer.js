'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _actionTypes = require('../actions/actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = { showChat: false, disabledInput: false, fullscreen: false };

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.TOGGLE_CHAT:
      {
        return _extends({}, state, {
          showChat: !state.showChat
        });
      }
    case actionTypes.TOGGLE_INPUT_DISABLED:
      {
        return _extends({}, state, {
          disabledInput: !state.disabledInput
        });
      }
    case actionTypes.SET_FULLSCREEN:
      {
        return _extends({}, state, {
          fullscreen: true
        });
      }
    case actionTypes.UNSET_FULLSCREEN:
      {
        return _extends({}, state, {
          fullscreen: false
        });
      }
    default:
      return state;
  }
}