import React from 'react';
import PropTypes from 'prop-types';
import { genders } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const Gender = (props) => {
  const {
    gender, genderError, handleChange,
    variant, margin, inputClass,
  } = props;

  return (
    <Dropdown
      name="gender"
      label={<FormattedMessage id="personal.gender" />}
      value={gender}
      error={genderError}
      options={genders}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Gender.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Gender.propTypes = {
  gender: PropTypes.string.isRequired,
  genderError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default Gender;
