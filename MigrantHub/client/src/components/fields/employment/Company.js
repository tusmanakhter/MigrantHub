import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Company = (props) => {
  const { company, companyError, handleChange } = props;
  return (
    <TextField
      id="company"
      name="company"
      label="Company"
      value={company}
      onChange={handleChange}
      helperText={companyError}
      error={companyError.length > 0}
      fullWidth
    />
  );
};

Company.propTypes = {
  company: PropTypes.string.isRequired,
  companyError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Company;
