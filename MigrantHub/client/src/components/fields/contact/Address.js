import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const Address = (props) => {
  const {
    address, addressError, handleChange,
    variant, margin, inputClass, intl,
  } = props;

  return (
    <TextBox
      name="address"
      label={<FormattedMessage id="contact.address" />}
      placeholder={intl.formatMessage({ id: 'contact.addressDesc' })}
      value={address}
      error={addressError}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Address.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  addressError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default injectIntl(Address);
