import React from 'react';
import { shallow } from 'enzyme';
import EmploymentInfo from '../../personal/EmploymentInfo';


it('renders without crashing', () => {
  shallow(<EmploymentInfo />);
});
