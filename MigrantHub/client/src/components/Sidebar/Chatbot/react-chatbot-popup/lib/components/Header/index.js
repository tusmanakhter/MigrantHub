'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import ChatSubTitle from 'components/ChatSubTitle'

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Div = require('../Div');

var _Div2 = _interopRequireDefault(_Div);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _ChatTitle = require('../ChatTitle');

var _ChatTitle2 = _interopRequireDefault(_ChatTitle);

var _clearButton = require('../../../assets/clear-button.png');

var _clearButton2 = _interopRequireDefault(_clearButton);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      toggleChat = _ref.toggleChat,
      showCloseButton = _ref.showCloseButton,
      fullscreen = _ref.fullscreen;

  var headerStyle = _style2.default.header;
  var closeButtonStyle = _style2.default.closeButton;

  if (fullscreen) {
    headerStyle = _extends({}, headerStyle, _style2.default.fullscreenHeader);

    closeButtonStyle = _style2.default.fullscreenCloseButton;
  }

  return _react2.default.createElement(
    _Div2.default,
    { style: headerStyle },
    showCloseButton && _react2.default.createElement(
      _Button2.default,
      { style: closeButtonStyle, onClick: toggleChat },
      _react2.default.createElement(_Image2.default, { src: _clearButton2.default, style: _style2.default.closeIcon, alt: 'close' })
    ),
    _react2.default.createElement(
      _Div2.default,
      { style: _style2.default.headerTitles },
      _react2.default.createElement(_ChatTitle2.default, { title: title })
    )
  );
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var behavior = _ref2.behavior;
  return {
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);