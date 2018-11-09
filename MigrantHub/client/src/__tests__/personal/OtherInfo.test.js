import React from 'react';
import { shallow } from 'enzyme';
import OtherInfo from '../../personal/OtherInfo';


it('renders without crashing', () => {
  shallow(<OtherInfo />);
});
