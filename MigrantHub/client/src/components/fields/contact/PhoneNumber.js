import React from 'react';
import PropTypes from 'prop-types';
import { PhoneMask } from '../../../lib/Masks';
import MaskedTextbox from '../generic/MaskedTextbox';

const PhoneNumber = (props) => {
  const { phoneNumber, phoneNumberError, handleChange } = props;
  return (
    <MaskedTextbox
      name="phoneNumber"
      label="Phone Number"
      placeholder=""
      value={phoneNumber}
      error={phoneNumberError}
      mask={PhoneMask}
      handleChange={event => handleChange(event)}
    />
  );
};

PhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PhoneNumber;
