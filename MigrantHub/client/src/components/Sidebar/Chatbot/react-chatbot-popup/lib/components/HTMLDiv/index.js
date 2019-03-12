'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var HTMLDiv = function HTMLDiv(props) {
  var HTML = props.HTML;

  var noHTMLProps = _extends({}, props);

  delete noHTMLProps.HTML;
  delete noHTMLProps.target;
  delete noHTMLProps.onChangeHeight;

  return React.createElement('div', _extends({}, noHTMLProps, { dangerouslySetInnerHTML: { __html: HTML } }));
};

exports.default = HTMLDiv;