import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dropdown from 'components/fields/generic/Dropdown';
import { countries } from 'lib/SignUpConstants';

const Nationality = (props) => {
  const {
    nationality, nationalityError, handleChange,
  } = props;
  return (
    <Dropdown
      name="nationality"
      label={<FormattedMessage id="personal.nationality" />}
      value={nationality}
      error={nationalityError}
      options={countries}
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
