import React from 'react';
import PropTypes from 'prop-types';
import TextBox from './generic/TextBox';

const Other = (props) => {
  const { other, otherError, handleChange } = props;
  return (
    <TextBox
      name="other"
      label="Other"
      placeholder=""
      value={other}
      error={otherError}
      handleChange={event => handleChange(event)}
    />
  );
};

Other.propTypes = {
  other: PropTypes.string.isRequired,
  otherError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Other;
