'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactNative = require('react-native');

var _variables = require('../../styles/variables');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var injectedScript = function injectedScript() {
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    } else {
      var _height = document.getElementById('message-container').clientHeight;
      postMessage(_height - 1);
    }
  }
  waitForBridge();
};

var MyWebView = function (_React$Component) {
  _inherits(MyWebView, _React$Component);

  function MyWebView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyWebView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyWebView.__proto__ || Object.getPrototypeOf(MyWebView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      webViewHeight: 36
    }, _this.onMessage = function (e) {
      console.log('event', e.nativeEvent);
      _this.setState({
        webViewHeight: parseInt(e.nativeEvent.data, 10) + 20
      });
      _this.props.onChangeHeight(parseInt(e.nativeEvent.data, 10) + 20);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyWebView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.target === 'client') {
        console.log('client', this.props);
      } else {
        console.log('response', this.props);
      }
      var color = this.props.target === 'client' ? _variables.colors.turqois2 : _variables.colors.grey2;
      var _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
      return React.createElement(_reactNative.WebView, _extends({
        ref: function ref(_ref2) {
          _this2.webview = _ref2;
        },
        injectedJavaScript: '(' + String(injectedScript) + ')();' + 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');',
        scrollEnabled: false,
        onMessage: this.onMessage,
        javaScriptEnabled: true,
        automaticallyAdjustContentInsets: false,
        scalesPageToFit: false,
        source: { html: '<style>body,html{background-color:' + color + '; width: 135pt;margin: 0;}</style><div id="message-container">' + this.props.HTML + '</div>' }
      }, this.props, {
        style: [{ width: 185 }, this.props.style || {}, { height: _h }]
      }));
    }
  }]);

  return MyWebView;
}(React.Component);

MyWebView.defaultProps = {
  autoHeight: true
};
exports.default = MyWebView;