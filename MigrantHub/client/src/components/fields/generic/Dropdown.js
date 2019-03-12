import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const Dropdown = (props) => {
  const {
    classes, name, label, value, error, options, handleChange,
    variant, inputClass, endAdornment, margin,
  } = props;
  return (
    <TextField
      name={name}
      select
      label={label}
      value={value}
      onChange={handleChange}
      className={classes.select}
      fullWidth
      helperText={error}
      error={error.length > 0}
      variant={variant}
      InputProps={{
        endAdornment,
        classes: {
          input: inputClass,
        },
      }}
      InputLabelProps={{
        margin,
      }}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

Dropdown.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: null,
  endAdornment: null,
};

Dropdown.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
  endAdornment: PropTypes.node,
};

export default withStyles(styles)(Dropdown);
