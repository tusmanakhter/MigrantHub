import React from 'react';
import { shallow } from 'enzyme';
import AboutInfo from '../../business/AboutInfo';


it('renders without crashing', () => {
  shallow(<AboutInfo />);
});
