import React from 'react';
import PersonalInfo from '../PersonalInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<PersonalInfo />);
});
