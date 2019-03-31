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

const MaskedTextbox = (props) => {
  const {
    name, label, value, error, placeholder, mask, handleChange,
    classes,
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
      InputProps={{
        classes: {
          input: classes.textbox,
        },
        inputComponent: mask,
      }}
      InputLabelProps={{
        margin: 'dense',
      }}
    />
  );
};

MaskedTextbox.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  mask: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(MaskedTextbox);
