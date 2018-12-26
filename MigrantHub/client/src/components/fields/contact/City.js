import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const City = (props) => {
  const { city, cityError, handleChange } = props;
  return (
    <TextField
      id="city"
      name="city"
      label="City"
      value={city}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={cityError}
      error={cityError.length > 0}
    />
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  cityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default City;
