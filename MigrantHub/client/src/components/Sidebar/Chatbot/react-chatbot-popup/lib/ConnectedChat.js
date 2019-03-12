'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Chat = require('./components/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectedChat = function ConnectedChat(props) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(_Chat2.default, {
      title: props.title,
      handleNewUserMessage: props.handleNewUserMessage,
      senderPlaceHolder: props.senderPlaceHolder,
      profileAvatar: props.profileAvatar,
      showCloseButton: props.showCloseButton,
      fullScreenMode: props.fullScreenMode,
      badge: props.badge
    })
  );
};

ConnectedChat.defaultProps = {
  title: 'Welcome',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  badge: 0
};

exports.default = ConnectedChat;