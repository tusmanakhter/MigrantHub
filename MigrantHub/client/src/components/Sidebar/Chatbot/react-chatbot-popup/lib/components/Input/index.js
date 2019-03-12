'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Input = function Input(_ref) {
  var placeholder = _ref.placeholder,
      disabledInput = _ref.disabledInput,
      message = _ref.message,
      onChangeMessage = _ref.onChangeMessage,
      handleKeyPress = _ref.handleKeyPress;
  return React.createElement('input', {
    type: 'text',
    style: _style2.default.newMessage,
    placeholder: placeholder,
    disabled: disabledInput,
    autoFocus: true,
    autoComplete: 'off',
    value: message,
    onChange: onChangeMessage,
    onKeyPress: handleKeyPress
  });
};

exports.default = Input;