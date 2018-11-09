import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';

const styles = ({});

class AccountInfo extends Component {
  state = {
    showPassword: false,
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validate = () => {
    const { email, password, confirmPassword } = this.props;

    let isError = false;
    const errors = {
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (validator.isEmpty(email)) {
      errors.emailError = 'Email is required';
      isError = true;
    } else if (!validator.isEmail(email)) {
      errors.emailError = 'Email is not valid';
      isError = true;
    }

    if (validator.isEmpty(password)) {
      errors.passwordError = 'Password is required';
      isError = true;
    } else if (validator.isEmpty(confirmPassword)) {
      errors.confirmPasswordError = 'Confirm your password';
      isError = true;
    } else if (!validator.equals(password, confirmPassword)) {
      errors.passwordError = 'Passwords do not match';
      errors.confirmPasswordError = 'Passwords do not match';
      isError = true;
    } else if (!validator.isLength(password, { min: 8 })) {
      errors.passwordError = 'Password must be atleast 8 characters';
      errors.confirmPasswordError = 'Password must be atleast 8 characters';
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
      email, password, confirmPassword, handleChange,
    } = this.props;
    const {
      showPassword, passwordError, emailError, confirmPasswordError,
    } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
                  Account Information
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={emailError}
              error={emailError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl margin="normal" fullWidth>
              <InputLabel
                htmlFor="password"
                error={passwordError.length > 0}
              >
Password
              </InputLabel>
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => handleChange(event)}
                error={passwordError.length > 0}
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
              />
              <FormHelperText
                error={passwordError.length > 0}
              >
                {passwordError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl margin="normal" fullWidth>
              <InputLabel
                htmlFor="password"
                error={confirmPasswordError.length > 0 || passwordError.length > 0}
              >
                              Confirm Password
              </InputLabel>
              <Input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={event => handleChange(event)}
                error={confirmPasswordError.length > 0 || passwordError.length > 0}
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
              />
              <FormHelperText
                error={confirmPasswordError.length > 0 || passwordError.length > 0}
              >
                {confirmPasswordError}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AccountInfo.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

};

export default withStyles(styles)(AccountInfo);
