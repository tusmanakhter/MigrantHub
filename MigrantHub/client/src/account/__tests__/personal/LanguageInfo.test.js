import React from 'react';
import LanguageInfo from '../../personal/LanguageInfo';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<LanguageInfo />);
});
