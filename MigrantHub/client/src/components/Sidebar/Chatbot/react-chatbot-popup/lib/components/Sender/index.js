'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRedux = require('react-redux');

var _Send = require('./Send');

var _Send2 = _interopRequireDefault(_Send);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sender = function (_React$Component) {
  _inherits(Sender, _React$Component);

  function Sender() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Sender);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sender.__proto__ || Object.getPrototypeOf(Sender)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      message: ''
    }, _this.onChangeMessage = function (event) {
      _this.setState({
        message: event.currentTarget.value
      });
    }, _this.sendMessage = function () {
      _this.props.sendMessage(_this.state.message.trim());
      _this.setState({
        message: ''
      });
    }, _this.handleKeyPress = function (event) {
      if (event.key === 'Enter') {
        _this.sendMessage();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sender, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          disabledInput = _props.disabledInput,
          fullscreen = _props.fullscreen;


      var sendStyle = _extends({}, _style2.default.send);

      var senderStyle = _extends({}, _style2.default.sender);

      if (fullscreen) {
        senderStyle = _extends({}, senderStyle, _style2.default.fullscreenSender);
        sendStyle = _extends({}, sendStyle, _style2.default.fullscreenSend);
      }

      return React.createElement(_Send2.default, {
        placeholder: placeholder,
        disabledInput: disabledInput,
        message: this.state.message,
        onChangeMessage: this.onChangeMessage,
        handleKeyPress: this.handleKeyPress,
        sendMessage: this.sendMessage,
        styles: {
          sender: senderStyle,
          send: sendStyle,
          sendIcon: _style2.default.sendIcon
        }
      });
    }
  }]);

  return Sender;
}(React.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var behavior = _ref2.behavior;
  return {
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Sender);