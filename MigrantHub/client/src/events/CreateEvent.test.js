import React from 'react';
import CreateEvent from './CreateEvent';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<CreateEvent />);
});
