import React from 'react';
import { shallow } from 'enzyme';
import LanguageInfo from '../../account/personal/LanguageInfo';


it('renders without crashing', () => {
  shallow(<LanguageInfo />);
});
