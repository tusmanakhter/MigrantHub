import React from 'react';
import PropTypes from 'prop-types';
import { educationLevels } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const EducationLevel = (props) => {
  const {
    educationLevel, educationLevelError, handleChange,
    variant, margin, inputClass,
  } = props;
  return (
    <Dropdown
      name="educationLevel"
      label={<FormattedMessage id="educ.level" />}
      value={educationLevel}
      error={educationLevelError}
      options={educationLevels}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

EducationLevel.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

EducationLevel.propTypes = {
  educationLevel: PropTypes.string.isRequired,
  educationLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default EducationLevel;
