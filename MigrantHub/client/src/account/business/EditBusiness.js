import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from '../../components/Header/Header';

const qs = require('qs');

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
  { value: 'YT', label: 'Yukon' },
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
};

const PostalCodeMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={[/[a-zA-Z]/, /\d/, /[a-zA-Z]/, ' ', /\d/, /[a-zA-Z]/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
};

const organizationTypes = [
  { value: 'FDRL', label: 'Federal' },
  { value: 'NGOV', label: 'Non-governmental' },
  { value: 'PROV', label: 'Provincial' },
];

const styles = ({
  select: {
    textAlign: 'left',
  },
});
class EditBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: '',
      lastNameError: '',
      addressError: '',
      apartmentError: '',
      cityError: '',
      provinceError: '',
      postalCodeError: '',
      phoneNumberError: '',
      organizationNameError: '',

      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
    };

    this.getAccount = this.getAccount.bind(this);
  }

  componentDidMount() {
    this.getAccount(this);
  }

  componentWillReceiveProps() {
    this.getAccount(this);
  }

  getAccount(e) {
    axios.get('/account/get/businessprofile').then((response) => {
      const jsonObj = qs.parse(qs.stringify(response.data));

      if (response.status === 200) {
        e.setState({
          email: jsonObj.email,
          corpId: jsonObj.corpId,
          password: jsonObj.password,
          confirmPassword: jsonObj.confirmPassword,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName,
          address: jsonObj.address,
          apartment: jsonObj.apartment,
          city: jsonObj.city,
          province: jsonObj.province,
          postalCode: jsonObj.postalCode,
          phoneNumber: jsonObj.phoneNumber,
          organizationName: jsonObj.organizationName,
          orgType: jsonObj.orgType,
          department: jsonObj.department,
          serviceType: jsonObj.serviceType,
          description: jsonObj.description,
        });
      }
    })
  }

  handleSave = async () => {
    const error = await this.validate();

    if (!error) {
      this.updateAccount(this);
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  validate = () => {
    const {
      firstName, lastName, address,
      city, province, postalCode, phoneNumber, organizationName,
    } = this.state;

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
      organizationNameError: '',
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

    if (validator.isEmpty(organizationName)) {
      errors.organizationNameError = 'Organization name is required';
      isError = true;
    }

    this.setState({
      ...errors,
    });

    return isError;
  }

  updateAccount() {
    const {
      email, password, confirmPassword, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = this.state;
    axios.post('/account/edit/businessuser',
      qs.stringify({
        email,
        corpId,
        password,
        confirmPassword,
        firstName,
        lastName,
        address,
        apartment,
        city,
        province,
        postalCode,
        phoneNumber,
        organizationName,
        orgType,
        department,
        serviceType,
        description,

      })).then((response) => {
      this.setState({
        messageFromServer: response.data,
      });
    });
  }

  render() {
    const { classes } = this.props;

    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      organizationName, department, orgType, firstNameError,
      lastNameError, addressError, apartmentError, cityError, provinceError,
      postalCodeError, phoneNumberError, organizationNameError, serviceType, description,
    } = this.state;

    return (
      <React.Fragment>
        <Header />
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={phoneNumberError}
              error={phoneNumberError.length > 0}
              InputProps={{
                inputComponent: PhoneMask,
              }}
            />
          </Grid>
        </Grid>
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
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
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="serviceType"
              name="serviceType"
              label="Type of service"
              value={serviceType}
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={description}
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSave}
          className={classes.button}
        >
              Save
        </Button>
      </React.Fragment>
    );
  }
}

EditBusiness.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EditBusiness);
