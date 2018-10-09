import React from 'react';
import LanguageInfo from '../LanguageInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<LanguageInfo />);
});
