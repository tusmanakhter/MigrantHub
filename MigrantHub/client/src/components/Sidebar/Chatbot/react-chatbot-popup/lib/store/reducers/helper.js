'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewMessage = createNewMessage;
exports.createNewChoicesMessage = createNewChoicesMessage;
exports.createLinkSnippet = createLinkSnippet;
exports.createComponentMessage = createComponentMessage;

var _constants = require('../../constants');

var _Message = require('../../components/Message');

var _Message2 = _interopRequireDefault(_Message);

var _ChoicesMessage = require('../../components/ChoicesMessage');

var _ChoicesMessage2 = _interopRequireDefault(_ChoicesMessage);

var _Snippet = require('../../components/Snippet');

var _Snippet2 = _interopRequireDefault(_Snippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNewMessage(text, sender) {
  return {
    type: _constants.MESSAGES_TYPES.TEXT,
    component: _Message2.default,
    text: text,
    sender: sender,
    showAvatar: sender === _constants.MESSAGE_SENDER.RESPONSE
  };
}

function createNewChoicesMessage(data) {
  console.log(data);
  return {
    type: _constants.MESSAGES_TYPES.CHOICES,
    component: _ChoicesMessage2.default,
    data: data,
    sender: _constants.MESSAGE_SENDER.RESPONSE
  };
}

function createLinkSnippet(link) {
  return {
    type: _constants.MESSAGES_TYPES.SNIPPET.LINK,
    component: _Snippet2.default,
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    sender: _constants.MESSAGE_SENDER.RESPONSE,
    showAvatar: true
  };
}

function createComponentMessage(component, props, showAvatar) {
  return {
    type: _constants.MESSAGES_TYPES.CUSTOM_COMPONENT,
    component: component,
    props: props,
    sender: _constants.MESSAGE_SENDER.RESPONSE,
    showAvatar: showAvatar
  };
}