import React from 'react';
import PropTypes from 'prop-types';
import { genders } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const Gender = (props) => {
  const {
    gender, genderError, handleChange,
  } = props;

  return (
    <Dropdown
      name="gender"
      label={<FormattedMessage id="personal.gender" />}
      value={gender}
      error={genderError}
      options={genders}
      handleChange={event => handleChange(event)}
    />
  );
};

Gender.propTypes = {
  gender: PropTypes.string.isRequired,
  genderError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Gender;
