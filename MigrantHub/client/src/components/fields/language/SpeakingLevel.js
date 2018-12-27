import React from 'react';
import PropTypes from 'prop-types';
import { languageLevels } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const SpeakingLevel = (props) => {
  const {
    speakingLevel, speakingLevelError, handleChange,
  } = props;
  return (
    <Dropdown
      name="speakingLevel"
      label="Speaking Level"
      value={speakingLevel}
      error={speakingLevelError}
      options={languageLevels}
      handleChange={event => handleChange(event)}
    />
  );
};

SpeakingLevel.propTypes = {
  speakingLevel: PropTypes.string.isRequired,
  speakingLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SpeakingLevel;
