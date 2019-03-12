'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _constants = require('../../constants');

var _helper = require('./helper');

var _actionTypes = require('../actions/actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = [];

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.ADD_NEW_USER_MESSAGE:
      {
        return [].concat(_toConsumableArray(state), [(0, _helper.createNewMessage)(action.text || '', _constants.MESSAGE_SENDER.CLIENT)]);
      }
    case actionTypes.ADD_NEW_RESPONSE_MESSAGE:
      {
        return [].concat(_toConsumableArray(state), [(0, _helper.createNewMessage)(action.text || '', _constants.MESSAGE_SENDER.RESPONSE)]);
      }
    case actionTypes.ADD_NEW_RESPONSE_CHOICES:
      {
        return [].concat(_toConsumableArray(state), [(0, _helper.createNewChoicesMessage)(action.choices || { text: '', choices: [] })]);
      }
    case actionTypes.ADD_NEW_LINK_SNIPPET:
      {
        if (action.link) {
          return [].concat(_toConsumableArray(state), [(0, _helper.createLinkSnippet)(action.link)]);
        }
        return state;
      }
    case actionTypes.ADD_COMPONENT_MESSAGE:
      {
        return [].concat(_toConsumableArray(state), [(0, _helper.createComponentMessage)(action.component || {}, action.props || {}, action.showAvatar || false)]);
      }
    case actionTypes.DROP_MESSAGES:
      {
        return [];
      }
    default:
      return state;
  }
}