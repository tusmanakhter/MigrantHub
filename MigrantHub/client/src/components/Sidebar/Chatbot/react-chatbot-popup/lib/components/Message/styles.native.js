'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _variables = require('../../styles/variables');

var messageBubble = function messageBubble(color) {
  return {
    backgroundColor: color,
    borderRadius: 5,
    paddingHorizontal: 15,
    maxWidth: 215
  };
};

var styles = {
  message: {
    client: _extends({}, messageBubble(_variables.colors.turqois2), {
      alignSelf: 'flex-end'
    }),
    response: _extends({}, messageBubble(_variables.colors.grey2))
  }
};

exports.default = styles;