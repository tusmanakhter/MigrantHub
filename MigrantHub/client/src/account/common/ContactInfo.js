import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import { provinces } from '../../lib/SignUpConstants';
import { PhoneMask, PostalCodeMask } from '../../lib/Masks';

const styles = ({
  select: {
    textAlign: 'left',
  },
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
    const {
      firstName, lastName, address, city, province, postalCode, phoneNumber,
    } = this.props;
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

    if (validator.isEmpty(firstName)) {
      errors.firstNameError = 'First name is required';
      isError = true;
    } else if (!validator.isAlpha(firstName)) {
      errors.firstNameError = 'First name is not valid';
      isError = true;
    }

    if (validator.isEmpty(lastName)) {
      errors.lastNameError = 'Last name is required';
      isError = true;
    } else if (!validator.isAlpha(lastName)) {
      errors.lastNameError = 'Last name is not valid';
      isError = true;
    }

    if (validator.isEmpty(address)) {
      errors.addressError = 'Address is required';
      isError = true;
    }

    if (validator.isEmpty(city)) {
      errors.cityError = 'City is required';
      isError = true;
    } else if (!validator.isAlpha(city)) {
      errors.cityError = 'This is not a valid city';
      isError = true;
    }

    if (validator.isEmpty(province)) {
      errors.provinceError = 'Province is required';
      isError = true;
    }

    if (validator.isEmpty(postalCode)) {
      errors.postalCodeError = 'Postal code is required';
      isError = true;
    } else if (!validator.isLength(postalCode, { min: 7, max: 7 })) {
      errors.postalCodeError = 'Postal code is invalid';
      isError = true;
    }

    if (validator.isEmpty(phoneNumber)) {
      errors.phoneNumberError = 'Phone number is required';
      isError = true;
    } else if (!validator.isLength(phoneNumber, { min: 14, max: 14 })) {
      errors.phoneNumberError = 'Phone number is invalid';
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      firstNameError, lastNameError, addressError, apartmentError, cityError,
      provinceError, postalCodeError, phoneNumberError,
    } = this.state;

    const {
      classes, handleChange, firstName, lastName, address, apartment, city, province,
      postalCode, phoneNumber,
    } = this.props;

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
              helperText={firstNameError}
              error={firstNameError.length > 0}
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
              helperText={lastNameError}
              error={lastNameError.length > 0}
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
              helperText={addressError}
              error={addressError.length > 0}
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
              helperText={apartmentError}
              error={apartmentError.length > 0}
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
              helperText={cityError}
              error={cityError.length > 0}
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
              helperText={provinceError}
              error={provinceError.length > 0}
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
              InputProps={{
                inputComponent: PostalCodeMask,
              }}
              helperText={postalCodeError}
              error={postalCodeError.length > 0}
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
              helperText={phoneNumberError}
              error={phoneNumberError.length > 0}
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
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  apartment: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default withStyles(styles)(ContactInfo);
