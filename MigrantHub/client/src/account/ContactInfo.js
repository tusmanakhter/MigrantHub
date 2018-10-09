import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';
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

const PhoneMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
}

const PostalCodeMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={[/[A-Z]/, /\d/, /[A-Z]/, ' ', /\d/, /[A-Z]/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
}

const styles = theme => ({
  select: {
    textAlign: 'left'
  }
});
class ContactInfo extends Component {
  state = {
    firstNameError: '',
    lastNameError: '',
    addressError: '',
    apartmentError: '',
    cityError: '',
    provinceError: '',
    postalCodeError: '',
    phoneNumberError: '',
  }

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: '',
      lastNameError: '',
      addressError: '',
      apartmentError: '',
      cityError: '',
      provinceError: '',
      postalCodeError: '',
      phoneNumberError: '',
    };

    if (validator.isEmpty(this.props.firstName)) {
      errors.firstNameError = "First name is required";
      isError = true
    } else if (!validator.isAlpha(this.props.firstName)) {
      errors.firstNameError = "First name is not valid"
      isError = true
    }

    if (validator.isEmpty(this.props.lastName)) {
      errors.lastNameError = "Last name is required";
      isError = true
    } else if (!validator.isAlpha(this.props.lastName)) {
      errors.lastNameError = "Last name is not valid"
      isError = true
    }
   
    if (validator.isEmpty(this.props.address)) {
      errors.addressError = "Address is required";
      isError = true
    }

    if (validator.isEmpty(this.props.city)) {
      errors.cityError = "City is required";
      isError = true
    } else if (!validator.isAlpha(this.props.city)) {
      errors.cityError = "This is not a valid city"
      isError = true
    }

    if (validator.isEmpty(this.props.province)) {
      errors.provinceError = "Province is required";
      isError = true
    }

    if (validator.isEmpty(this.props.postalCode)) {
      errors.postalCodeError = "Postal code is required";
      isError = true
    } else if (!validator.isLength(this.props.postalCode, {min:7, max:7})) {
      errors.postalCodeError = "Postal code is invalid";
      isError = true
    }

    if (validator.isEmpty(this.props.phoneNumber)) {
      errors.phoneNumberError = "Phone number is required";
      isError = true
    } else if (!validator.isLength(this.props.phoneNumber, {min:14, max:14})) {
      errors.phoneNumberError = "Phone number is invalid";
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
            helperText={this.state.apartmentError}
            error={this.state.apartmentError.length > 0}
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
            className={classes.select}
            onChange={event => handleChange(event)}
            fullWidth
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
            onChange={ event => handleChange(event)}
            fullWidth
            InputProps={{
              inputComponent: PostalCodeMask,
            }}
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
            onChange={ event => handleChange(event)}
            fullWidth
            helperText={this.state.phoneNumberError}
            error={this.state.phoneNumberError.length > 0}
            InputProps={{
              inputComponent: PhoneMask,
            }}
          />
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }
}

ContactInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactInfo);
