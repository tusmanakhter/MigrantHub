'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Conversation = require('../Conversation');

var _Conversation2 = _interopRequireDefault(_Conversation);

var _Launcher = require('../Launcher');

var _Launcher2 = _interopRequireDefault(_Launcher);

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _dispatcher = require('../../store/actions/dispatcher');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatLayout = function (_React$Component) {
  _inherits(ChatLayout, _React$Component);

  function ChatLayout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChatLayout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChatLayout.__proto__ || Object.getPrototypeOf(ChatLayout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      width: 0,
      height: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChatLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.fullscreen) {
        (0, _dispatcher.setFullscreen)();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {};

      style = _extends({}, _style2.default.widgetContainer);

      if (this.props.showChat) {
        style = _extends({}, style, _style2.default.fullscreen);
      }

      return _react2.default.createElement(
        _Div2.default,
        { style: style },
        this.props.showChat && _react2.default.createElement(_Conversation2.default, {
          title: this.props.title,
          sendMessage: this.props.onSendMessage,
          senderPlaceHolder: this.props.senderPlaceHolder,
          profileAvatar: this.props.profileAvatar,
          toggleChat: this.props.onToggleConversation,
          showChat: this.props.showChat,
          showCloseButton: this.props.showCloseButton,
          disabledInput: this.props.disabledInput
        }),
        _react2.default.createElement(_Launcher2.default, {
          toggle: this.props.onToggleConversation,
          badge: this.props.badge
        })
      );
    }
  }]);

  return ChatLayout;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var behavior = _ref2.behavior;
  return {
    showChat: behavior.showChat,
    disabledInput: behavior.disabledInput,
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ChatLayout);