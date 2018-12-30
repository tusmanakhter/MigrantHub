import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const City = (props) => {
  const { city, cityError, handleChange } = props;
  return (
    <TextBox
      name="city"
      label="City"
      placeholder=""
      value={city}
      error={cityError}
      handleChange={event => handleChange(event)}
    />
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  cityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default City;
