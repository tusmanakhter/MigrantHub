'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropMessages = exports.toggleInputDisabled = exports.toggleChat = exports.renderCustomComponent = exports.addLinkSnippet = exports.addResponseChoices = exports.addResponseMessage = exports.addUserMessage = exports.Chat = undefined;

var _ConnectedChat = require('./ConnectedChat');

var _ConnectedChat2 = _interopRequireDefault(_ConnectedChat);

var _dispatcher = require('./store/actions/dispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Chat = _ConnectedChat2.default;
exports.addUserMessage = _dispatcher.addUserMessage;
exports.addResponseMessage = _dispatcher.addResponseMessage;
exports.addResponseChoices = _dispatcher.addResponseChoices;
exports.addLinkSnippet = _dispatcher.addLinkSnippet;
exports.renderCustomComponent = _dispatcher.renderCustomComponent;
exports.toggleChat = _dispatcher.toggleChat;
exports.toggleInputDisabled = _dispatcher.toggleInputDisabled;
exports.dropMessages = _dispatcher.dropMessages;