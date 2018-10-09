import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import IdApi from './IdApi';

const styles = theme => ({});

class IdInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isValid: false,
      corpId: '',
    }
  }

  state = {
    corpIdError: "",
    isError: false
  }

  validate = () => {
    let isError = false;
    const errors = {
      corpIdError: '',
    };

    if (validator.isEmpty(this.props.corpId)) {
      errors.corpIdError = "corpId name is required";
      isError = true
    } else if (!validator.isNumeric(this.props.corpId)) {
      errors.corpIdError = "corpId name is not valid"
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
    const corpId = this.props.corpId;

    if (this.state.isValid) {
      return (<div>Error</div>)
    }

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Corporation ID Verification
        </Typography>
        <i><small>"A corporation number is the number assigned to a corporation by Corporations Canada.
          It is usually a 7-digit number. Find the corporation number on the corporation’s Certificate of Incorporation, Amalgamation or Continuance.
          Or access Corporations Canada online database of federal corporations or by contacting Corporations Canada directly."</small></i>
        <i><strong><small>- Goverment Of Canada</small></strong></i>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="corpId"
              name="corpId"
              label="Corporation Id Example: 1115553"
              value={corpId}
              onChange={event => handleChange(event)}
              fullWidth
            />
            <IdApi corporationId={corpId}></IdApi>

          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

IdInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IdInfo);
