import React from 'react';
import PropTypes from 'prop-types';
import Years from '../generic/Years';

const Age = (props) => {
  const { age, ageError, handleChange } = props;
  return (
    <Years
      name="age"
      label="Age"
      value={age}
      error={ageError}
      handleChange={event => handleChange(event)}
    />
  );
};

Age.propTypes = {
  age: PropTypes.string.isRequired,
  ageError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Age;
