import React from 'react';
import PropTypes from 'prop-types';
import Years from '../generic/Years';

const SettlingDuration = (props) => {
  const { settlingDuration, settlingDurationError, handleChange } = props;
  return (
    <Years
      name="settlingDuration"
      label="Settling Duration"
      value={settlingDuration}
      error={settlingDurationError}
      handleChange={event => handleChange(event)}
    />
  );
};

SettlingDuration.propTypes = {
  settlingDuration: PropTypes.string.isRequired,
  settlingDurationError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SettlingDuration;
