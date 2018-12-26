import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { relations } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const Relation = (props) => {
  const {
    classes, relation, relationError, handleChange,
  } = props;
  return (
    <TextField
      id="relation"
      name="relation"
      select
      label="Relation to you"
      value={relation}
      onChange={event => handleChange(event)}
      className={classes.select}
      helperText={relationError}
      error={relationError.length > 0}
      fullWidth
    >
      {relations.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

Relation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  relation: PropTypes.string.isRequired,
  relationError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Relation);
