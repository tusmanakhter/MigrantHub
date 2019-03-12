'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _fileMock = require('../../../../mocks/fileMock');

var _fileMock2 = _interopRequireDefault(_fileMock);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _layout = require('../layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('<Chat />', function () {
  var profile = _fileMock2.default;
  var handleUserMessage = jest.fn();
  var newMessageEvent = 'New message';

  var chatComponent = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, {
    handleNewUserMessage: handleUserMessage,
    profileAvatar: profile
  }));

  it('should render ChatLayout when on fullscreen mode', function () {
    var chatFullscreenModeComponent = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, {
      handleNewUserMessage: handleUserMessage,
      profileAvatar: profile,
      fullScreenMode: true
    }));
    expect(chatFullscreenModeComponent.props().fullScreenMode).toBe(true);
    expect(chatFullscreenModeComponent.find(_layout2.default)).toHaveLength(1);
  });

  it('should render ChatLayout when not on fullScreen mode', function () {
    expect(chatComponent.props().fullScreenMode).toBe(undefined);
    expect(chatComponent.find(_layout2.default)).toHaveLength(1);
  });

  it('should not call prop when calling newMessageEvent width empty message', function () {
    chatComponent.instance().handleMessageSubmit('');
    expect(handleUserMessage).not.toBeCalled();
  });

  it('should call prop when calling newMessageEvent', function () {
    chatComponent.instance().handleMessageSubmit(newMessageEvent);
    expect(handleUserMessage).toBeCalled();
  });

  it('should call toggleChat', function () {
    var result = chatComponent.instance().toggleConversation();
    expect(result).toBe(undefined);
  });
});