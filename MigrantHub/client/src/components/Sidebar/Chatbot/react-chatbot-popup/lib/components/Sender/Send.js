'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _send_button = require('../../../assets/send_button.png');

var _send_button2 = _interopRequireDefault(_send_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Send = function Send(_ref) {
  var placeholder = _ref.placeholder,
      disabledInput = _ref.disabledInput,
      message = _ref.message,
      onChangeMessage = _ref.onChangeMessage,
      handleKeyPress = _ref.handleKeyPress,
      sendMessage = _ref.sendMessage,
      styles = _ref.styles;
  return React.createElement(
    _Div2.default,
    { style: styles.sender, onSubmit: sendMessage },
    React.createElement(_Input2.default, {
      placeholder: placeholder,
      disabledInput: disabledInput,
      message: message,
      onChangeMessage: onChangeMessage,
      handleKeyPress: handleKeyPress
    }),
    React.createElement(
      _Button2.default,
      { style: styles.send, onClick: sendMessage },
      React.createElement(_Image2.default, { src: _send_button2.default, style: styles.sendIcon, alt: 'send' })
    )
  );
};

exports.default = Send;