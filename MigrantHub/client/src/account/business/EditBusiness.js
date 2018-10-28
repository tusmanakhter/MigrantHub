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

var qs = require('qs');

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
      mask={[/[a-zA-Z]/, /\d/, /[a-zA-Z]/, ' ', /\d/, /[a-zA-Z]/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
}

const organizationTypes = [
    { value: 'FDRL', label: 'Federal' },
    { value: 'NGOV', label: "Non-governmental" },
    { value: 'PROV', label: "Provincial" }
  ];

const styles = theme => ({
  select: {
    textAlign: 'left'
  }
});
class EditBusiness extends Component {
    constructor(props){
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
            orgTypeError: '',
            departmentError: '',
            serviceTypeError: '',
            descriptionError: '',

            email: '',
            corpId: '',
            password: '',
            confirmPassword: '',
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
        }

        this.getAccount = this.getAccount.bind(this);
  }

  componentDidMount(){

    this.getAccount(this);
    console.log(this.state.email);
  }

  componentWillReceiveProps(){
    this.getAccount(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave = async () => {
    let error = await this.validate();

    if (!error) {
      this.updateAccount(this);
    }
  };

  updateAccount(e) {
    axios.post('/account/edit/businessuser',
    qs.stringify({
      email: e.state.email,
      corpId: e.state.corpId,
      password: e.state.password,
      confirmPassword: e.state.confirmPassword,
      firstName: e.state.firstName,
      lastName: e.state.lastName,
      address: e.state.address,
      apartment: e.state.apartment,
      city: e.state.city,
      province: e.state.province,
      postalCode: e.state.postalCode,
      phoneNumber: e.state.phoneNumber,
      organizationName: e.state.organizationName,
      orgType: e.state.orgType,
      department: e.state.department,
      serviceType: e.state.serviceType,
      description: e.state.description,

    })).then(function (response) {
    e.setState({
        messageFromServer: response.data
    });
});}

  getAccount(e) {
    axios.get('/account/get/businessprofile').then(function (response) {

      let jsonObj = qs.parse(qs.stringify(response.data));

        if(response.status===200){
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
              })
        }
   
}).catch(function(error){

console.log(error);
})
};

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
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
    };

    if (validator.isEmpty(this.state.firstName)) {
      errors.firstNameError = "First name is required";
      isError = true
    } else if (!validator.isAlpha(this.state.firstName)) {
      errors.firstNameError = "First name is not valid"
      isError = true
    }

    if (validator.isEmpty(this.state.lastName)) {
      errors.lastNameError = "Last name is required";
      isError = true
    } else if (!validator.isAlpha(this.state.lastName)) {
      errors.lastNameError = "Last name is not valid"
      isError = true
    }
   
    if (validator.isEmpty(this.state.address)) {
      errors.addressError = "Address is required";
      isError = true
    }

    if (validator.isEmpty(this.state.city)) {
      errors.cityError = "City is required";
      isError = true
    } else if (!validator.isAlpha(this.state.city)) {
      errors.cityError = "This is not a valid city"
      isError = true
    }

    if (validator.isEmpty(this.state.province)) {
      errors.provinceError = "Province is required";
      isError = true
    }

    if (validator.isEmpty(this.state.postalCode)) {
      errors.postalCodeError = "Postal code is required";
      isError = true
    } else if (!validator.isLength(this.state.postalCode, {min:7, max:7})) {
      errors.postalCodeError = "Postal code is invalid";
      isError = true
    }

    if (validator.isEmpty(this.state.phoneNumber)) {
      errors.phoneNumberError = "Phone number is required";
      isError = true
    } else if (!validator.isLength(this.state.phoneNumber, {min:14, max:14})) {
      errors.phoneNumberError = "Phone number is invalid";
      isError = true
    }

    if (validator.isEmpty(this.state.organizationName)) {
        errors.organizationNameError = "Organization name is required";
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
            value={this.state.firstName}
            onChange={event => this.handleChange(event)}
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
            value={this.state.lastName}
            onChange={event => this.handleChange(event)}
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
            value={this.state.address}
            onChange={event => this.handleChange(event)}
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
            value={this.state.apartment}
            onChange={event => this.handleChange(event)}
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
            value={this.state.city}
            onChange={event => this.handleChange(event)}
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
            value={this.state.province}
            className={classes.select}
            onChange={event => this.handleChange(event)}
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
            value={this.state.postalCode}
            onChange={ event => this.handleChange(event)}
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
            value={this.state.phoneNumber}
            onChange={ event => this.handleChange(event)}
            fullWidth
            helperText={this.state.phoneNumberError}
            error={this.state.phoneNumberError.length > 0}
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
              value={this.state.organizationName}
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={this.state.organizationNameError}
              error={this.state.organizationNameError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="orgType"
              name="orgType"
              label="Organization Type"
              value={this.state.orgType}
              onChange={event =>this.handleChange(event)}
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
              value={this.state.department}
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="serviceType"
              name="serviceType"
              label="Type of service"
              value={this.state.serviceType}
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={this.state.description}
              onChange={event => this.handleChange(event)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button 
            variant="contained"
            color="primary"
            onClick={this.handleSave} className={classes.button}>
            Save
        </Button>
      </React.Fragment>
    );
  }
}

EditBusiness.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBusiness);
