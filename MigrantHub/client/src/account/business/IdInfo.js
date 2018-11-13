import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import IdApi from './IdApi';

const styles = ({});

class IdInfo extends Component {
  state = {
    corpIdError: '',
    loading: false,
  }

  validate = async () => {
    const { corpId } = this.props;

    let isError = false;
    const errors = {
      corpIdError: '',
    };

    if (validator.isEmpty(corpId)) {
      errors.corpIdError = 'Corporation Id is required';
      isError = true;
    } else if (!validator.isNumeric(corpId)) {
      errors.corpIdError = 'Please enter 7-digit';
      isError = true;
    } else {
      this.setState({ loading: true });
      const validId = await IdApi.checkCorpId(corpId);
      this.setState({ loading: false });
      if (!validId) {
        errors.corpIdError = 'ID entered is invalid';
        isError = true;
      }
    }

    this.setState({
      ...errors,
    });

    return isError;
  }

  render() {
    const { corpId, handleChange } = this.props;
    const { corpIdError, loading } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Corporation ID Verification
        </Typography>
        <i>
          <small>
            A corporation number is the number assigned to a corporation by Corporations Canada.
            It is usually a 7-digit number.
            Find the corporation number on the corporation’s Certificate of Incorporation,
            Amalgamation or Continuance.
            Or access Corporations Canada online database of federal corporations
             or by contacting Corporations Canada directly.
          </small>
        </i>
        <i><b><small>- Goverment Of Canada</small></b></i>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="corpId"
              name="corpId"
              label="Corporation Id Example: 1234567"
              value={corpId}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={corpIdError}
              error={corpIdError.length > 0}
            />
          </Grid>
        </Grid>
        {loading ? (
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
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  corpId: PropTypes.number.isRequired,
};

export default withStyles(styles)(IdInfo);
