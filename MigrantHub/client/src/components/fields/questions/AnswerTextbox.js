import React from 'react';
import PropTypes from 'prop-types';
import TextBox from 'components/fields/generic/TextBox';
import { FormattedMessage } from 'react-intl';

const AnswerTextbox = (props) => {
  const { answer, answerError, handleChange } = props;
  return (
    <TextBox
      name="answer"
      label={<FormattedMessage id="answer" />}
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
