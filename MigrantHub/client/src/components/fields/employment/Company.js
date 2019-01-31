import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const Company = (props) => {
  const { company, companyError, handleChange } = props;
  return (
    <TextBox
      name="company"
      label={<FormattedMessage id="employment.company" />}
      placeholder=""
      value={company}
      error={companyError}
      handleChange={handleChange}
    />
  );
};

Company.propTypes = {
  company: PropTypes.string.isRequired,
  companyError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Company;
