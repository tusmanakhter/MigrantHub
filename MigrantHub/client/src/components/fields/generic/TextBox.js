import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  textbox: {
    height: 24,
    padding: 11,
  },
};

const TextBox = (props) => {
  const {
    name, label, value, error, placeholder, endAdornment,
    type, handleChange, classes,
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
      variant="outlined"
      type={type}
      InputProps={{
        endAdornment,
        classes: {
          input: classes.textbox,
        },
      }}
      InputLabelProps={{
        margin: 'dense',
      }}
    />
  );
};

TextBox.defaultProps = {
  type: '',
  placeholder: '',
  endAdornment: null,
};

TextBox.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  endAdornment: PropTypes.node,
};

export default withStyles(styles)(TextBox);
