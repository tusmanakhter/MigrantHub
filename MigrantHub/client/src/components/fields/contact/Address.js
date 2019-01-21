import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const Address = (props) => {
  const { address, addressError, handleChange } = props;
  return (
    <TextBox
      name="address"
      label={<FormattedMessage id="contact.address" />}
      placeholder={<FormattedMessage id="contact.addressDesc" />}
      value={address}
      error={addressError}
      handleChange={event => handleChange(event)}
    />
  );
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  addressError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Address;
