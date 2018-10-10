import React from 'react';
import IdInfo from '../business/IdInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<IdInfo />);
});
