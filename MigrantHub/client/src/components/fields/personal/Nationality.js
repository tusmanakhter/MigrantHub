import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dropdown from 'components/fields/generic/Dropdown';
import { countries } from 'lib/SignUpConstants';

const Nationality = (props) => {
  const {
    nationality, nationalityError, variant, margin, inputClass, handleChange,
  } = props;
  return (
    <Dropdown
      name="nationality"
      label={<FormattedMessage id="personal.nationality" />}
      value={nationality}
      error={nationalityError}
      options={countries}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Nationality.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Nationality.propTypes = {
  nationality: PropTypes.string.isRequired,
  nationalityError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default Nationality;
