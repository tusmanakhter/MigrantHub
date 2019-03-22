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
import { workObject } from 'lib/SignUpConstants';
import JobStatus from 'components/fields/employment/JobStatus';
import CurrentIncome from 'components/fields/employment/CurrentIncome';
import LookingForJob from 'components/fields/employment/LookingForJob';
import Title from 'components/fields/employment/Title';
import Company from 'components/fields/employment/Company';
import EmploymentLength from 'components/fields/employment/EmploymentLength';
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
class EmploymentInfo extends Component {
  constructor(props) {
    super(props);
    this.objectErrorText = objectErrorText.bind(this);
  }

  state = {
    jobStatusError: '',
    lookingForJobError: '',
    workExperienceError: [],
  }

  validate = () => {
    const { jobStatus, workExperience, intl } = this.props;
    let isError = false;
    const errors = {
      jobStatusError: '',
      workExperienceError: [],
    };

    if (validator.isEmpty(jobStatus)) {
      errors.jobStatusError = `${intl.formatMessage({ id: 'employment.status' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    workExperience.forEach((job, index) => {
      errors.workExperienceError = errors.workExperienceError.concat([JSON.parse(
        JSON.stringify(workObject),
      )]);

      if (validator.isEmpty(job.title)) {
        errors.workExperienceError[index].title = `${intl.formatMessage({ id: 'employment.title' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      } else if (!validator.isAlpha(job.title)) {
        errors.workExperienceError[index].title = `${intl.formatMessage({ id: 'employment.title' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
        isError = true;
      }

      if (validator.isEmpty(job.company)) {
        errors.workExperienceError[index].company = `${intl.formatMessage({ id: 'employment.company' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      }

      if (validator.isEmpty(job.years)) {
        errors.workExperienceError[index].years = `${intl.formatMessage({ id: 'employment.length' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
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
      classes, handleChange, handleAddObject, handleRemoveObject, handleEditObject,
      jobStatus, lookingForJob, currentIncome, workExperience,
    } = this.props;
    const { jobStatusError, lookingForJobError } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.employmentinfo" />
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={4}>
            <JobStatus
              jobStatus={jobStatus}
              jobStatusError={jobStatusError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CurrentIncome
              currentIncome={currentIncome}
              currentIncomeError=""
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LookingForJob
              lookingForJob={lookingForJob}
              lookingForJobError={lookingForJobError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom className={classes.row}>
              <FormattedMessage id="signup.employment.addwork" />
              <Fab
                size="small"
                aria-label="Add"
                color="primary"
                onClick={() => handleAddObject('workExperience', workObject)}
                className={classes.button}
              >
                <AddIcon />
              </Fab>
            </Typography>
          </Grid>
          {workExperience.map((work, index) => (
            <Grid item xs={12}>
              <Paper elevation={4} className={classes.paper}>
                <Grid container justify="space-between" alignItems="center" style={{ paddingBottom: 10 }}>
                  <Typography variant="subtitle1" align="left" gutterBottom className={classes.row}>
                    Employment
                    {' '}
                    {index + 1}
                  </Typography>
                  <Fab
                    size="small"
                    aria-label="Delete"
                    color="secondary"
                    onClick={event => handleRemoveObject('workExperience', index, event)}
                    className={classes.button}
                    styles={{ marginTop: 0 }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={4}>
                    <Title
                      title={work.title}
                      titleError={this.objectErrorText('workExperienceError', index, 'title')}
                      handleChange={handleEditObject('workExperience', index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Company
                      company={work.company}
                      companyError={this.objectErrorText('workExperienceError', index, 'company')}
                      handleChange={handleEditObject('workExperience', index)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <EmploymentLength
                      years={work.years}
                      yearsError={this.objectErrorText('workExperienceError', index, 'years')}
                      handleChange={handleEditObject('workExperience', index)}
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

EmploymentInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddObject: PropTypes.func.isRequired,
  handleRemoveObject: PropTypes.func.isRequired,
  handleEditObject: PropTypes.func.isRequired,
  jobStatus: PropTypes.string.isRequired,
  lookingForJob: PropTypes.string.isRequired,
  currentIncome: PropTypes.string.isRequired,
  workExperience: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(EmploymentInfo, { withRef: true }));
