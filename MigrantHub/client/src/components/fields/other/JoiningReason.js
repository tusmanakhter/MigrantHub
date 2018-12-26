import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { joiningReasons } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const JoiningReason = (props) => {
  const {
    classes, joiningReason, joiningReasonError, handleChange,
  } = props;

  return (
    <TextField
      id="joiningReason"
      name="joiningReason"
      select
      label="Reason for joining"
      value={joiningReason}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={joiningReasonError}
      error={joiningReasonError.length > 0}
    >
      {joiningReasons.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

JoiningReason.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  joiningReason: PropTypes.string.isRequired,
  joiningReasonError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(JoiningReason);
