import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import { handleChange, login } from 'helpers/Forms';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import FirstName from 'components/fields/contact/FirstName';
import LastName from 'components/fields/contact/LastName';
import Age from 'components/fields/personal/Age';
import Nationality from 'components/fields/personal/Nationality';
import Gender from 'components/fields/personal/Gender';
import Status from 'components/fields/personal/Status';
import RelationshipStatus from 'components/fields/personal/RelationshipStatus';
import EducationLevel from 'components/fields/education/EducationLevel';
import JobStatus from 'components/fields/employment/JobStatus';
import SettlingLocation from 'components/fields/other/SettlingLocation';
import JoiningReason from 'components/fields/other/JoiningReason';
import TextBox from 'components/fields/generic/TextBox';
import SignUpWithStepper from 'account/common/SignUp';
import LoginSignupLayout from 'account/LoginSignupLayout';
import FacebookButton from 'account/FacebookButton';
import GoogleButton from 'account/GoogleButton';
import DividerWithText from 'account/DividerWithText';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import { handleAutoSuggestChange } from 'helpers/Autosuggest';

const qs = require('qs');

const styles = theme => ({
  textbox: {
    height: 24,
    padding: 11,
  },
  facebook: {
    marginBottom: 8,
    '& > span': {
      transition: 'unset !important',
    },
  },
  item: {
    marginBottom: 16,
  },
});

class BaseSignup extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(Validations.migrant_signup_step1);

    this.state = {
      activeStep: 0,
      showPassword: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      nationality: '',
      relationshipStatus: '',
      status: '',
      educationLevel: '',
      jobStatus: '',
      settlingLocation: '',
      joiningReason: '',
      validation: this.validator.valid(),
    };

    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);
  }

  getStepContent = (step) => {
    const {
      email, password, showPassword,
      firstName, lastName,
      validation,
    } = this.state;

    const {
      age, gender, nationality, relationshipStatus, status,
      educationLevel, jobStatus, settlingLocation, joiningReason,
    } = this.state;

    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <FirstName
                  firstName={firstName}
                  firstNameError={validation.firstName.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LastName
                  lastName={lastName}
                  lastNameError={validation.lastName.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="email"
                  label={<FormattedMessage id="email" />}
                  value={email}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  error={validation.email.message}
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label={<FormattedMessage id="password" />}
                  value={password}
                  handleChange={event => this.handleChange(event)}
                  error={validation.password.message}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Age
                  age={age}
                  ageError={validation.age.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Nationality
                  nationality={nationality}
                  nationalityError={validation.nationality.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Status
                  status={status}
                  statusError={validation.status.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RelationshipStatus
                  relationshipStatus={relationshipStatus}
                  relationshipStatusError={validation.relationshipStatus.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Gender
                  gender={gender}
                  genderError={validation.gender.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <EducationLevel
                  educationLevel={educationLevel}
                  educationLevelError={validation.educationLevel.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SettlingLocation
                  settlingLocation={settlingLocation}
                  settlingLocationError={validation.settlingLocation.message}
                  handleAutoSuggestChange={this.handleAutoSuggestChange('settlingLocation')}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JobStatus
                  jobStatus={jobStatus}
                  jobStatusError={validation.jobStatus.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <JoiningReason
                  joiningReason={joiningReason}
                  joiningReasonError={validation.joiningReason.message}
                  handleChange={event => this.handleChange(event)}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
            </Grid>
          </div>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  validate = (step) => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    switch (step) {
      case 0:
        if (validation.isValid) {
          this.validator = new FormValidator(Validations.migrant_signup_step2);
          this.setState({
            validation: this.validator.valid(),
          });
        }
        return validation.isValid;
      case 1:
        if (validation.isValid) {
          this.validator = new FormValidator(Validations.migrant_signup_step3);
          this.setState({
            validation: this.validator.valid(),
          });
        }
        return validation.isValid;
      case 2:
        return validation.isValid;
      default:
        throw new Error('Unknown step');
    }
  }

  goBack = (step) => {
    switch (step) {
      case 0:
        this.validator = new FormValidator(Validations.migrant_signup_step1);
        this.setState({
          validation: this.validator.valid(),
        });
        break;
      case 1:
        this.validator = new FormValidator(Validations.migrant_signup_step2);
        this.setState({
          validation: this.validator.valid(),
        });
        break;
      default:
        throw new Error('Unknown step');
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  createAccount = async () => {
    const {
      email, password, firstName, lastName, age, gender, nationality,
      relationshipStatus, status, educationLevel, jobStatus, settlingLocation, joiningReason,
    } = this.state;

    const { context, history } = this.props;

    try {
      const result = await axios.post('/api/accounts/create/user',
        qs.stringify({
          email,
          password,
          firstName,
          lastName,
          age,
          gender,
          nationality,
          relationshipStatus,
          status,
          educationLevel,
          jobStatus,
          settlingLocation,
          joiningReason,
        }));
      if (result.status === 200) {
        const error = await login(email, password, context, toast);
        if (!error) {
          toast.success('Welcome to MigrantHub!');
        } else {
          toast.success('Account Created. You may log in.');
          history.push('/login');
        }
      }
      return false;
    } catch (e) {
      toast.error('Error creating account.');
      return true;
    }
  }

  render() {
    const steps = [
      <FormattedMessage id="signup.account" />,
      <FormattedMessage id="signup.personal" />,
      <FormattedMessage id="signup.additional" />,
    ];

    const { classes } = this.props;

    return (
      <LoginSignupLayout>
        <div className={classes.item}>
          <Typography variant="h5">Sign up to MigrantHub</Typography>
        </div>
        <div className={classes.item}>
          <Typography>Are you a business? <Link component={RouterLink} to="/signup/business">Sign up as business.</Link></Typography>
        </div>
        <div className={classes.item}>
          <SignUpWithStepper
            createAccount={this.createAccount}
            steps={steps}
            getStepContent={this.getStepContent}
            validate={this.validate}
            goBack={this.goBack}
          />
        </div>
        <DividerWithText text="or" />
        <div className={classes.facebook}>
          <FacebookButton text="Continue with Facebook" />
        </div>
        <div className={classes.item}>
          <div className={classes.google}>
            <GoogleButton text="Continue with Google" />
          </div>
        </div>
        <div className={classes.item}>
          <Divider />
        </div>
        <Typography>Already have an account? <Link component={RouterLink} to="/login">Log in.</Link></Typography>
      </LoginSignupLayout>
    );
  }
}

const SignUp = props => (
  <AuthConsumer>
    {context => <BaseSignup context={context} {...props} />}
  </AuthConsumer>
);

BaseSignup.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(SignUp));
