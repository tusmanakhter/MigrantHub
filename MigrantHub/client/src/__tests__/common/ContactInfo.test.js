import React from 'react';
import { shallow } from 'enzyme';
import ContactInfo from '../../common/ContactInfo';


it('renders without crashing', () => {
  shallow(<ContactInfo />);
});
