import React from 'react';
import PropTypes from 'prop-types';
import { joiningReasons } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const JoiningReason = (props) => {
  const {
    joiningReason, joiningReasonError, handleChange,
    variant, margin, inputClass,
  } = props;

  return (
    <Dropdown
      name="joiningReason"
      label={<FormattedMessage id="other.reason" />}
      value={joiningReason}
      error={joiningReasonError}
      options={joiningReasons}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

JoiningReason.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

JoiningReason.propTypes = {
  joiningReason: PropTypes.string.isRequired,
  joiningReasonError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default JoiningReason;
