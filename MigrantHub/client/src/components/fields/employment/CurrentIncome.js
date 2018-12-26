import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { IncomeMask } from '../../../lib/Masks';

const CurrentIncome = (props) => {
  const { currentIncome, currentIncomeError, handleChange } = props;
  return (
    <TextField
      name="currentIncome"
      label="Current Income (Optional)"
      value={currentIncome}
      onChange={event => handleChange(event)}
      fullWidth
      helperText={currentIncomeError}
      error={currentIncomeError.length > 0}
      InputProps={{
        inputComponent: IncomeMask,
      }}
    />
  );
};

CurrentIncome.propTypes = {
  currentIncome: PropTypes.string.isRequired,
  currentIncomeError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CurrentIncome;
