import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';

const organizationTypes = [
  { value: 'FDRL', label: 'Federal' },
  { value: 'NGOV', label: 'Non-governmental' },
  { value: 'PROV', label: 'Provincial' },
];

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
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
    };

    if (validator.isEmpty(this.props.organizationName)) {
      errors.organizationNameError = 'Organization name is required';
      isError = true;
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  }

  render() {
    const { organizationNameError } = this.state;
    const {
      handleChange, organizationName, orgType, department, serviceType, description,
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
              label="Organization Type"
              value={orgType}
              onChange={event => handleChange(event)}
              fullWidth
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
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AboutInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  organizationName: PropTypes.string.isRequired,
  orgType: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default AboutInfo;
