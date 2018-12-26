import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Address = (props) => {
  const { address, addressError, handleChange } = props;
  return (
    <TextField
      id="address"
      name="address"
      label="Street Address"
      placeholder="Street and number"
      value={address}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={addressError}
      error={addressError.length > 0}
    />
  );
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  addressError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Address;
