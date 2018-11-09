import React from 'react';
import { shallow } from 'enzyme';
import LanguageInfo from '../../personal/LanguageInfo';


it('renders without crashing', () => {
  shallow(<LanguageInfo />);
});
