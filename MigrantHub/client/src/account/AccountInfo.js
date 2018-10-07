import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
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

const styles = theme => ({});

class AccountInfo extends Component {
  state = {
    showPassword: false,
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: "",
    };

    if (validator.isEmpty(this.props.email)) {
      errors.emailError = "Email is required";
      isError = true
    } else if (!validator.isEmail(this.props.email)) {
      errors.emailError = "Email is not valid"
      isError = true
    }

    if (validator.isEmpty(this.props.password)) {
      errors.passwordError = "Password is required"
      isError = true
    } else if (validator.isEmpty(this.props.confirmPassword)) {
      errors.confirmPasswordError = "Confirm your password"
      isError = true
    }  else if (!validator.equals(this.props.password, this.props.confirmPassword)) {
      errors.passwordError = "Passwords do not match"
      errors.confirmPasswordError = "Passwords do not match"
      isError = true
    } else if (!validator.isLength(this.props.password, {min: 8})) {
      errors.passwordError = "Password must be atleast 8 characters"
      errors.confirmPasswordError = "Password must be atleast 8 characters"
      isError = true
    }

    this.setState({
      ...this.state,
      ...errors
    })
    
    return isError;
  }

  render() {
    const { classes } = this.props;

    const handleChange = this.props.handleChange;
    const email = this.props.email;
    const password = this.props.password;
    const confirmPassword = this.props.confirmPassword;

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
                helperText={this.state.emailError}
                error={this.state.emailError.length > 0}
            />
           </Grid>
           <Grid item xs={12} sm={6}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password"
              error={this.state.passwordError.length > 0}>Password</InputLabel>
              <Input
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => handleChange(event)}
                error={this.state.passwordError.length > 0}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={this.state.passwordError.length > 0}
              >
                {this.state.passwordError}
              </FormHelperText>
            </FormControl>
           </Grid>
           <Grid item xs={12} sm={6}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type={this.state.showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={event => handleChange(event)}
                error={this.state.confirmPasswordError.length > 0 || this.state.passwordError.length > 0}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={this.state.confirmPasswordError.length > 0 || this.state.passwordError.length > 0}
              >
                {this.state.confirmPasswordError}
              </FormHelperText>
            </FormControl>
           </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AccountInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountInfo);
