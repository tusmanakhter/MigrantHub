'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('../../styles/variables');

var styles = {
  sender: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: _variables.colors.grey2,
    padding: '5px',
    borderRadius: '0 0 5px 5px'
  },

  fullscreenSender: {
    borderRadius: 0
  },

  send: {
    background: _variables.colors.grey2,
    border: 0
  },

  fullscreenSend: {
    borderRadius: 0,
    flexShrink: 0
  },

  sendIcon: {
    height: '25px'
  }
};

exports.default = styles;