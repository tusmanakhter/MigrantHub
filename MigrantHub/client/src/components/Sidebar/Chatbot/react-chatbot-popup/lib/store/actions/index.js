'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleChat = toggleChat;
exports.toggleInputDisabled = toggleInputDisabled;
exports.addUserMessage = addUserMessage;
exports.addResponseMessage = addResponseMessage;
exports.addResponseChoices = addResponseChoices;
exports.addLinkSnippet = addLinkSnippet;
exports.renderCustomComponent = renderCustomComponent;
exports.dropMessages = dropMessages;
exports.setFullscreen = setFullscreen;
exports.unsetFullscreen = unsetFullscreen;

var _actionTypes = require('./actionTypes');

var actions = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function toggleChat() {
  return {
    type: actions.TOGGLE_CHAT
  };
}

function toggleInputDisabled() {
  return {
    type: actions.TOGGLE_INPUT_DISABLED
  };
}

function addUserMessage(text) {
  return {
    type: actions.ADD_NEW_USER_MESSAGE,
    text: text
  };
}

function addResponseMessage(text) {
  return {
    type: actions.ADD_NEW_RESPONSE_MESSAGE,
    text: text
  };
}

function addResponseChoices(object) {
  return {
    type: actions.ADD_NEW_RESPONSE_CHOICES,
    choices: object
  };
}

function addLinkSnippet(link) {
  return {
    type: actions.ADD_NEW_LINK_SNIPPET,
    link: link
  };
}

function renderCustomComponent(component, props, showAvatar) {
  return {
    type: actions.ADD_COMPONENT_MESSAGE,
    component: component,
    props: props,
    showAvatar: showAvatar
  };
}

function dropMessages() {
  return {
    type: actions.DROP_MESSAGES
  };
}

function setFullscreen() {
  return {
    type: actions.SET_FULLSCREEN
  };
}

function unsetFullscreen() {
  return {
    type: actions.UNSET_FULLSCREEN
  };
}