import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';
import validator from 'validator';

const styles = theme => ({});

class IdInfo extends Component {
  state = {
    corpIdError: ""
  }

  validate = () => {
    let isError = false;
    const errors = {
      corpIdError: '',
    };

    if (validator.isEmpty(this.props.corpId)) {
      errors.corpIdError = "corpId name is required";
      isError = true
    } else if (!validator.isAlpha(this.props.corpId)) {
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

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Organization ID Verification
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="corpId"
              name="corpId"
              label="Corporation Id"
              value={corpId}
              onChange={event => handleChange(event)}
              fullWidth
            //helperText={this.state.corpIdError}
            //error={this.state.corpIdError.length > 0}
            />
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
