'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Messages = require('../Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _Sender = require('../Sender');

var _Sender2 = _interopRequireDefault(_Sender);

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Conversation = function (_React$Component) {
  _inherits(Conversation, _React$Component);

  function Conversation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Conversation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Conversation.__proto__ || Object.getPrototypeOf(Conversation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Conversation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({}, _style2.default.conversationContainer);

      if (this.props.fullscreen) {
        style = _extends({}, style, _style2.default.fullScreen);
      }

      if (this.state.visible) {
        style = _extends({}, style, _style2.default.visible);
      }

      return _react2.default.createElement(
        _Div2.default,
        { style: style },
        _react2.default.createElement(_Header2.default, {
          title: this.props.title,
          toggleChat: this.props.toggleChat,
          showCloseButton: this.props.showCloseButton
        }),
        _react2.default.createElement(_Messages2.default, {
          profileAvatar: this.props.profileAvatar,
          sendMessage: this.props.sendMessage
        }),
        _react2.default.createElement(_Sender2.default, {
          sendMessage: this.props.sendMessage,
          placeholder: this.props.senderPlaceHolder,
          disabledInput: this.props.disabledInput
        })
      );
    }
  }]);

  return Conversation;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var behavior = _ref2.behavior;
  return {
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Conversation);