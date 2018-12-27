import React from 'react';
import PropTypes from 'prop-types';
import { genders } from '../../../lib/SignUpConstants';
import RadioOption from '../generic/RadioOption';

const Gender = (props) => {
  const {
    gender, genderError, handleChange,
  } = props;

  return (
    <RadioOption
      name="gender"
      label="Gender"
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
