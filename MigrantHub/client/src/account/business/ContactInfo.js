import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';

const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' }
];

class ContactInfo extends Component {
  state = {
    firstNameError: "",
    lastNameError: "",
    addressError: "",
    cityError: "",
    provinceError: "",
    postalCodeError: "",
  }
  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      addressError: "",
      cityError: "",
      provinceError: "",
      postalCodeError: "",
    };

    if (validator.isEmpty(this.props.firstName)) {
      errors.firstNameError = "First Name is required";
      isError = true
    }

    if (validator.isEmpty(this.props.lastName)) {
      errors.lastNameError = "Last Name is required"
      isError = true
    }

    if (validator.isEmpty(this.props.address)) {
      errors.addressError = "Address is required"
      isError = true
    }

    if (validator.isEmpty(this.props.city)) {
      errors.cityError = "City is required"
      isError = true
    }

    if (validator.isEmpty(this.props.province)) {
      errors.provinceError = "Province is required"
      isError = true
    }

    if (validator.isEmpty(this.props.postalCode)) {
      errors.postalCodeError = "Postal Code is required"
      isError = true
    } else if(!validator.isPostalCode(this.props.postalCode, "CA")){
      errors.postalCodeError = "Postal Code is not valid"
      isError = true
    }

    this.setState({
      ...this.state,
      ...errors
    })
    
    return isError;
  }

  render() {
    const handleChange = this.props.handleChange;
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const address = this.props.address;
    const apartment = this.props.apartment;
    const city = this.props.city;
    const province = this.props.province;
    const postalCode = this.props.postalCode;
    const phoneNumber = this.props.phoneNumber;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Contact Information
      </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.firstNameError}
              error={this.state.firstNameError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.lastNameError}
              error={this.state.lastNameError.length > 0}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Street Address"
              placeholder="Street and number"
              value={address}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.addressError}
              error={this.state.addressError.length > 0}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="apartment"
              name="apartment"
              label="Apartment"
              placeholder="Apartment, suite, unit, building, floor, etc."
              value={apartment}
              onChange={event => handleChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              value={city}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.cityError}
              error={this.state.cityError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="province"
              name="province"
              select
              label="Province/Territory"
              value={province}
              onChange={event => handleChange(event)}
              fullWidth
              helperText="Please select a province/territory"
              helperText={this.state.provinceError}
              error={this.state.provinceError.length > 0}
            >
              {provinces.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              value={postalCode}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={this.state.postalCodeError}
              error={this.state.postalCodeError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={phoneNumber}
              onChange={event => handleChange(event)}
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ContactInfo;
