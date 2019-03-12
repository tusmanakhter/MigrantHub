'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dispatcher = require('../../store/actions/dispatcher');

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_React$Component) {
  _inherits(Chat, _React$Component);

  function Chat() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chat);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chat.__proto__ || Object.getPrototypeOf(Chat)).call.apply(_ref, [this].concat(args))), _this), _this.toggleConversation = function () {
      (0, _dispatcher.toggleChat)();
    }, _this.handleMessageSubmit = function (message) {
      if (message) {
        (0, _dispatcher.addUserMessage)(message);
        _this.props.handleNewUserMessage(message);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chat, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.fullScreenMode) {
        (0, _dispatcher.setFullscreen)();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        onToggleConversation: this.toggleConversation,
        onSendMessage: this.handleMessageSubmit,
        title: this.props.title,
        senderPlaceHolder: this.props.senderPlaceHolder,
        profileAvatar: this.props.profileAvatar,
        showCloseButton: this.props.showCloseButton,
        fullScreenMode: this.props.fullScreenMode,
        badge: this.props.badge
      });
    }
  }]);

  return Chat;
}(_react2.default.Component);

exports.default = Chat;