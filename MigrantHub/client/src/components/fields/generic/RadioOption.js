import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = ({
  formControl: {
    textAlign: 'left',
  },
  group: {
    flexDirection: 'row',
  },
});

const RadioOption = (props) => {
  const {
    classes, name, label, value, error, options, handleChange,
  } = props;
  return (
    <FormControl component="fieldset" fullWidth className={classes.formControl}>
      <FormLabel component="legend" error={error.length > 0}>{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        id={name}
        name={name}
        className={classes.group}
        value={value}
        onChange={handleChange}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          >
            {option.label}
          </FormControlLabel>
        ))}
      </RadioGroup>
      <FormHelperText
        error={error.length > 0}
      >
        {error}
      </FormHelperText>
    </FormControl>
  );
};

RadioOption.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(RadioOption);
