import React from 'react';
import PropTypes from 'prop-types';
import { educationLevels } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const EducationLevel = (props) => {
  const {
    educationLevel, educationLevelError, handleChange,
  } = props;
  return (
    <Dropdown
      name="educationLevel"
      label="Education Level"
      value={educationLevel}
      error={educationLevelError}
      options={educationLevels}
      handleChange={event => handleChange(event)}
    />
  );
};

EducationLevel.propTypes = {
  educationLevel: PropTypes.string.isRequired,
  educationLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EducationLevel;
