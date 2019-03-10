import React from 'react';
import PropTypes from 'prop-types';
import { jobStatuses } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const JobStatus = (props) => {
  const {
    jobStatus, jobStatusError, handleChange,
    variant, margin, inputClass,
  } = props;
  return (
    <Dropdown
      name="jobStatus"
      label={<FormattedMessage id="employment.status" />}
      value={jobStatus}
      error={jobStatusError}
      options={jobStatuses}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

JobStatus.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

JobStatus.propTypes = {
  jobStatus: PropTypes.string.isRequired,
  jobStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default JobStatus;
