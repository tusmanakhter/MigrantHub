'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _variables = require('../../styles/variables');

var messageBubble = function messageBubble(backgroundColor, color) {
  return {
    backgroundColor: backgroundColor,
    color: color,
    borderRadius: '5px',
    padding: ' 0px 15px',
    paddingTop: '7px',
    maxWidth: '215px',
    textAlign: 'left',
    fontWeight: '400',
  };
};

var styles = {
  message: {
    client: _extends({}, messageBubble(_variables.colors.lightBlue, _variables.colors.white), {
      marginLeft: 'auto'
    }),
    response: _extends({}, messageBubble(_variables.colors.grey2, _variables.colors.black))
  }
};

exports.default = styles;