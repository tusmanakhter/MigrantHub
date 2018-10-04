import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { BrowserRouter } from "react-router-dom";

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

const organizationTypes = [
  { value : 'FDRL', label : 'Federal'},
  { value : 'PROV', label : "Provincial"},
  { value : 'NGOV', label : "Non-governmental"}
];
  
// https://www.canada.ca/en/government/dept.html
// https://libguides.smu.ca/govdoc/canada/departments
const federalDepartments = [
  { value : 'INDI', label : 'Indigenous and Northern Affairs Canada'},
  { value : 'AGRI', label : 'Agriculture and Agri-Food Canada'},
  { value : 'ATLA', label : 'Atlantic Canada Opportunities Agency'},
  { value : 'AUDI', label : 'Auditor General of Canada, Office of the'},
  { value : 'BANK', label : 'Bank of Canada'},
  { value : 'HOUS', label : 'Canada Mortgage and Housing Corporation'},
  { value : 'REVE', label : 'Canada Revenue Agency'},
  { value : 'HERE', label : 'Canadian Heritage'},
  { value : 'IMMI', label : 'Citizenship and Immigration Canada'},
  { value : 'EMPL', label : 'Employment and Social Development Canada'},
  { value : 'ENVR', label : 'Environment Canada'},
  { value : 'FINA', label : 'Finance Canada'},
  { value : 'FISH', label : 'Fisheries and Oceans Canada'},
  { value : 'GLOB', label : 'Global Affairs Canada'},
  { value : 'GGOV', label : 'Governor General of Canada'},
  { value : 'HLTH', label : 'Health Canada'},
  { value : 'INFR', label : 'Infrastructure Canada'},
  { value : 'INTR', label : 'Intergovernmental Affairs'},
  { value : 'JUST', label : 'Department of Justice'},
  { value : 'ARCH', label : 'Library and Archives Canada'},
  { value : 'ARMY', label : 'National Defence and the Canadian Armed Forces'},
  { value : 'PUBL', label : 'Public Works and Government Services Canada'},
  { value : 'STAT', label : 'Statistics Canada'},
  { value : 'TRAN', label : 'Transport Canada'},
  { value : 'TREA', label : 'Treasury Board of Canada'},
  { value : 'HUMN', label : 'Canadian Human Rights Commission'},
];
  
 // https://en.wikipedia.org/wiki/Departments_of_the_Quebec_Government
 // https://www.ontario.ca/page/ministries
 const provincialDepartments = [
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
 ];

const serviceTypes = [
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
];

class SignUpMerchant extends Component {
  state = {
    email: '',
    password: '',

    merchantName: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',

    organizationName: '',
    orgType: '',
    province: '',
    department: '',
    serviceType:'',
    description:'',

    showPassword: false
  }
  
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
        <div className="SignUpMerchant">
            <form>
              <h1>Sign Up</h1>
              <section>
                <h2>Account Information</h2>
                <TextField 
                  name="email"
                  label="Email"
                  value={this.state.email}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <FormControl margin="normal">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </section>
              <section>
                <h2>Contact Information</h2>
                <TextField 
                  name="merchantName"
                  label="Name"
                  value={this.state.merchantName}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="address"
                  label="Street Address"
                  placeholder="Street and number"
                  value={this.state.address}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="apartment"
                  label="Apartment"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  value={this.state.apartment}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="city"
                  label="City"
                  value={this.state.city}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField
                  name="province"
                  select
                  label="Province/Territory"
                  value={this.state.province}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a province/territory"
                >
                  {provinces.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField 
                  name="postalCode"
                  label="Postal Code"
                  value={this.state.postalCode}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="phoneNumber"
                  label="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
              </section>
              <section>
                <h2>About Information</h2>
                <TextField 
                  name="organizationName"
                  label="Organization Name"
                  value={this.state.organizationName}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="orgType"
                  select
                  label="Organization Type"
                  value={this.state.address}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select an organization type"
                >
                  {organizationTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField 
                  name="province"
                  select
                  label="Province/Territory"
                  value={this.state.province}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a province/territory"
                >
                {provinces.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField 
                  name="department"
                  select
                  label="Department"
                  value={this.state.department}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a department"
                >
                {federalDepartments.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField 
                  name="serviceType"
                  select
                  label="Service Type"
                  value={this.state.serviceType}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a service type"
                >
                {serviceTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField 
                  name="description"
                  label="Description"
                  value={this.state.description}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
              </section>
              <Button onClick={event => this.onSubmit(event)}>Submit</Button>
            </form>
        </div>
    );
  }
}

export default SignUpMigrant;