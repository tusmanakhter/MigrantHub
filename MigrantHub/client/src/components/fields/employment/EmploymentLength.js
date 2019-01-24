import React from 'react';
import PropTypes from 'prop-types';
import Years from 'components/fields/generic/Years';
import { FormattedMessage } from 'react-intl';

const EmploymentLength = (props) => {
  const { years, yearsError, handleChange } = props;
  return (
    <Years
      name="years"
      label={<FormattedMessage id="employment.length" />}
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
