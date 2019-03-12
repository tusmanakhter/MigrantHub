import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const Years = (props) => {
  const {
    name, label, value, error, handleChange,
    variant, margin, inputClass,
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
      variant={variant}
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
        classes: {
          input: inputClass,
        },
      }}
      InputLabelProps={{
        margin,
      }}
    />
  );
};

Years.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: null,
};

Years.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default Years;
