import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import validator from 'validator';
import { objectErrorText } from 'helpers/Object';
import { langObject } from 'lib/SignUpConstants';
import Language from 'components/fields/language/Language';
import WritingLevel from 'components/fields/language/WritingLevel';
import SpeakingLevel from 'components/fields/language/SpeakingLevel';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = theme => ({
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      padding: theme.spacing.unit * 3,
    },
    layout: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
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
      languages, motherTongue, intl,
    } = this.props;
    let isError = false;
    const errors = {
      languagesError: [],
      motherTongueError: '',
    };

    if ((motherTongue !== '' && motherTongue !== undefined) && !validator.isAlpha(motherTongue)) {
      errors.motherTongueError = `${intl.formatMessage({ id: 'lang.lang' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    languages.forEach((language, index) => {
      errors.languagesError = errors.languagesError.concat([JSON.parse(
        JSON.stringify(langObject),
      )]);
      if (validator.isEmpty(language.name)) {
        errors.languagesError[index].name = `${intl.formatMessage({ id: 'lang.name' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      } else if (!validator.isAlpha(language.name)) {
        errors.languagesError[index].name = `${intl.formatMessage({ id: 'lange.name' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
        isError = true;
      }
      if (validator.isEmpty(language.writingLevel)) {
        errors.languagesError[index].writingLevel = `${intl.formatMessage({ id: 'lang.writing' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }

      if (validator.isEmpty(language.speakingLevel)) {
        errors.languagesError[index].speakingLevel = `${intl.formatMessage({ id: 'lang.speaking' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
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
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.language" />
            </Typography>
            <Divider />
          </Grid>
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
            <Typography variant="subtitle1" color="textSecondary" gutterBottom className={classes.row}>
              <FormattedMessage id="signup.language.add" />
              <Fab
                size="small"
                aria-label="Add"
                color="primary"
                onClick={() => handleAddObject('languages', langObject)}
                className={classes.button}
              >
                <AddIcon />
              </Fab>
            </Typography>
          </Grid>
          {languages.map((language, index) => (
            <Grid item xs={12}>
              <Paper elevation={4} className={classes.paper}>
                <Grid container justify="space-between" alignItems="center" style={{ paddingBottom: 10 }}>
                  <Typography variant="subtitle1" align="left" gutterBottom className={classes.row}>
                    Language
                    {' '}
                    {index + 1}
                  </Typography>
                  <Fab
                    size="small"
                    aria-label="Delete"
                    color="secondary"
                    onClick={event => handleRemoveObject('languages', index, event)}
                    className={classes.button}
                    styles={{ marginTop: 0 }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Grid>
                <Grid container spacing={24}>
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
              </Paper>
            </Grid>
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
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(LanguageInfo, { withRef: true }));
