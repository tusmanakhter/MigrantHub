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
import { workObject } from '../../lib/SignUpConstants';
import JobStatus from '../../components/fields/employment/JobStatus';
import CurrentIncome from '../../components/fields/employment/CurrentIncome';
import LookingForJob from '../../components/fields/employment/LookingForJob';
import Title from '../../components/fields/employment/Title';
import Company from '../../components/fields/employment/Company';
import EmploymentLength from '../../components/fields/employment/EmploymentLength';

const styles = theme => ({
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
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
    const { jobStatus, workExperience } = this.props;
    let isError = false;
    const errors = {
      jobStatusError: '',
      workExperienceError: [],
    };

    if (validator.isEmpty(jobStatus)) {
      errors.jobStatusError = 'Job status is required';
      isError = true;
    }

    workExperience.forEach((job, index) => {
      errors.workExperienceError = errors.workExperienceError.concat([JSON.parse(
        JSON.stringify(workObject),
      )]);

      if (validator.isEmpty(job.title)) {
        errors.workExperienceError[index].title = 'Title is required';
        isError = true;
      } else if (!validator.isAlpha(job.title)) {
        errors.workExperienceError[index].title = 'Title is not valid';
        isError = true;
      }

      if (validator.isEmpty(job.company)) {
        errors.workExperienceError[index].company = 'Company is required';
        isError = true;
      }

      if (validator.isEmpty(job.years)) {
        errors.workExperienceError[index].years = 'Employment length is required';
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
        <Typography variant="title" gutterBottom> Employment Information </Typography>
        <Grid container spacing={24}>
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
            <Typography variant="subheading" gutterBottom className={classes.row}> Add work experience </Typography>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={() => handleAddObject('workExperience', workObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {workExperience.map((work, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={24} item xs={12} sm={11}>
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
              <Grid item xs={12} sm={1}>
                <Button
                  variant="fab"
                  mini
                  aria-label="Delete"
                  onClick={event => handleRemoveObject('workExperience', index, event)}
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
};

export default withStyles(styles)(EmploymentInfo);
