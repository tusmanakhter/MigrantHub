import React from 'react';
import FamilyInfo from '../personal/FamilyInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<FamilyInfo />);
});
