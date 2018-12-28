import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import { organizationTypes } from '../../lib/SignUpConstants';

const styles = ({
  select: {
    textAlign: 'left',
  },
});
class AboutInfo extends Component {
  state = {
    organizationNameError: '',
    orgTypeError: '',
    departmentError: '',
    serviceTypeError: '',
    descriptionError: '',
  }

  validate = () => {
    let isError = false;
    const errors = {
      organizationNameError: '',
      orgTypeError: '',
      departmentError: '',
      serviceTypeError: '',
      descriptionError: '',
    };

    const {
      organizationName, orgType, department, serviceType, description,
    } = this.props;

    if (validator.isEmpty(organizationName)) {
      errors.organizationNameError = 'Organization name is required';
      isError = true;
    }

    if (validator.isEmpty(orgType)) {
      errors.orgTypeError = 'Organization type is required';
      isError = true;
    }

    if (validator.isEmpty(department)) {
      errors.departmentError = 'Organization department is required';
      isError = true;
    }

    if (validator.isEmpty(serviceType)) {
      errors.serviceTypeError = 'Organization service type is required';
      isError = true;
    }

    if (validator.isEmpty(description)) {
      errors.descriptionError = 'Organization description is required';
      isError = true;
    }

    this.setState({
      ...errors,
    });

    return isError;
  }

  render() {
    const {
      organizationNameError, orgTypeError, departmentError, serviceTypeError, descriptionError,
    } = this.state;
    const {
      classes, handleChange, organizationName, orgType, department, serviceType, description,
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
              About
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="organizationName"
              name="organizationName"
              label="Name of organization"
              value={organizationName}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={organizationNameError}
              error={organizationNameError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="orgType"
              name="orgType"
              select
              label="Organization Type"
              className={classes.select}
              value={orgType}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={orgTypeError}
              error={orgTypeError.length > 0}
            >
              {organizationTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="department"
              name="department"
              label="Name of the department"
              value={department}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={departmentError}
              error={departmentError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="serviceType"
              name="serviceType"
              label="Type of service"
              value={serviceType}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={serviceTypeError}
              error={serviceTypeError.length > 0}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={description}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={descriptionError}
              error={descriptionError.length > 0}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AboutInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  organizationName: PropTypes.string.isRequired,
  orgType: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(AboutInfo);
