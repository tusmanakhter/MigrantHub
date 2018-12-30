import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const MaskedTextbox = (props) => {
  const {
    name, label, value, error, placeholder, mask, handleChange,
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
      InputProps={{
        inputComponent: mask,
      }}
    />
  );
};

MaskedTextbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  mask: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MaskedTextbox;
