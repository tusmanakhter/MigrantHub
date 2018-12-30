import React from 'react';
import { shallow } from 'enzyme';
import PersonalInfo from '../../account/personal/PersonalInfo';


it('renders without crashing', () => {
  shallow(<PersonalInfo />);
});
