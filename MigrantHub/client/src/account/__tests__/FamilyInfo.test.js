import React from 'react';
import FamilyInfo from '../FamilyInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<FamilyInfo />);
});
