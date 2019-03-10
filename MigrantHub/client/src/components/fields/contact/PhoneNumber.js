import React from 'react';
import PropTypes from 'prop-types';
import { PhoneMask } from 'lib/Masks';
import MaskedTextbox from 'components/fields/generic/MaskedTextbox';
import { FormattedMessage } from 'react-intl';

const PhoneNumber = (props) => {
  const {
    phoneNumber, phoneNumberError, handleChange,
    variant, margin, inputClass,
  } = props;

  return (
    <MaskedTextbox
      name="phoneNumber"
      label={<FormattedMessage id="contact.phone" />}
      placeholder=""
      value={phoneNumber}
      error={phoneNumberError}
      mask={PhoneMask}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

PhoneNumber.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};


PhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default PhoneNumber;
