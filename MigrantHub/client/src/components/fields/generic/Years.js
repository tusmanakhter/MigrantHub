import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  textbox: {
    height: 24,
    padding: 11,
  },
};

const Years = (props) => {
  const {
    name, label, value, error, handleChange, classes,
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
      variant="outlined"
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
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

Years.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Years);
