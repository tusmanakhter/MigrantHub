'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snippet = function (_React$PureComponent) {
  _inherits(Snippet, _React$PureComponent);

  function Snippet() {
    _classCallCheck(this, Snippet);

    return _possibleConstructorReturn(this, (Snippet.__proto__ || Object.getPrototypeOf(Snippet)).apply(this, arguments));
  }

  _createClass(Snippet, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        _Div2.default,
        { style: _styles2.default.snippet },
        React.createElement(_Text2.default, { text: this.props.message.title }),
        React.createElement(
          _Div2.default,
          { style: _styles2.default.snippetDetails },
          React.createElement(
            'a',
            { href: this.props.message.link, target: this.props.message.target, className: 'link' },
            this.props.message.link
          )
        )
      );
    }
  }]);

  return Snippet;
}(React.PureComponent);

exports.default = Snippet;