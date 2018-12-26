import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Apartment = (props) => {
  const { apartment, apartmentError, handleChange } = props;
  return (
    <TextField
      id="apartment"
      name="apartment"
      label="Apartment"
      placeholder="Apartment, suite, unit, building, floor, etc."
      value={apartment}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={apartmentError}
      error={apartmentError.length > 0}
    />
  );
};

Apartment.propTypes = {
  apartment: PropTypes.string.isRequired,
  apartmentError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Apartment;
