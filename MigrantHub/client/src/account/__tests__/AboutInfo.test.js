import React from 'react';
import AboutInfo from '../business/AboutInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<AboutInfo />);
});
