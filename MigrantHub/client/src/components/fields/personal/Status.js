import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { statuses } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const Status = (props) => {
  const {
    classes, status, statusError, handleChange,
  } = props;

  return (
    <TextField
      id="status"
      name="status"
      select
      label="Status"
      value={status}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={statusError}
      error={statusError.length > 0}
    >
      {statuses.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

Status.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  status: PropTypes.string.isRequired,
  statusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Status);
