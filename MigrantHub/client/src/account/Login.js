import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextBox from 'components/fields/generic/TextBox';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import { handleChange, login } from 'helpers/Forms';
import LoginSignupLayout from 'account/LoginSignupLayout';
import FacebookButton from 'account/FacebookButton';
import GoogleButton from 'account/GoogleButton';
import DividerWithText from 'account/DividerWithText';
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
  loginBtn: {
    textTransform: 'unset',
    height: 46,
    fontSize: 'inherit',
  },
});

class BaseLogin extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(Validations.login);

    this.state = {
      showPassword: false,
      email: '',
      password: '',
      validation: this.validator.valid(),
    };

    this.handleChange = handleChange.bind(this);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = async () => {
    const validation = await this.validator.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      this.sendLogin(this);
    }
  };

  // Send profile data in post body to add to mongodb
  async sendLogin(e) {
    const { context } = this.props;
    const error = await login(e.state.email, e.state.password, context);

    if (error) {
      toast.error('Incorrect email or password.');
      this.setState({
        password: '',
      });
    }
  }

  render() {
    const {
      email, password, validation,
    } = this.state;

    const { classes } = this.props;

    return (
      <LoginSignupLayout>
        <div className={classes.item}>
          <Typography variant="h5">Log in to MigrantHub</Typography>
        </div>
        <div className={classes.facebook}>
          <FacebookButton text="Log in with Facebook" />
        </div>
        <div className={classes.google}>
          <GoogleButton text="Log in with Google" />
        </div>
        <DividerWithText text="or" />
        <form onSubmit={e => e.preventDefault()}>
          <div className={classes.item}>
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
          </div>
          <div className={classes.item}>
            <TextBox
              name="password"
              type="password"
              label={<FormattedMessage id="password" />}
              value={password}
              handleChange={event => this.handleChange(event)}
              variant="outlined"
              error={validation.password.message}
              inputClass={classes.textbox}
              margin="dense"
            />
          </div>
          <div className={classes.item}>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              onClick={this.handleSubmit}
              className={classes.loginBtn}
            >
              <FormattedMessage id="login" />
            </Button>
          </div>
        </form>
        <div className={classes.item}>
          <Link
            component={RouterLink}
            to="/forgotpassword"
          >
            <FormattedMessage id="login.forgot" />
          </Link>
        </div>
        <div className={classes.item}>
          <Divider />
        </div>
        <Typography>Don't have an account? <Link component={RouterLink} to="/signup/personal">Sign up.</Link></Typography>
      </LoginSignupLayout>
    );
  }
}

const Login = props => (
  <AuthConsumer>
    {context => <BaseLogin context={context} {...props} />}
  </AuthConsumer>
);

BaseLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export const SendLogin = BaseLogin.prototype.sendLogin;
export default withStyles(styles)(injectIntl(Login));
