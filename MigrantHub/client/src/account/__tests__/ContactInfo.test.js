import React from 'react';
import ContactInfo from '../personal/ContactInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ContactInfo />);
});
