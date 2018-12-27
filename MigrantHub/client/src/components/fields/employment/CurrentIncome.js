import React from 'react';
import PropTypes from 'prop-types';
import { IncomeMask } from '../../../lib/Masks';
import MaskedTextbox from '../generic/MaskedTextbox';

const CurrentIncome = (props) => {
  const { currentIncome, currentIncomeError, handleChange } = props;
  return (
    <MaskedTextbox
      name="currentIncome"
      label="Current Income (Optional)"
      placeholder=""
      value={currentIncome}
      error={currentIncomeError}
      mask={IncomeMask}
      handleChange={event => handleChange(event)}
    />
  );
};

CurrentIncome.propTypes = {
  currentIncome: PropTypes.string.isRequired,
  currentIncomeError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CurrentIncome;
