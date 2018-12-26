import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { educationLevels } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const EducationLevel = (props) => {
  const {
    classes, educationLevel, educationLevelError, handleChange,
  } = props;
  return (
    <TextField
      name="educationLevel"
      select
      label="Education Level"
      value={educationLevel}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={educationLevelError}
      error={educationLevelError.length > 0}
    >
      {educationLevels.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

EducationLevel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  educationLevel: PropTypes.string.isRequired,
  educationLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(EducationLevel);
