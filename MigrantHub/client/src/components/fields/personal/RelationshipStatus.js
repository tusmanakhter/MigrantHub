import React from 'react';
import PropTypes from 'prop-types';
import { relationshipStatuses } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const RelationshipStatus = (props) => {
  const {
    relationshipStatus, relationshipStatusError, handleChange,
  } = props;

  return (
    <Dropdown
      name="relationshipStatus"
      label={<FormattedMessage id="personal.relationship" />}
      value={relationshipStatus}
      error={relationshipStatusError}
      options={relationshipStatuses}
      handleChange={event => handleChange(event)}
    />
  );
};

RelationshipStatus.propTypes = {
  relationshipStatus: PropTypes.string.isRequired,
  relationshipStatusError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RelationshipStatus;
