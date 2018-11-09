import React from 'react';
import { shallow } from 'enzyme';
import EducationInfo from '../../personal/EducationInfo';


it('renders without crashing', () => {
  shallow(<EducationInfo />);
});
