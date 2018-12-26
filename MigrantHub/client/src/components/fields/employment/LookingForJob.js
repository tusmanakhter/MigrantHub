import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { lookingForJobOptions } from '../../../lib/SignUpConstants';

const styles = ({
  formControl: {
    textAlign: 'left',
  },
  group: {
    flexDirection: 'row',
  },
});

const LookingForJob = (props) => {
  const {
    classes, lookingForJob, lookingForJobError, handleChange,
  } = props;

  return (
    <FormControl component="fieldset" fullWidth className={classes.formControl}>
      <FormLabel component="legend" error={lookingForJobError.length > 0}>Looking for a job?</FormLabel>
      <RadioGroup
        aria-label="Looking for a job?"
        id="lookingForJob"
        name="lookingForJob"
        className={classes.group}
        value={lookingForJob}
        onChange={event => handleChange(event)}
      >
        {lookingForJobOptions.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
            {option.label}
          </FormControlLabel>
        ))}
      </RadioGroup>
      <FormHelperText
        error={lookingForJobError.length > 0}
      >
        {lookingForJobError}
      </FormHelperText>
    </FormControl>
  );
};

LookingForJob.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  lookingForJob: PropTypes.string.isRequired,
  lookingForJobError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(LookingForJob);
