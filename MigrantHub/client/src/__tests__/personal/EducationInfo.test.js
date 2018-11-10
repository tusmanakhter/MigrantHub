import React from 'react';
import { shallow } from 'enzyme';
import EducationInfo from '../../account/personal/EducationInfo';


it('renders without crashing', () => {
  shallow(<EducationInfo />);
});
