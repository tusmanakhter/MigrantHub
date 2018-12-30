import React from 'react';
import PropTypes from 'prop-types';
import { lookingForJobOptions } from '../../../lib/SignUpConstants';
import RadioOption from '../generic/RadioOption';

const LookingForJob = (props) => {
  const {
    lookingForJob, lookingForJobError, handleChange,
  } = props;

  return (
    <RadioOption
      name="lookingForJob"
      label="Looking for a job?"
      value={lookingForJob}
      error={lookingForJobError}
      options={lookingForJobOptions}
      handleChange={event => handleChange(event)}
    />
  );
};

LookingForJob.propTypes = {
  lookingForJob: PropTypes.string.isRequired,
  lookingForJobError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default LookingForJob;
