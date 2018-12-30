import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import validator from 'validator';
import { objectErrorText } from '../../helpers/Object';
import { langObject } from '../../lib/SignUpConstants';
import Language from '../../components/fields/language/Language';
import WritingLevel from '../../components/fields/language/WritingLevel';
import SpeakingLevel from '../../components/fields/language/SpeakingLevel';

const styles = theme => ({
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class LanguageInfo extends Component {
  constructor(props) {
    super(props);
    this.objectErrorText = objectErrorText.bind(this);
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
      languages, motherTongue,
    } = this.props;
    let isError = false;
    const errors = {
      languagesError: [],
      motherTongueError: '',
    };

    if ((motherTongue !== '' && motherTongue !== undefined) && !validator.isAlpha(motherTongue)) {
      errors.motherTongueError = 'Mother tongue is not valid';
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
      writingLevelError, speakingLevelError, motherTongueError,
    } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom> Language Information </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4}>
            <Language
              language={motherTongue}
              languageError={motherTongueError}
              handleAutoSuggestChange={handleAutoSuggestChange('motherTongue')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <WritingLevel
              writingLevel={writingLevel}
              writingLevelError={writingLevelError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SpeakingLevel
              speakingLevel={speakingLevel}
              speakingLevelError={speakingLevelError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" gutterBottom className={classes.row}> Add another language </Typography>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={() => handleAddObject('languages', langObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {languages.map((language, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={24} item xs={12} sm={11}>
                <Grid item xs={12} sm={4}>
                  <Language
                    language={language.name}
                    languageError={this.objectErrorText('languagesError', index, 'name')}
                    handleAutoSuggestChange={handleEditObjectAutosuggest('languages', 'name', index)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <WritingLevel
                    writingLevel={language.writingLevel}
                    writingLevelError={this.objectErrorText('languagesError', index, 'writingLevel')}
                    handleChange={handleEditObject('languages', index)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <SpeakingLevel
                    speakingLevel={language.speakingLevel}
                    speakingLevelError={this.objectErrorText('languagesError', index, 'speakingLevel')}
                    handleChange={handleEditObject('languages', index)}
                  />
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
