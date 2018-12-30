import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const Address = (props) => {
  const { address, addressError, handleChange } = props;
  return (
    <TextBox
      name="address"
      label="Street Address"
      placeholder="Street and number"
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
