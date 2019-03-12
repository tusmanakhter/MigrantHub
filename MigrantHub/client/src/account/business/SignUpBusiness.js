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
import Address from 'components/fields/contact/Address';
import Apartment from 'components/fields/contact/Apartment';
import City from 'components/fields/contact/City';
import Province from 'components/fields/contact/Province';
import PostalCode from 'components/fields/contact/PostalCode';
import PhoneNumber from 'components/fields/contact/PhoneNumber';
import TextBox from 'components/fields/generic/TextBox';
import Dropdown from 'components/fields/generic/Dropdown';
import SignUpWithStepper from 'account/common/SignUp';
import LoginSignupLayout from 'account/LoginSignupLayout';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import { handleAutoSuggestChange } from 'helpers/Autosuggest';
import CircularProgress from '@material-ui/core/CircularProgress';
import IdApi from 'account/business/IdApi';
import { organizationTypes } from 'lib/SignUpConstants';

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

class BaseSignupBusiness extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(Validations.businessSignup);

    this.state = {
      loading: false,
      activeStep: 0,
      showPassword: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      corpId: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
      validation: this.validator.valid(),
    };

    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);
  }

  getStepContent = (step) => {
    const {
      email, password, showPassword, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description, validation, loading,
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
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <FormattedMessage id="business.corpVerification" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <i>
                  <small>
                    <FormattedMessage id="business.corpIdDesc" />
                  </small>
                </i>
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="corpId"
                  label={<FormattedMessage id="business.corpIdEx" />}
                  value={corpId}
                  handleChange={event => this.handleChange(event)}
                  error={validation.corpId.message}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              {loading && (
                <Grid item xs={12}>
                  <CircularProgress />
                  <br />
                  <p><FormattedMessage id="business.corpIdLoading" /></p>
                </Grid>
              )}
            </Grid>
          </div>
        );
      case 2:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Address
                  address={address}
                  addressError={validation.address.message}
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <Apartment
                  apartment={apartment}
                  apartmentError=""
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <City
                  city={city}
                  cityError={validation.city.message}
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Province
                  province={province}
                  provinceError={validation.province.message}
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PostalCode
                  postalCode={postalCode}
                  postalCodeError={validation.postalCode.message}
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  phoneNumberError={validation.phoneNumber.message}
                  handleChange={event => this.handleChange(event)}
                  inputClass={classes.textbox}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
            </Grid>
          </div>
        );
      case 3:
        return (
          <div className={classes.item}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextBox
                  name="organizationName"
                  label={<FormattedMessage id="business.orgname" />}
                  value={organizationName}
                  handleChange={event => this.handleChange(event)}
                  fullWidth
                  error={validation.phoneNumber.message}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Dropdown
                  name="orgType"
                  label={<FormattedMessage id="business.orgtype" />}
                  value={orgType}
                  handleChange={event => this.handleChange(event)}
                  options={organizationTypes}
                  error={validation.orgType.message}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextBox
                  name="department"
                  label={<FormattedMessage id="business.dept" />}
                  value={department}
                  handleChange={event => this.handleChange(event)}
                  error={validation.department.message}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextBox
                  name="serviceType"
                  label={<FormattedMessage id="business.service" />}
                  value={serviceType}
                  handleChange={event => this.handleChange(event)}
                  error={validation.serviceType.message}
                  variant="outlined"
                  inputClass={classes.textbox}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="description"
                  label={<FormattedMessage id="business.desc" />}
                  value={description}
                  handleChange={event => this.handleChange(event)}
                  error={validation.description.message}
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

  validate = async (step) => {
    switch (step) {
      case 0:
        this.validator = new FormValidator(Validations.businessSignupStep1);
        break;
      case 1:
        this.validator = new FormValidator(Validations.businessSignupStep2);
        break;
      case 2:
        this.validator = new FormValidator(Validations.businessSignupStep3);
        break;
      case 3:
        this.validator = new FormValidator(Validations.businessSignupStep4);
        break;
      default:
        throw new Error('Unknown step');
    }

    const validation = this.validator.validate(this.state);

    if (step === 1 && validation.isValid) {
      const { intl } = this.props;
      const { corpId } = this.state;
      this.setState({ loading: true });
      const validId = await IdApi.checkCorpId(corpId);

      this.setState({ loading: false });
      if (!validId) {
        validation.corpId = {
          isInvalid: true,
          message: `${intl.formatMessage({ id: 'business.corpId' })}  ${intl.formatMessage({ id: 'notvalid' })}`,
        };
        validation.isValid = false;
      }
    }

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        ...validation,
      },
    }));

    return validation.isValid;
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  createAccount = async () => {
    const {
      email, password, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = this.state;

    const { context, history } = this.props;

    try {
      const result = await axios.post('/api/accounts/create/business',
        qs.stringify({
          email,
          corpId,
          password,
          firstName,
          lastName,
          address,
          apartment,
          city,
          province,
          postalCode,
          phoneNumber,
          organizationName,
          orgType,
          department,
          serviceType,
          description,
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
      'ID',
      'Contact',
      <FormattedMessage id="signup.about" />,
    ];

    const { classes } = this.props;

    return (
      <LoginSignupLayout>
        <div className={classes.item}>
          <Typography variant="h5">Sign up to MigrantHub</Typography>
        </div>
        <div className={classes.item}>
          <Typography>You're not a business? <Link component={RouterLink} to="/signup/personal">Sign up for a personal account.</Link></Typography>
        </div>
        <div className={classes.item}>
          <SignUpWithStepper
            createAccount={this.createAccount}
            steps={steps}
            getStepContent={this.getStepContent}
            validate={this.validate}
          />
        </div>
        <div className={classes.item}>
          <Divider />
        </div>
        <Typography>Already have an account? <Link component={RouterLink} to="/login">Log in.</Link></Typography>
      </LoginSignupLayout>
    );
  }
}

const SignUpBusiness = props => (
  <AuthConsumer>
    {context => <BaseSignupBusiness context={context} {...props} />}
  </AuthConsumer>
);

BaseSignupBusiness.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(SignUpBusiness));
