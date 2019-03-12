import React from 'react';
import PropTypes from 'prop-types';
import { relationshipStatuses } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const RelationshipStatus = (props) => {
  const {
    relationshipStatus, relationshipStatusError, handleChange,
    variant, margin, inputClass,
  } = props;

  return (
    <Dropdown
      name="relationshipStatus"
      label={<FormattedMessage id="personal.relationship" />}
      value={relationshipStatus}
      error={relationshipStatusError}
      options={relationshipStatuses}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

RelationshipStatus.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

RelationshipStatus.propTypes = {
  relationshipStatus: PropTypes.string.isRequired,
  relationshipStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default RelationshipStatus;
