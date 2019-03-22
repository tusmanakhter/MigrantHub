import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const FirstName = (props) => {
  const {
    firstName, firstNameError, handleChange,
  } = props;

  return (
    <TextBox
      name="firstName"
      label={<FormattedMessage id="contact.firstname" />}
      placeholder=""
      value={firstName}
      error={firstNameError}
      handleChange={event => handleChange(event)}
    />
  );
};

FirstName.propTypes = {
  firstName: PropTypes.string.isRequired,
  firstNameError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FirstName;
