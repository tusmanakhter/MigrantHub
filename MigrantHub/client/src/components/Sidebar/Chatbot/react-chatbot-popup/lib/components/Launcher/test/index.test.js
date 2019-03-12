'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('<Launcher />', function () {
  var createMessageComponent = function createMessageComponent(_ref) {
    var toggle = _ref.toggle,
        chatOpened = _ref.chatOpened;
    return (0, _enzyme.shallow)(_react2.default.createElement(_index2.default.WrappedComponent, {
      toggle: toggle,
      chatOpened: chatOpened
    }));
  };

  it('should call toggle prop when clicked', function () {
    var toggle = jest.fn();
    var chatOpened = false;
    var launcherComponent = createMessageComponent({ toggle: toggle, chatOpened: chatOpened });
    launcherComponent.find('button').simulate('click');
    expect(toggle).toBeCalled();
  });

  it('should render the open-launcher image when chatOpened = false', function () {
    var toggle = jest.fn();
    var chatOpened = false;
    var launcherComponent = createMessageComponent({ toggle: toggle, chatOpened: chatOpened });
    expect(launcherComponent.find('img').props().alt).toEqual('open launcher');
  });

  it('should render the close-launcher image when chatOpened = true', function () {
    var toggle = jest.fn();
    var chatOpened = true;
    var launcherComponent = createMessageComponent({ toggle: toggle, chatOpened: chatOpened });
    expect(launcherComponent.find('img').props().alt).toEqual('close launcher');
  });
});