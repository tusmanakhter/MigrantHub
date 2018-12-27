import React from 'react';
import PropTypes from 'prop-types';
import { jobStatuses } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const JobStatus = (props) => {
  const {
    jobStatus, jobStatusError, handleChange,
  } = props;
  return (
    <Dropdown
      name="jobStatus"
      label="Job Status"
      value={jobStatus}
      error={jobStatusError}
      options={jobStatuses}
      handleChange={event => handleChange(event)}
    />
  );
};

JobStatus.propTypes = {
  jobStatus: PropTypes.string.isRequired,
  jobStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default JobStatus;
