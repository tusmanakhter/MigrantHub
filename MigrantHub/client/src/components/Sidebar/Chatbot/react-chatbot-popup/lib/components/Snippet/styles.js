'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _variables = require('../../styles/variables');

var messageBubble = function messageBubble(color) {
  return {
    backgroundColor: color,
    borderRadius: '10px',
    padding: '15px',
    maxWidth: '215px',
    textAlign: 'left'
  };
};

var styles = {
  snippet: _extends({}, messageBubble(_variables.colors.grey2)),

  snippetTitle: {
    margin: 0
  },

  snippetDetails: {
    borderLeft: '2px solid ' + _variables.colors.green1,
    marginTop: '5px',
    paddingLeft: '10px'
  },

  link: {
    fontSize: '12px'
  }
};

exports.default = styles;