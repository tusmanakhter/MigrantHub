import React from 'react';
import { shallow } from 'enzyme';
import FamilyInfo from '../../account/personal/FamilyInfo';


it('renders without crashing', () => {
  shallow(<FamilyInfo />);
});
