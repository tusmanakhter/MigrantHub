import React from 'react';
import PropTypes from 'prop-types';
import { positionTypes } from 'lib/JobConstants';
import Dropdown from 'components/fields/generic/Dropdown';

const PositionType = (props) => {
  const {
    positionType, positionTypeError, handleChange,
  } = props;
  return (
    <Dropdown
      name="positionType"
      label="Position Type"
      value={positionType}
      error={positionTypeError}
      options={positionTypes}
      handleChange={event => handleChange(event)}
    />
  );
};

PositionType.propTypes = {
  positionType: PropTypes.string.isRequired,
  positionTypeError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PositionType;
