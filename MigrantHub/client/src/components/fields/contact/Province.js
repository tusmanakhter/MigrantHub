import React from 'react';
import PropTypes from 'prop-types';
import { provinces } from '../../../lib/SignUpConstants';
import Dropdown from '../generic/Dropdown';

const Province = (props) => {
  const {
    province, provinceError, handleChange,
  } = props;

  return (
    <Dropdown
      name="province"
      label="Province/Territory"
      value={province}
      error={provinceError}
      options={provinces}
      handleChange={event => handleChange(event)}
    />
  );
};

Province.propTypes = {
  province: PropTypes.string.isRequired,
  provinceError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Province;
