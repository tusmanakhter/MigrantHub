import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { jobStatuses } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const JobStatus = (props) => {
  const {
    classes, jobStatus, jobStatusError, handleChange,
  } = props;
  return (
    <TextField
      name="jobStatus"
      select
      label="Job Status"
      value={jobStatus}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={jobStatusError}
      error={jobStatusError.length > 0}
    >
      {jobStatuses.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

JobStatus.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  jobStatus: PropTypes.string.isRequired,
  jobStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(JobStatus);
