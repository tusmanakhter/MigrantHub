import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { languageLevels } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const SpeakingLevel = (props) => {
  const {
    classes, speakingLevel, speakingLevelError, handleChange,
  } = props;
  return (
    <TextField
      id="speakingLevel"
      name="speakingLevel"
      select
      label="Speaking Level"
      value={speakingLevel}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={speakingLevelError}
      error={speakingLevelError.length > 0}
    >
      {languageLevels.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

SpeakingLevel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  speakingLevel: PropTypes.string.isRequired,
  speakingLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SpeakingLevel);
