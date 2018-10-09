import React from 'react';
import AccountInfo from '../AccountInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<AccountInfo />);
});
