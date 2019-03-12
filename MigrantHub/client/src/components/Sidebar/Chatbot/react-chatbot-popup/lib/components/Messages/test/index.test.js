'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _helper = require('../../../store/reducers/helper');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _Message = require('../../Message');

var _Message2 = _interopRequireDefault(_Message);

var _Snippet = require('../../Snippet');

var _Snippet2 = _interopRequireDefault(_Snippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('<Messages />', function () {
  var message = (0, _helper.createNewMessage)('Response message 1');
  var linkSnippet = (0, _helper.createLinkSnippet)({ title: 'link', link: 'link' });
  /* eslint-disable react/prop-types */
  var Dummy = function Dummy(_ref) {
    var text = _ref.text;
    return _react2.default.createElement(
      'div',
      null,
      text
    );
  };
  /* eslint-enable */
  var customComp = (0, _helper.createComponentMessage)(Dummy, { text: 'This is a Dummy Component!' });

  var responseMessages = [message, linkSnippet, customComp];

  var messagesComponent = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default.WrappedComponent, {
    messages: responseMessages
  }));

  it('should render a Message component', function () {
    expect(messagesComponent.find(_Message2.default)).toHaveLength(1);
  });

  it('should render a Snippet component', function () {
    expect(messagesComponent.find(_Snippet2.default)).toHaveLength(1);
  });

  it('should render a custom component', function () {
    expect(messagesComponent.find(Dummy)).toHaveLength(1);
  });

  it('should render three messages', function () {
    expect(messagesComponent.children()).toHaveLength(3);
  });
});