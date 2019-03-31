import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const LastName = (props) => {
  const {
    lastName, lastNameError, handleChange,
  } = props;

  return (
    <TextBox
      name="lastName"
      label={<FormattedMessage id="contact.lastname" />}
      placeholder=""
      value={lastName}
      error={lastNameError}
      handleChange={event => handleChange(event)}
    />
  );
};


LastName.propTypes = {
  lastName: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default LastName;
