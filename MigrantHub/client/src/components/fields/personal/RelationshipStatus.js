import React from 'react';
import PropTypes from 'prop-types';
import { relationshipStatuses } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const RelationshipStatus = (props) => {
  const {
    relationshipStatus, relationshipStatusError, handleChange,
  } = props;

  return (
    <Dropdown
      name="relationshipStatus"
      label="Relationship Status"
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
