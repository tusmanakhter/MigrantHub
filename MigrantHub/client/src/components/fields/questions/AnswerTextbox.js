import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const AnswerTextbox = (props) => {
  const { answer, answerError, handleChange } = props;
  return (
    <TextBox
      name="answer"
      label="Answer"
      placeholder=""
      value={answer}
      error={answerError}
      handleChange={event => handleChange(event)}
    />
  );
};

AnswerTextbox.propTypes = {
  answer: PropTypes.string.isRequired,
  answerError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AnswerTextbox;
