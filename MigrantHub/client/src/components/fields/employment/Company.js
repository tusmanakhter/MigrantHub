import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const Company = (props) => {
  const { company, companyError, handleChange } = props;
  return (
    <TextBox
      name="company"
      label="Company"
      placeholder=""
      value={company}
      error={companyError}
      handleChange={handleChange}
    />
  );
};

Company.propTypes = {
  company: PropTypes.string.isRequired,
  companyError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Company;
