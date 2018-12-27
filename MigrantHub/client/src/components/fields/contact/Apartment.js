import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const Apartment = (props) => {
  const { apartment, apartmentError, handleChange } = props;
  return (
    <TextBox
      name="apartment"
      label="Apartment"
      placeholder="Apartment, suite, unit, building, floor, etc."
      value={apartment}
      error={apartmentError}
      handleChange={event => handleChange(event)}
    />
  );
};

Apartment.propTypes = {
  apartment: PropTypes.string.isRequired,
  apartmentError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Apartment;
