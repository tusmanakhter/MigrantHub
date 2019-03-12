'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _variables = require('../../styles/variables');

var messageBubble = function messageBubble(color) {
  return {
    backgroundColor: color,
    borderRadius: '5px',
    padding: '15px',
    maxWidth: '215px',
    textAlign: 'left'
  };
};

var styles = {
  message: {
    client: _extends({}, messageBubble(_variables.colors.turqois2), {
      marginLeft: 'auto'
    }),
    response: _extends({}, messageBubble(_variables.colors.grey2))
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '15px 0 0 0'
  },
  button: {
    borderColor: _variables.colors.turqois1,
    borderWidth: '1px',
    backgroundColor: _variables.colors.white,
    padding: '10px 15px',
    borderRadius: '4px'
  }
};

exports.default = styles;