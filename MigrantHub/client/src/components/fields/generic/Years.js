import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const Years = (props) => {
  const {
    name, label, value, error, handleChange,
  } = props;
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      helperText={error}
      error={error.length > 0}
      fullWidth
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
      }}
    />
  );
};

Years.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Years;
