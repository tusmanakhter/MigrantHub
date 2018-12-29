import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../generic/Dropdown';

const AnswerDropdown = (props) => {
  const {
    answers, answer, answerError, handleChange,
  } = props;

  return (
    <Dropdown
      name="answer"
      label="Answer"
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
