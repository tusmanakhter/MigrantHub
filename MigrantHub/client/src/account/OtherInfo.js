import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {cities} from 'canada'
import deburr from 'lodash/deburr';

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' }
]

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : cities.filter(city => {
    const keep = count < 5 && (city[0] + ", " + city[1]).slice(0, inputLength).toLowerCase() === inputValue;
    
    if (keep) {
      count++;
    }

    return keep;
  });
};

const getSuggestionValue = suggestion => (suggestion[0] + ", " + suggestion[1]);

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match((suggestion[0] + ", " + suggestion[1]), query);
  const parts = parse((suggestion[0] + ", " + suggestion[1]), matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
};

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
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
    display: 'inline-block'
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class OtherInfo extends Component {
  state = {
    suggestions: []
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;
    
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    const handleChange = this.props.handleChange;
    const handleAutoSuggestChange = this.props.handleAutoSuggestChange;
    const settlingLocation = this.props.settlingLocation;
    const settlingDuration = this.props.settlingDuration;
    const joiningReason = this.props.joiningReason;

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
            onChange={ event => handleChange(event)}
            fullWidth
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
            margin="normal"
            helperText="Please select a joining reason"
            fullWidth
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OtherInfo);
