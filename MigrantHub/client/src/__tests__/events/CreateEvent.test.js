import React from 'react';
import { shallow } from 'enzyme';
import CreateEvent from '../../events/CreateEvent';


it('renders without crashing', () => {
  shallow(<CreateEvent />);
});
