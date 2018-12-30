import React from 'react';
import { shallow } from 'enzyme';
import EmploymentInfo from '../../account/personal/EmploymentInfo';


it('renders without crashing', () => {
  shallow(<EmploymentInfo />);
});
