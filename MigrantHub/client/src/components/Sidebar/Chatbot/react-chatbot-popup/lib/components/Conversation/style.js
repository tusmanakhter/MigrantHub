'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('../../styles/variables');

var styles = {
  conversationContainer: {
    opacity: 0,
    borderRadius: '10px',
    boxShadow: '0px 2px 10px 1px ' + _variables.colors.grey3,
    transition: 'opacity .2s ease',
    width: '90vw',
    maxWidth: '370px'
  },
  visible: {
    opacity: 1
  },
  fullScreen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    maxWidth: 'none'
  }
};

exports.default = styles;