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
import { handleChange } from 'helpers/Forms';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import TextBox from 'components/fields/generic/TextBox';
import SignUpWithStepper from 'account/common/SignUp';
import LoginSignupLayout from 'account/LoginSignupLayout';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';

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

class BaseSignupAdmin extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(Validations.adminSignup);

    this.state = {
      activeStep: 0,
      showPassword: false,
      email: '',
      password: '',
      validation: this.validator.valid(),
    };

    this.handleChange = handleChange.bind(this);
  }

  getStepContent = () => {
    const {
      email, password, showPassword, validation,
    } = this.state;

    const { classes } = this.props;

    return (
      <div className={classes.item}>
        <Grid container spacing={8}>
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
  }

  validate = async () => {
    const validation = await this.validator.validate(this.state);
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
      email, password,
    } = this.state;

    const { history } = this.props;

    try {
      const result = await axios.post('/api/accounts/create/admin',
        qs.stringify({
          email,
          password,
        }));
      if (result.status === 200) {
        toast.success('Account Created. An admin will verify you.');
        history.push('/');
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
    ];

    const { classes } = this.props;

    return (
      <LoginSignupLayout>
        <div className={classes.item}>
          <Typography variant="h5">Migranthub Admin Signup</Typography>
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

const SignUpAdmin = props => (
  <AuthConsumer>
    {context => <BaseSignupAdmin context={context} {...props} />}
  </AuthConsumer>
);

BaseSignupAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(SignUpAdmin));
