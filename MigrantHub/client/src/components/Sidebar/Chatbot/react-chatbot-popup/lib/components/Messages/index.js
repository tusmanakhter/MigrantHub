'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRedux = require('react-redux');

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var messagesDiv = null;

var scrollToBottom = function scrollToBottom() {
  if (messagesDiv) {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
};

var Messages = function (_React$Component) {
  _inherits(Messages, _React$Component);

  function Messages() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Messages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Messages.__proto__ || Object.getPrototypeOf(Messages)).call.apply(_ref, [this].concat(args))), _this), _this.getComponentToRender = function (message) {
      var ComponentToRender = message.component;
      if (message.type === 'component' && ComponentToRender) {
        return React.createElement(ComponentToRender, message.props);
      }
      return React.createElement(ComponentToRender, { message: message, sendMessage: _this.props.sendMessage });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Messages, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      messagesDiv = document.getElementById('messages');
      scrollToBottom();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      scrollToBottom();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var messagesContainerStyle = _styles2.default.messagesContainer;

      if (this.props.fullscreen) {
        messagesContainerStyle = _extends({}, messagesContainerStyle, _styles2.default.fullscreenMessagesContainer);
      }

      return React.createElement(
        _Div2.default,
        { id: 'messages', style: messagesContainerStyle },
        this.props.messages.map(function (message, index) {
          return React.createElement(
            _Div2.default,
            { style: _styles2.default.message, key: index },
            _this2.props.profileAvatar && message.showAvatar && React.createElement(_Image2.default, { src: _this2.props.profileAvatar, style: _styles2.default.avatar, alt: 'profile' }),
            _this2.getComponentToRender(message)
          );
        })
      );
    }
  }]);

  return Messages;
}(React.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var messages = _ref2.messages,
      behavior = _ref2.behavior;

  return {
    messages: messages,
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Messages);