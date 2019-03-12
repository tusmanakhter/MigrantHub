'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MESSAGE_SENDER = exports.MESSAGE_SENDER = {
  CLIENT: 'client',
  RESPONSE: 'response'
};

var MESSAGES_TYPES = exports.MESSAGES_TYPES = {
  TEXT: 'text',
  SNIPPET: {
    LINK: 'snippet'
  },
  CHOICES: 'choices',
  CUSTOM_COMPONENT: 'component'
};