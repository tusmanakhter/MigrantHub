import React from 'react';
import OtherInfo from '../OtherInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<OtherInfo />);
});
