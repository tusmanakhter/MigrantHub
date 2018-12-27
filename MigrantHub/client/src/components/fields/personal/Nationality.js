import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const Nationality = (props) => {
  const { nationality, nationalityError, handleChange } = props;
  return (
    <TextBox
      name="nationality"
      label="Nationality"
      placeholder=""
      value={nationality}
      error={nationalityError}
      handleChange={event => handleChange(event)}
    />
  );
};

Nationality.propTypes = {
  nationality: PropTypes.string.isRequired,
  nationalityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Nationality;
