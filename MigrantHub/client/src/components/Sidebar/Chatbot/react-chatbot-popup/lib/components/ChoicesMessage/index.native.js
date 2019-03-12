'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _reactNative = require('react-native');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$PureComponent) {
  _inherits(Message, _React$PureComponent);

  function Message() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Message.__proto__ || Object.getPrototypeOf(Message)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: 0,
      clicked: false
    }, _this.onChangeHeight = function (height) {
      _this.setState({
        height: height
      });
    }, _this.choose = function (value) {
      return function () {
        if (!_this.state.clicked) {
          _this.props.sendMessage(value);
          _this.setState({
            clicked: true
          });
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Message, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        _Div2.default,
        { style: _extends({}, _styles2.default.message[this.props.message.sender], { height: this.state.height || 'auto', paddingVertical: 10 }) },
        React.createElement(
          _reactNative.Text,
          null,
          this.props.message.data.text
        ),
        React.createElement(
          _Div2.default,
          { style: _styles2.default.buttonContainer },
          this.props.message.data.choices.map(function (choice, index) {
            return React.createElement(
              _Button2.default,
              { key: index, onClick: _this2.choose(choice.value), style: _styles2.default.button },
              React.createElement(
                _reactNative.Text,
                null,
                choice.text
              )
            );
          })
        )
      );
    }
  }]);

  return Message;
}(React.PureComponent);

exports.default = Message;