import React from 'react';
import PropTypes from 'prop-types';
import { jobStatuses } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const JobStatus = (props) => {
  const {
    jobStatus, jobStatusError, handleChange,
  } = props;
  return (
    <Dropdown
      name="jobStatus"
      label={<FormattedMessage id="employment.status" />}
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
