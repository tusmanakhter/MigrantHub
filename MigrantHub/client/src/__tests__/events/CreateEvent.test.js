import React from 'react';
import { shallow } from 'enzyme';
import EventForm from '../../events/EventForm';


it('renders without crashing', () => {
  shallow(<EventForm />);
});
