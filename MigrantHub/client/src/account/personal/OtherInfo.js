import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Autosuggest from 'react-autosuggest';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { cities } from 'canada';
import deburr from 'lodash/deburr';
import validator from 'validator';

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' },
];

const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : cities.filter((city) => {
    const keep = count < 5 && (`${city[0]}, ${city[1]}`).slice(0, inputLength).toLowerCase() === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

const getSuggestionValue = suggestion => (`${suggestion[0]}, ${suggestion[1]}`);

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match((`${suggestion[0]}, ${suggestion[1]}`), query);
  const parts = parse((`${suggestion[0]}, ${suggestion[1]}`), matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
};

const renderInputComponent = (inputProps) => {
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

const styles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  select: {
    textAlign: 'left',
  },
});
class OtherInfo extends Component {
  state = {
    suggestions: [],
    settlingLocationError: '',
    settlingDurationError: '',
    joiningReasonError: '',
  }

  validate = () => {
    const { settlingLocation, settlingDuration, joiningReason } = this.props;
    let isError = false;
    const errors = {
      settlingLocationError: '',
      settlingDurationError: '',
      joiningReasonError: '',
    };

    if (validator.isEmpty(settlingLocation)) {
      errors.settlingLocationError = 'Settling location is required';
      isError = true;
    }

    if (validator.isEmpty(settlingDuration)) {
      errors.settlingDurationError = 'Settling duration is required';
      isError = true;
    }

    if (validator.isEmpty(joiningReason)) {
      errors.joiningReasonError = 'Joining reason is required';
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {
      classes, handleChange, handleAutoSuggestChange, settlingLocation, settlingDuration,
      joiningReason,
    } = this.props;
    const {
      suggestions, settlingLocationError, settlingDurationError, joiningReasonError,
    } = this.state;
    const autosuggestProps = {
      renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
              Other Information
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Autosuggest
              {...autosuggestProps}
              inputProps={{
                classes,
                label: 'Settling Location',
                value: settlingLocation,
                onChange: handleAutoSuggestChange('settlingLocation'),
                helperText: settlingLocationError,
                error: settlingLocationError.length > 0,
              }}
              theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
              }}
              renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                  {options.children}
                </Paper>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="settlingDuration"
              name="settlingDuration"
              label="Settling Duration"
              value={settlingDuration}
              onChange={event => handleChange(event)}
              fullWidth
              type="number"
              helperText={settlingDurationError}
              error={settlingDurationError.length > 0}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="joiningReason"
              name="joiningReason"
              select
              label="Reason for joining"
              value={joiningReason}
              onChange={event => handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={joiningReasonError}
              error={joiningReasonError.length > 0}
            >
              {joiningReasons.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

OtherInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  settlingLocation: PropTypes.string.isRequired,
  settlingDuration: PropTypes.string.isRequired,
  joiningReason: PropTypes.string.isRequired,
};

export default withStyles(styles)(OtherInfo);
