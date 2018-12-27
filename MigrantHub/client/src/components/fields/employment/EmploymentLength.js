import React from 'react';
import PropTypes from 'prop-types';
import Years from '../generic/Years';

const EmploymentLength = (props) => {
  const { years, yearsError, handleChange } = props;
  return (
    <Years
      name="years"
      label="Employment length"
      value={years}
      error={yearsError}
      handleChange={handleChange}
    />
  );
};

EmploymentLength.propTypes = {
  years: PropTypes.string.isRequired,
  yearsError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EmploymentLength;
