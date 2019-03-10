import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const Apartment = (props) => {
  const {
    apartment, apartmentError, handleChange,
    variant, margin, inputClass, intl,
  } = props;

  return (
    <TextBox
      name="apartment"
      label={<FormattedMessage id="contact.apartment" />}
      placeholder={intl.formatMessage({ id: 'contact.apartmentDesc' })}
      value={apartment}
      error={apartmentError}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Apartment.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Apartment.propTypes = {
  apartment: PropTypes.string.isRequired,
  apartmentError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default injectIntl(Apartment);
