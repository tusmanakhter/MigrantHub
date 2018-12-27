import React from 'react';
import PropTypes from 'prop-types';
import { languageLevels } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const WritingLevel = (props) => {
  const {
    writingLevel, writingLevelError, handleChange,
  } = props;
  return (
    <Dropdown
      name="writingLevel"
      label="Writing Level"
      value={writingLevel}
      error={writingLevelError}
      options={languageLevels}
      handleChange={event => handleChange(event)}
    />
  );
};

WritingLevel.propTypes = {
  writingLevel: PropTypes.string.isRequired,
  writingLevelError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default WritingLevel;
