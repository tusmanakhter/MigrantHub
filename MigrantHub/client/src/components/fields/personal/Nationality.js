import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const Nationality = (props) => {
  const { nationality, nationalityError, handleChange } = props;
  return (
    <TextBox
      name="nationality"
      label={<FormattedMessage id="personal.nationality" />}
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
