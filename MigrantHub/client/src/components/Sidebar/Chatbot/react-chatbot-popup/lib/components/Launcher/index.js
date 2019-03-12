'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Badge = require('../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _launcher_button = require('../../../assets/launcher_button.png');

var _launcher_button2 = _interopRequireDefault(_launcher_button);

var _clearButton = require('../../../assets/clear-button.png');

var _clearButton2 = _interopRequireDefault(_clearButton);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Launcher = function Launcher(_ref) {
  var toggle = _ref.toggle,
      chatOpened = _ref.chatOpened,
      badge = _ref.badge,
      fullscreen = _ref.fullscreen;

  var launcherStyle = _extends({}, _style2.default.launcher);

  if (chatOpened && fullscreen) {
    launcherStyle = {
      display: 'none'
    };
  }

  return _react2.default.createElement(
    _Button2.default,
    { style: launcherStyle, onClick: toggle },
    _react2.default.createElement(_Badge2.default, { badge: badge }),
    chatOpened ? _react2.default.createElement(_Image2.default, { src: _clearButton2.default, alt: 'close launcher', style: _style2.default.closeLauncher }) : _react2.default.createElement(_Image2.default, { src: _launcher_button2.default, alt: 'open launcher' })
  );
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var behavior = _ref2.behavior;
  return {
    chatOpened: behavior.showChat,
    fullscreen: behavior.fullscreen
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Launcher);