import React from 'react';
import { shallow } from 'enzyme';
import OtherInfo from '../../account/personal/OtherInfo';


it('renders without crashing', () => {
  shallow(<OtherInfo />);
});
