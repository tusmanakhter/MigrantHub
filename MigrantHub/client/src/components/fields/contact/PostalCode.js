import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { PostalCodeMask } from '../../../lib/Masks';

const PostalCode = (props) => {
  const { postalCode, postalCodeError, handleChange } = props;
  return (
    <TextField
      id="postalCode"
      name="postalCode"
      label="Postal Code"
      value={postalCode}
      onChange={event => handleChange(event)}
      fullWidth
      InputProps={{
        inputComponent: PostalCodeMask,
      }}
      helperText={postalCodeError}
      error={postalCodeError.length > 0}
    />
  );
};

PostalCode.propTypes = {
  postalCode: PropTypes.string.isRequired,
  postalCodeError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PostalCode;
