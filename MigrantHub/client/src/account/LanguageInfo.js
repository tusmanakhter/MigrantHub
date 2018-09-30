import React from 'react';
import FormComponent from './FormComponent'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {languages} from 'country-data'
import deburr from 'lodash/deburr';

const languageLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const languageComprehension = [
  { value: 'written', label: 'Written' },
  { value: 'spoken', label: 'Spoken' },
  { value: 'both', label: 'Both' },
];

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : languages.all.filter(language => {
    const keep = count < 5 && language.name.slice(0, inputLength).toLowerCase() === inputValue;
    
    if (keep) {
      count++;
    }

    return keep;
  });
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

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
  }
});
class LanguageInfo extends FormComponent {
  state = {
    languages: '',
    motherTongue: '',
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

    return (
      <React.Fragment>
      <Typography variant="title" gutterBottom>
      Language Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              label: 'Mother Tongue',
              value: this.state.motherTongue,
              onChange: this.handleAutoSuggestChange('motherTongue'),
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
      </Grid>
        <TextField 
            name="languages"
            label="Languages"
            value={this.state.languages}
            onChange={ event => this.handleChange(event)}
            margin="normal"
        />
        <TextField 
            name="languagesLevels"
            label="Language Levels"
            value={this.state.languageLevels}
            onChange={ event => this.handleChange(event)}
            margin="normal"
        />
      </React.Fragment>
    );
  }
}

LanguageInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageInfo);
