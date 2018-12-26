import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { PhoneMask } from '../../../lib/Masks';

const PhoneNumber = (props) => {
  const { phoneNumber, phoneNumberError, handleChange } = props;
  return (
    <TextField
      id="phoneNumber"
      name="phoneNumber"
      label="Phone Number"
      value={phoneNumber}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={phoneNumberError}
      error={phoneNumberError.length > 0}
      InputProps={{
        inputComponent: PhoneMask,
      }}
    />
  );
};

PhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PhoneNumber;
