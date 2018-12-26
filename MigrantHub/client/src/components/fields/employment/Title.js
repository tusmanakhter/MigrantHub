import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Title = (props) => {
  const { title, titleError, handleChange } = props;
  return (
    <TextField
      id="title"
      name="title"
      label="Title"
      value={title}
      onChange={handleChange}
      helperText={titleError}
      error={titleError.length > 0}
      fullWidth
    />
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleError: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
