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

const WritingLevel = (props) => {
  const {
    classes, writingLevel, writingLevelError, handleChange,
  } = props;
  return (
    <TextField
      id="writingLevel"
      name="writingLevel"
      select
      label="Writing Level"
      value={writingLevel}
      onChange={event => handleChange(event)}
      fullWidth
      className={classes.select}
      helperText={writingLevelError}
      error={writingLevelError.length > 0}
    >
      {languageLevels.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

WritingLevel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  writingLevel: PropTypes.string.isRequired,
  writingLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(WritingLevel);
