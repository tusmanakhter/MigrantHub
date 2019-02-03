import React from 'react';
import PropTypes from 'prop-types';
import { PhoneMask } from 'lib/Masks';
import MaskedTextbox from 'components/fields/generic/MaskedTextbox';
import { FormattedMessage } from 'react-intl';

const PhoneNumber = (props) => {
  const { phoneNumber, phoneNumberError, handleChange } = props;
  return (
    <MaskedTextbox
      name="phoneNumber"
      label={<FormattedMessage id="contact.phone" />}
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
