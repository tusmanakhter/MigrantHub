import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const SettlingDuration = (props) => {
  const { settlingDuration, settlingDurationError, handleChange } = props;
  return (
    <TextField
      id="settlingDuration"
      name="settlingDuration"
      label="Settling Duration"
      value={settlingDuration}
      onChange={event => handleChange(event)}
      fullWidth
      type="number"
      helperText={settlingDurationError}
      error={settlingDurationError.length > 0}
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
      }}
    />
  );
};

SettlingDuration.propTypes = {
  settlingDuration: PropTypes.string.isRequired,
  settlingDurationError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SettlingDuration;
