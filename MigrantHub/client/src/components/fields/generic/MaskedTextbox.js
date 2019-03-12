import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const MaskedTextbox = (props) => {
  const {
    name, label, value, error, placeholder, mask, handleChange,
    variant, margin, inputClass,
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
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

MaskedTextbox.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

MaskedTextbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  mask: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default MaskedTextbox;
