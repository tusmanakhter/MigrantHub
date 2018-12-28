import React from 'react';
import PropTypes from 'prop-types';
import { PostalCodeMask } from '../../../lib/Masks';
import MaskedTextbox from '../generic/MaskedTextbox';

const PostalCode = (props) => {
  const { postalCode, postalCodeError, handleChange } = props;
  return (
    <MaskedTextbox
      name="postalCode"
      label="Postal Code"
      placeholder=""
      value={postalCode}
      error={postalCodeError}
      mask={PostalCodeMask}
      handleChange={event => handleChange(event)}
    />
  );
};

PostalCode.propTypes = {
  postalCode: PropTypes.string.isRequired,
  postalCodeError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PostalCode;
