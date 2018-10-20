import React from 'react';
import EducationInfo from '../../personal/EducationInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<EducationInfo />);
});
