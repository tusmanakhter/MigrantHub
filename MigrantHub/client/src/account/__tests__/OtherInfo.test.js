import React from 'react';
import OtherInfo from '../personal/OtherInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<OtherInfo />);
});
