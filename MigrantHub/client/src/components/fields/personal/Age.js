import React from 'react';
import PropTypes from 'prop-types';
import Years from 'components/fields/generic/Years';
import { FormattedMessage } from 'react-intl';

const Age = (props) => {
  const { age, ageError, handleChange } = props;
  return (
    <Years
      name="age"
      label={<FormattedMessage id="personal.age" />}
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
