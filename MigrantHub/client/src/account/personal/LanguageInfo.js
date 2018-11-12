import React, { Component } from 'react';
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
import validator from 'validator';
import { objectErrorText } from '../../helpers/Object';
import { languageLevels, langObject } from '../../lib/SignUpConstants';
import { renderInputComponent } from '../../helpers/Autosuggest';
import { renderSuggestion, getSuggestionValue,
  handleSuggestionsClearRequested, handleSuggestionsFetchRequested } from '../../helpers/AutoSuggestLang';

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
class LanguageInfo extends Component {
  constructor(props) {
    super(props);
    this.objectErrorText = objectErrorText.bind(this);
    this.handleSuggestionsClearRequested = handleSuggestionsClearRequested.bind(this);
    this.handleSuggestionsFetchRequested = handleSuggestionsFetchRequested.bind(this);
  }

  state = {
    langSuggestions: [],
    languagesError: [],
    writingLevelError: '',
    speakingLevelError: '',
    motherTongueError: '',
  }

  validate = () => {
    const {
      languages, writingLevel, speakingLevel, motherTongue,
    } = this.props;
    let isError = false;
    const errors = {
      languagesError: [],
      writingLevelError: '',
      speakingLevelError: '',
      motherTongueError: '',
    };

    if (validator.isEmpty(motherTongue)) {
      errors.motherTongueError = 'Mother tongue is required';
      isError = true;
    } else if (!validator.isAlpha(motherTongue)) {
      errors.motherTongueError = 'Mother tongue is not valid';
      isError = true;
    }

    if (validator.isEmpty(writingLevel)) {
      errors.writingLevelError = 'Writing level is required';
      isError = true;
    }

    if (validator.isEmpty(speakingLevel)) {
      errors.speakingLevelError = 'Speaking level is required';
      isError = true;
    }

    languages.forEach((language, index) => {
      errors.languagesError = errors.languagesError.concat([JSON.parse(
        JSON.stringify(langObject),
      )]);
      if (validator.isEmpty(language.name)) {
        errors.languagesError[index].name = 'Language name is required';
        isError = true;
      } else if (!validator.isAlpha(language.name)) {
        errors.languagesError[index].name = 'Language name is not valid';
        isError = true;
      }
      if (validator.isEmpty(language.writingLevel)) {
        errors.languagesError[index].writingLevel = 'Writing level is required';
        isError = true;
      }

      if (validator.isEmpty(language.speakingLevel)) {
        errors.languagesError[index].speakingLevel = 'Speaking level is required';
        isError = true;
      }
    });

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      classes, handleChange, handleAutoSuggestChange, handleAddObject, handleRemoveObject,
      handleEditObjectAutosuggest, handleEditObject, languages, writingLevel, speakingLevel,
      motherTongue,
    } = this.props;
    const {
      langSuggestions, writingLevelError, speakingLevelError, motherTongueError,
    } = this.state;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: langSuggestions,
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
                value: motherTongue,
                onChange: handleAutoSuggestChange('motherTongue'),
                helperText: motherTongueError,
                error: motherTongueError.length > 0,
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
              value={writingLevel}
              onChange={event => handleChange(event)}
              fullWidth
              className={classes.select}
              helperText={writingLevelError}
              error={writingLevelError.length > 0}
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
              value={speakingLevel}
              onChange={event => handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={speakingLevelError}
              error={speakingLevelError.length > 0}
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
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={event => handleAddObject('languages', langObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {languages.map((language, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={24} item xs={12} sm={11}>
                <Grid item xs={12} sm={4}>
                  <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                      classes,
                      value: language.name,
                      label: 'Language',
                      onChange: handleEditObjectAutosuggest('languages', 'name', index),
                      helperText: this.objectErrorText('languagesError', index, 'name'),
                      error: this.objectErrorText('languagesError', index, 'name').length > 0,
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
                    onChange={handleEditObject('languages', index)}
                    className={classes.select}
                    fullWidth
                    helperText={this.objectErrorText('languagesError', index, 'writingLevel')}
                    error={this.objectErrorText('languagesError', index, 'writingLevel').length > 0}
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
                    onChange={handleEditObject('languages', index)}
                    className={classes.select}
                    fullWidth
                    helperText={this.objectErrorText('languagesError', index, 'speakingLevel')}
                    error={this.objectErrorText('languagesError', index, 'speakingLevel').length > 0}
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
                <Button
                  variant="fab"
                  mini
                  aria-label="Delete"
                  onClick={event => handleRemoveObject('languages', index, event)}
                  className={classes.button}
                >
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
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  handleAddObject: PropTypes.func.isRequired,
  handleRemoveObject: PropTypes.func.isRequired,
  handleEditObjectAutosuggest: PropTypes.func.isRequired,
  handleEditObject: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  writingLevel: PropTypes.string.isRequired,
  speakingLevel: PropTypes.string.isRequired,
  motherTongue: PropTypes.string.isRequired,
};

export default withStyles(styles)(LanguageInfo);
