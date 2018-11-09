import React from 'react';
import { shallow } from 'enzyme';
import AboutInfo from '../../account/business/AboutInfo';


it('renders without crashing', () => {
  shallow(<AboutInfo />);
});
