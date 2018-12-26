import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { provinces } from '../../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});

const Province = (props) => {
  const {
    classes, province, provinceError, handleChange,
  } = props;

  return (
    <TextField
      id="province"
      name="province"
      select
      label="Province/Territory"
      value={province}
      className={classes.select}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={provinceError}
      error={provinceError.length > 0}
    >
      {provinces.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

Province.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  province: PropTypes.string.isRequired,
  provinceError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Province);
