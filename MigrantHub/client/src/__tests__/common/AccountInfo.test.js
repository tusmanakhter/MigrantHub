import React from 'react';
import { shallow } from 'enzyme';
import AccountInfo from '../../account/common/AccountInfo';


it('renders without crashing', () => {
  shallow(<AccountInfo />);
});
