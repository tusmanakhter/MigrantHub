import React from 'react';
import { shallow } from 'enzyme';
import IdInfo from '../../account/business/IdInfo';


it('renders without crashing', () => {
  shallow(<IdInfo />);
});
