'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserMessage = addUserMessage;
exports.addResponseMessage = addResponseMessage;
exports.addResponseChoices = addResponseChoices;
exports.addLinkSnippet = addLinkSnippet;
exports.renderCustomComponent = renderCustomComponent;
exports.toggleChat = toggleChat;
exports.toggleInputDisabled = toggleInputDisabled;
exports.dropMessages = dropMessages;
exports.setFullscreen = setFullscreen;
exports.unsetFullscreen = unsetFullscreen;

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _index = require('./index');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addUserMessage(text) {
  _store2.default.dispatch(actions.addUserMessage(text));
}

function addResponseMessage(text) {
  _store2.default.dispatch(actions.addResponseMessage(text));
}

function addResponseChoices(object) {
  _store2.default.dispatch(actions.addResponseChoices(object));
}

function addLinkSnippet(link) {
  _store2.default.dispatch(actions.addLinkSnippet(link));
}

function renderCustomComponent(component, props) {
  var showAvatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _store2.default.dispatch(actions.renderCustomComponent(component, props, showAvatar));
}

function toggleChat() {
  _store2.default.dispatch(actions.toggleChat());
}

function toggleInputDisabled() {
  _store2.default.dispatch(actions.toggleInputDisabled());
}

function dropMessages() {
  _store2.default.dispatch(actions.dropMessages());
}

function setFullscreen() {
  _store2.default.dispatch(actions.setFullscreen());
}

function unsetFullscreen() {
  _store2.default.dispatch(actions.unsetFullscreen());
}