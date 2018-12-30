import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TextBox = (props) => {
  const {
    name, label, value, error, placeholder, handleChange,
  } = props;
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      helperText={error}
      error={error.length > 0}
    />
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextBox;
