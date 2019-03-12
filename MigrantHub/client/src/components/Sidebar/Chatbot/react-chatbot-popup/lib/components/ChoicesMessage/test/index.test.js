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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('<Message />', function () {
  /* eslint-disable no-underscore-dangle */
  var createMessageComponent = function createMessageComponent(message) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { message: message }));
  };

  it('should render a <strong> element', function () {
    var message = (0, _helper.createNewMessage)('New message with **Markdown**!');
    var messageComponent = createMessageComponent(message);
    expect(messageComponent.find('div').at(1).getElement().props.dangerouslySetInnerHTML.__html).toMatchSnapshot();
  });

  it('should reder a <em> element', function () {
    var message = (0, _helper.createNewMessage)('New message with *Markdown*!');
    var messageComponent = createMessageComponent(message);
    expect(messageComponent.find('div').at(1).getElement().props.dangerouslySetInnerHTML.__html).toMatchSnapshot();
  });
  /* eslint-enable */
});