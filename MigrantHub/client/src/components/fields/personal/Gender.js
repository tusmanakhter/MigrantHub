import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { genders } from '../../../lib/SignUpConstants';

const styles = ({
  group: {
    flexDirection: 'row',
  },
});

const Gender = (props) => {
  const {
    classes, gender, genderError, handleChange,
  } = props;

  return (
    <FormControl component="fieldset" fullWidth className={classes.formControl}>
      <FormLabel component="legend" error={genderError.length > 0}>Gender</FormLabel>
      <RadioGroup
        aria-label="Gender"
        id="gender"
        name="gender"
        className={classes.group}
        value={gender}
        onChange={event => handleChange(event)}
      >
        {genders.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
            {option.label}
          </FormControlLabel>
        ))}
      </RadioGroup>
      <FormHelperText
        error={genderError.length > 0}
      >
        {genderError}
      </FormHelperText>
    </FormControl>
  );
};

Gender.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  gender: PropTypes.string.isRequired,
  genderError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Gender);
