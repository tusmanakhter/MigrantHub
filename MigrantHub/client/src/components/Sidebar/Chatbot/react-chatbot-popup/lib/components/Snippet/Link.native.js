'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _reactNative = require('react-native');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var onClick = function onClick(url) {
  return function () {
    _reactNative.Linking.openURL(url).catch(function (err) {
      return console.error('An error occurred', err);
    });
  };
};

var Link = function Link(_ref) {
  var link = _ref.link;
  return React.createElement(
    _Button2.default,
    { style: _styles2.default.link, onPress: onClick(link) },
    React.createElement(
      _reactNative.Text,
      null,
      link
    )
  );
};

exports.default = Link;