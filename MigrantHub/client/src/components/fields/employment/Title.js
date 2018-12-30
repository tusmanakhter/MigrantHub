import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../generic/TextBox';

const Title = (props) => {
  const { title, titleError, handleChange } = props;
  return (
    <TextBox
      name="title"
      label="Title"
      placeholder=""
      value={title}
      error={titleError}
      handleChange={handleChange}
    />
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
