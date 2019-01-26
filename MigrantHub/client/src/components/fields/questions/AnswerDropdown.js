import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/fields/generic/Dropdown';
import { FormattedMessage } from 'react-intl';

const AnswerDropdown = (props) => {
  const {
    answers, answer, answerError, handleChange,
  } = props;

  return (
    <Dropdown
      name="answer"
      label={<FormattedMessage id="answer" />}
      value={answer}
      error={answerError}
      options={answers}
      handleChange={event => handleChange(event)}
    />
  );
};

AnswerDropdown.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  answer: PropTypes.string.isRequired,
  answerError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AnswerDropdown;
