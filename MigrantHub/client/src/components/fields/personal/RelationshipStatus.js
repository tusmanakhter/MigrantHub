import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { relationshipStatuses } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const RelationshipStatus = (props) => {
  const {
    classes, relationshipStatus, relationshipStatusError, handleChange,
  } = props;

  return (
    <TextField
      id="relationshipStatus"
      name="relationshipStatus"
      select
      label="Relationship Status"
      value={relationshipStatus}
      onChange={event => handleChange(event)}
      className={classes.select}
      fullWidth
      helperText={relationshipStatusError}
      error={relationshipStatusError.length > 0}
    >
      {relationshipStatuses.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

RelationshipStatus.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  relationshipStatus: PropTypes.string.isRequired,
  relationshipStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(RelationshipStatus);
