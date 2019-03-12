'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('../../styles/variables');

var styles = {
  messagesContainer: {
    backgroundColor: _variables.colors.white,
    height: '50vh',
    maxHeight: '410px',
    overflowY: 'auto',
    paddingTop: '10px'
  },

  fullscreenMessagesContainer: {
    height: '100%',
    maxHeight: 'none'
  },

  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    marginRight: '10px'
  },

  message: {
    margin: '10px',
    display: 'flex',
    fontSize: '14px'
  },

  messagesInner: {}
};

exports.default = styles;