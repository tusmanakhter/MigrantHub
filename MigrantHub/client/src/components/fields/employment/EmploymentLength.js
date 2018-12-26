import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const EmploymentLength = (props) => {
  const { years, yearsError, handleChange } = props;
  return (
    <TextField
      id="years"
      name="years"
      label="Employment length"
      value={years}
      onChange={handleChange}
      helperText={yearsError}
      error={yearsError.length > 0}
      fullWidth
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
      }}
    />
  );
};

EmploymentLength.propTypes = {
  years: PropTypes.string.isRequired,
  yearsError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EmploymentLength;
