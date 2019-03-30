import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const City = (props) => {
  const {
    city, cityError, handleChange,
  } = props;

  return (
    <TextBox
      name="city"
      label={<FormattedMessage id="contact.city" />}
      placeholder=""
      value={city}
      error={cityError}
      handleChange={event => handleChange(event)}
    />
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  cityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default City;
