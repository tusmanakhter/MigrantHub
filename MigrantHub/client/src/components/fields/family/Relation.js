import React from 'react';
import PropTypes from 'prop-types';
import { relations } from 'lib/SignUpConstants';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const Relation = (props) => {
  const {
    relation, relationError, handleChange,
  } = props;
  return (
    <Dropdown
      name="relation"
      label={<FormattedMessage id="family.relation" />}
      value={relation}
      error={relationError}
      options={relations}
      handleChange={event => handleChange(event)}
    />
  );
};

Relation.propTypes = {
  relation: PropTypes.string.isRequired,
  relationError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Relation;
