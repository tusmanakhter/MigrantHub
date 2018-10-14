import React from 'react';
import EmploymentInfo from '../../personal/EmploymentInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<EmploymentInfo />);
});
