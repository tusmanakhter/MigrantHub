import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const LastName = (props) => {
  const { lastName, lastNameError, handleChange } = props;
  return (
    <TextField
      id="lastName"
      name="lastName"
      label="Last Name"
      value={lastName}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={lastNameError}
      error={lastNameError.length > 0}
    />
  );
};

LastName.propTypes = {
  lastName: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default LastName;
