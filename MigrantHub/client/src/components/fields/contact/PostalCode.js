import React from 'react';
import PropTypes from 'prop-types';
import { PostalCodeMask } from 'lib/Masks';
import MaskedTextbox from 'components/fields/generic/MaskedTextbox';
import { FormattedMessage } from 'react-intl';

const PostalCode = (props) => {
  const {
    postalCode, postalCodeError, handleChange,
  } = props;

  return (
    <MaskedTextbox
      name="postalCode"
      label={<FormattedMessage id="contact.postal" />}
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
