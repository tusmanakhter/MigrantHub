import React from 'react';
import TextField from '@material-ui/core/TextField';

export function handleAutoSuggestChange(name) {
  return (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };
}

export function handleEditObjectAutosuggest(name, fieldName, index) {
  return (event, { newValue }) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [fieldName]: newValue };
      }),
    });
  };
}

export const renderInputComponent = (inputProps) => {
  const {
    classes, inputRef = () => {}, ref, ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
};