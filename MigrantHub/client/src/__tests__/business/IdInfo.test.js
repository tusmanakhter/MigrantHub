import React from 'react';
import { shallow } from 'enzyme';
import IdInfo from '../../business/IdInfo';


it('renders without crashing', () => {
  shallow(<IdInfo />);
});
