import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Nationality = (props) => {
  const { nationality, nationalityError, handleChange } = props;
  return (
    <TextField
      id="nationality"
      name="nationality"
      label="Nationality"
      value={nationality}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={nationalityError}
      error={nationalityError.length > 0}
    />
  );
};

Nationality.propTypes = {
  nationality: PropTypes.string.isRequired,
  nationalityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Nationality;
