import React from 'react';
import AccountInfo from '../personal/AccountInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<AccountInfo />);
});
