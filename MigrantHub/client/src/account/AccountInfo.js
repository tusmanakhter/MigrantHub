import React, { Component } from 'react';
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

class AccountInfo extends Component {
  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
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
                margin="normal"
            />
           </Grid>
           <Grid item xs={12} sm={6}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => handleChange(event)}
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
            </FormControl>
           </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AccountInfo;
