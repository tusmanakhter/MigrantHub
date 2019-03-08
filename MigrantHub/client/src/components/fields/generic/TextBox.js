import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TextBox = (props) => {
  const {
    name, label, value, error, placeholder,
    variant, type, inputClass, margin, handleChange,

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
      variant={variant}
      type={type}
      InputProps={{
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

TextBox.defaultProps = {
  variant: 'standard',
  type: '',
  placeholder: '',
  inputClass: '',
  margin: '',
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default TextBox;
