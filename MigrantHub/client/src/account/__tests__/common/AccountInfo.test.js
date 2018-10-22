import React from 'react';
import AccountInfo from '../../common/AccountInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<AccountInfo />);
});
