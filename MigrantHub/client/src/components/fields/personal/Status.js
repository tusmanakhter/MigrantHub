import React from 'react';
import PropTypes from 'prop-types';
import { statuses } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const Status = (props) => {
  const {
    status, statusError, handleChange, variant, margin, inputClass,
  } = props;

  return (
    <Dropdown
      name="status"
      label={<FormattedMessage id="personal.status" />}
      value={status}
      error={statusError}
      options={statuses}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Status.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
  statusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default Status;
