import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Other = (props) => {
  const { other, otherError, handleChange } = props;
  return (
    <TextField
      id="other"
      name="other"
      label="Other"
      value={other}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={otherError}
      error={otherError.length > 0}
    />
  );
};

Other.propTypes = {
  other: PropTypes.string.isRequired,
  otherError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Other;
