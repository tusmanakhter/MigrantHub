import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import EducationLevel from '../../../components/fields/education/EducationLevel';
import JobStatus from '../../../components/fields/employment/JobStatus';
import SettlingLocation from '../../../components/fields/other/SettlingLocation';
import JoiningReason from '../../../components/fields/other/JoiningReason';

const styles = ({});

class AdditionalInfo extends Component {
  state = {
    educationLevelError: '',
    jobStatusError: '',
    settlingLocationError: '',
    joiningReasonError: '',
  }

  validate = () => {
    const {
      educationLevel, jobStatus, settlingLocation, joiningReason,
    } = this.props;
    let isError = false;
    const errors = {
      educationLevelError: '',
      jobStatusError: '',
      settlingLocationError: '',
      joiningReasonError: '',
    };

    if (validator.isEmpty(educationLevel)) {
      errors.educationLevelError = 'Education level is required';
      isError = true;
    }

    if (validator.isEmpty(jobStatus)) {
      errors.jobStatusError = 'Job status is required';
      isError = true;
    }

    if (validator.isEmpty(settlingLocation)) {
      errors.settlingLocationError = 'Settling location is required';
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

  render() {
    const {
      educationLevelError, jobStatusError, settlingLocationError, joiningReasonError,
    } = this.state;

    const {
      handleChange, handleAutoSuggestChange, educationLevel, jobStatus, settlingLocation, joiningReason,
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom> Additional Information </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <EducationLevel
              educationLevel={educationLevel}
              educationLevelError={educationLevelError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SettlingLocation
              settlingLocation={settlingLocation}
              settlingLocationError={settlingLocationError}
              handleAutoSuggestChange={handleAutoSuggestChange('settlingLocation')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <JobStatus
              jobStatus={jobStatus}
              jobStatusError={jobStatusError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <JoiningReason
              joiningReason={joiningReason}
              joiningReasonError={joiningReasonError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AdditionalInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  educationLevel: PropTypes.string.isRequired,
  jobStatus: PropTypes.string.isRequired,
  settlingLocation: PropTypes.string.isRequired,
  joiningReason: PropTypes.string.isRequired,
};

export default withStyles(styles)(AdditionalInfo);
