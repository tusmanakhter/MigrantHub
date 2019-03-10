import React from 'react';
import PropTypes from 'prop-types';
import { provinces } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const Province = (props) => {
  const {
    province, provinceError, handleChange,
    variant, margin, inputClass,
  } = props;

  return (
    <Dropdown
      name="province"
      label={<FormattedMessage id="contact.province" />}
      value={province}
      error={provinceError}
      options={provinces}
      handleChange={event => handleChange(event)}
      variant={variant}
      inputClass={inputClass}
      margin={margin}
    />
  );
};

Province.defaultProps = {
  variant: 'standard',
  inputClass: '',
  margin: '',
};

Province.propTypes = {
  province: PropTypes.string.isRequired,
  provinceError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  inputClass: PropTypes.string,
  margin: PropTypes.string,
};

export default Province;
