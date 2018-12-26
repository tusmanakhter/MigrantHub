import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';

const Age = (props) => {
  const { age, ageError, handleChange } = props;
  return (
    <TextField
      id="age"
      name="age"
      label="Age"
      value={age}
      type="number"
      onChange={event => handleChange(event)}
      fullWidth
      helperText={ageError}
      error={ageError.length > 0}
      InputProps={{
        endAdornment: <InputAdornment position="end">years</InputAdornment>,
      }}
    />
  );
};

Age.propTypes = {
  age: PropTypes.string.isRequired,
  ageError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Age;
