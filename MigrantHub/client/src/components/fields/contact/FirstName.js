import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const FirstName = (props) => {
  const { firstName, firstNameError, handleChange } = props;
  return (
    <TextField
      id="firstName"
      name="firstName"
      label="First Name"
      value={firstName}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={firstNameError}
      error={firstNameError.length > 0}
    />
  );
};

FirstName.propTypes = {
  firstName: PropTypes.string.isRequired,
  firstNameError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FirstName;
