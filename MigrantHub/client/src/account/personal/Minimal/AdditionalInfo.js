import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import EducationLevel from 'components/fields/education/EducationLevel';
import JobStatus from 'components/fields/employment/JobStatus';
import SettlingLocation from 'components/fields/other/SettlingLocation';
import JoiningReason from 'components/fields/other/JoiningReason';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

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
      educationLevel, jobStatus, settlingLocation, joiningReason, intl,
    } = this.props;
    let isError = false;
    const errors = {
      educationLevelError: '',
      jobStatusError: '',
      settlingLocationError: '',
      joiningReasonError: '',
    };

    if (validator.isEmpty(educationLevel)) {
      errors.educationLevelError = `${intl.formatMessage({ id: 'educ.level' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(jobStatus)) {
      errors.jobStatusError = `${intl.formatMessage({ id: 'employment.status' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(settlingLocation)) {
      errors.settlingLocationError = `${intl.formatMessage({ id: 'other.location' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(joiningReason)) {
      errors.joiningReasonError = `${intl.formatMessage({ id: 'other.reason' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
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
        <Typography variant="title" gutterBottom>
          <FormattedMessage id="signup.additional" />
        </Typography>
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
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(AdditionalInfo, { withRef: true }));
