import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const Apartment = (props) => {
  const { apartment, apartmentError, handleChange, intl } = props;
  return (
    <TextBox
      name="apartment"
      label={<FormattedMessage id="contact.apartment" />}
      placeholder={intl.formatMessage({ id: 'contact.apartmentDesc' })}
      value={apartment}
      error={apartmentError}
      handleChange={event => handleChange(event)}
    />
  );
};

Apartment.propTypes = {
  apartment: PropTypes.string.isRequired,
  apartmentError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Apartment);
