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
    padding: 15,
    maxWidth: 215
  };
};

var styles = {
  message: {
    client: _extends({}, messageBubble(_variables.colors.turqois2), {
      alignSelf: 'flex-end'
    }),
    response: _extends({}, messageBubble(_variables.colors.grey2))
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  button: {
    borderColor: _variables.colors.turqois1,
    borderWidth: 1,
    backgroundColor: _variables.colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 4
  }
};

exports.default = styles;