import React from 'react';
import { shallow } from 'enzyme';
import FamilyInfo from '../../personal/FamilyInfo';


it('renders without crashing', () => {
  shallow(<FamilyInfo />);
});
