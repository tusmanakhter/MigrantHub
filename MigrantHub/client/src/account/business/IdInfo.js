import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import IdApi from './IdApi';

const styles = theme => ({});

class IdInfo extends Component {
  state = {
    corpIdError: '',
    loading: false,
  }

  validate = async () => {
    let isError = false;
    const errors = {
      corpIdError: '',
    };

    if (validator.isEmpty(this.props.corpId)) {
      errors.corpIdError = 'Corporation Id is required';
      isError = true;
    } else if (!validator.isNumeric(this.props.corpId)) {
      errors.corpIdError = 'Please enter 7-digit';
      isError = true;
    } else {
      this.setState({ loading: true });
      const validId = await IdApi.checkCorpId(this.props.corpId);
      this.setState({ loading: false });
      if (!validId) {
        errors.corpIdError = 'ID entered is invalid';
        isError = true;
      }
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  }

  render() {
    const handleChange = this.props.handleChange;
    const corpId = this.props.corpId;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Corporation ID Verification
        </Typography>
        <i>
          <small>
"A corporation number is the number assigned to a corporation by Corporations Canada.
          It is usually a 7-digit number. Find the corporation number on the corporation’s Certificate of Incorporation, Amalgamation or Continuance.
          Or access Corporations Canada online database of federal corporations or by contacting Corporations Canada directly."
          </small>
        </i>
        <i><strong><small>- Goverment Of Canada</small></strong></i>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="corpId"
              name="corpId"
              label="Corporation Id Example: 1234567"
              value={corpId}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.corpIdError}
              error={this.state.corpIdError.length > 0}
            />
          </Grid>
        </Grid>
        {this.state.loading ? (
          <div>
            <br />
            <CircularProgress />
            <br />
            <p>Please wait while we verify your ID</p>
          </div>
        ) : ''
        }
      </React.Fragment>
    );
  }
}

IdInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IdInfo);
