import React from 'react';
import ContactInfo from '../../common/ContactInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ContactInfo />);
});
