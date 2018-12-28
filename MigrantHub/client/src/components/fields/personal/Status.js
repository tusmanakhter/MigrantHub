import React from 'react';
import PropTypes from 'prop-types';
import { statuses } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const Status = (props) => {
  const {
    status, statusError, handleChange,
  } = props;

  return (
    <Dropdown
      name="status"
      label="Status"
      value={status}
      error={statusError}
      options={statuses}
      handleChange={event => handleChange(event)}
    />
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
  statusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Status;
