import React from 'react';
import EducationInfo from '../EducationInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<EducationInfo />);
});
