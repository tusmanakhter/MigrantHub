import React from 'react';
import FormComponent from './FormComponent'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {languages} from 'country-data'
import deburr from 'lodash/deburr';

const languageLevels = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
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
  },
  row: {
    display: 'inline-block'
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class LanguageInfo extends FormComponent {
  state = {
    languages: [],
    writingLevel: '',
    speakingLevel: '',
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

  handleAddLanguage = () => {
    this.setState({
      languages: this.state.languages.concat([{ name: '', writingLevel: '', speakingLevel: '' }]),
    });
  }

  handleRemoveLanguage = (index) => {
    this.setState({
      languages: this.state.languages.filter((s, _index) => _index !== index),
    });
  }

  handleEditLanguageName = (name, index) => (event, { newValue }) => {
    this.setState({
      languages: this.state.languages.map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [name]: newValue };
      }),
    });
  }

  handleEditLanguageOther = (index) => (event) => {
    this.setState({
      languages: this.state.languages.map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [event.target.name]: event.target.value };
      }),
    });
  }

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
        <Grid item xs={12} sm={4}>
          <TextField
            id="writingLevel"
            name="writingLevel"
            select
            label="Writing Level"
            value={this.state.writingLevel}
            onChange={event => this.handleChange(event)}
            fullWidth
          >
            {languageLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="speakingLevel"
            name="speakingLevel"
            select
            label="Speaking Level"
            value={this.state.speakingLevel}
            onChange={event => this.handleChange(event)}
            fullWidth
          >
            {languageLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add another language
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={this.handleAddLanguage}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
        {this.state.languages.map((language, index) => (
          <React.Fragment key={index}>
          <Grid container spacing={24} item xs={12} sm={11}>
            <Grid item xs={12} sm={4}>
              <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                    classes,
                    value: language.name,
                    label: "Language",
                    onChange: this.handleEditLanguageName('name', index),
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
            <Grid item xs={12} sm={4}>
              <TextField
                id="writingLevel"
                name="writingLevel"
                select
                label="Writing Level"
                value={language.writingLevel}
                onChange={this.handleEditLanguageOther(index)}
                fullWidth
              >
                {languageLevels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="speakingLevel"
                name="speakingLevel"
                select
                label="Speaking Level"
                value={language.speakingLevel}
                onChange={this.handleEditLanguageOther(index)}
                fullWidth
              >
                {languageLevels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button variant="fab" mini aria-label="Delete" 
                  onClick={(event) => this.handleRemoveLanguage(index, event)}
                  className={classes.button}>
            <DeleteIcon />
          </Button>
          </Grid>
          </React.Fragment>
          ))} 
      </Grid>
      </React.Fragment>
    );
  }
}

LanguageInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageInfo);
