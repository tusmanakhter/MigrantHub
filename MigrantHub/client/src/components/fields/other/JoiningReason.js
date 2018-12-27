import React from 'react';
import PropTypes from 'prop-types';
import { joiningReasons } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const JoiningReason = (props) => {
  const {
    joiningReason, joiningReasonError, handleChange,
  } = props;

  return (
    <Dropdown
      name="joiningReason"
      label="Reason for joining"
      value={joiningReason}
      error={joiningReasonError}
      options={joiningReasons}
      handleChange={event => handleChange(event)}
    />
  );
};

JoiningReason.propTypes = {
  joiningReason: PropTypes.string.isRequired,
  joiningReasonError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default JoiningReason;
