import React from 'react';
import PropTypes from 'prop-types';
import { lookingForJobOptions } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const LookingForJob = (props) => {
  const {
    lookingForJob, lookingForJobError, handleChange,
  } = props;

  return (
    <Dropdown
      name="lookingForJob"
      label={<FormattedMessage id="employment.looking" />}
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
