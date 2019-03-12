'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var redux = _interopRequireWildcard(_redux);

var _behaviorReducer = require('./reducers/behaviorReducer');

var _behaviorReducer2 = _interopRequireDefault(_behaviorReducer);

var _messagesReducer = require('./reducers/messagesReducer');

var _messagesReducer2 = _interopRequireDefault(_messagesReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reducer = redux.combineReducers({ behavior: _behaviorReducer2.default, messages: _messagesReducer2.default });

exports.default = redux.createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());