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

const status = [
  { value: 'immigrant', label: 'Immigrant' },
  { value: 'refugee', label: 'Refugee' },
  { value: 'resident', label: 'Permanent Resident' },
  { value: 'citizen', label: 'Citizen' }
];

const educationLevels = [
  { value: 'earlyChildhood', label: 'Early childhood' },
  { value: 'elementary', label: 'Elementary' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'secondary', label: 'High School/Secondary' },
  { value: 'trade', label: 'Trade/Vocational School' },
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Mastors' },
  { value: 'doctorate', label: 'Ph.D/Doctorate' }
];

const proficiencyExams = [
  { value: 'proficiencyExams.ielts', label: 'IELTS' },
  { value: 'proficiencyExams.french', label: 'French' }
]

const jobStatus = [
  { value: 'fulltime', label: 'Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
]

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Gind Job' }
]

class SignUpMigrant extends Component {
  state = {
    email: '',
    password: '',

    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',

    age: '',
    sex: '',
    nationality: '',
    status: '',

    languages: '',
    languageLevels: '',
    motherTongue: '',
  

    educationLevel: '',
    proficiencyExams: {
      ielts: '',
      french: '',
      other: ''
    },

    workExperience: '', //optional
    jobStatus: '',
    currentIncome: '', //optional

    // how many immediate family coming, ages, single/married etc?
    familyUnit: {
      familySize: '',
      familyMembers: []
    },

    settlingLocation: '',
    settlingDuration: '',
    joiningReason: '',

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
        <div className="SignUpMigrant">
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
                  name="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="lastName"
                  label="Last Name"
                  value={this.state.lastName}
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
                <h2>About You</h2>
                <TextField 
                  name="age"
                  label="Age"
                  value={this.state.age}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="sex"
                  label="Sex"
                  value={this.state.sex}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField 
                  name="nationality"
                  label="Natioanlity"
                  value={this.state.nationality}
                  onChange={ event => this.handleChange(event)}
                  margin="normal"
                />
                <TextField
                  name="status"
                  select
                  label="Status"
                  value={this.state.status}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a status"
                >
                  {status.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </section>
              <section>
                <h2>Language Information</h2>
                <TextField 
                    name="languages"
                    label="Languages"
                    value={this.state.languages}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
                <TextField 
                    name="languagesLevels"
                    label="Language Levels"
                    value={this.state.languageLevels}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
                <TextField 
                    name="motherTongue"
                    label="Mother Tongue"
                    value={this.state.mothertongue}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
              </section>
              <section>
                <h2>Family Information</h2>
                <TextField 
                    name="familyUnit"
                    label="Family Unit"
                    value={this.state.familyUnit}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
              </section>
              <section>
                <h2>Education Information</h2>
                <TextField
                  name="educationLevel"
                  select
                  label="Education Level"
                  value={this.state.educationLevel}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select an education level"
                >
                  {educationLevels.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Proficiency Exams</FormLabel>
                  <FormGroup name="proficiencyExams">
                    {proficiencyExams.map(option => (
                        <FormControlLabel
                          key={option.value}
                          control={
                            <Checkbox
                              name={option.value}
                              checked={option.value}
                              onChange={ event => this.handleChange(event)}
                            />
                          }
                          label={option.label}
                        />
                      ))}
                  </FormGroup>
                </FormControl>
              </section>
              <section>
                <h2>Job Information</h2>
                <TextField 
                    name="workExperience"
                    label="Work Experience (Optional)"
                    value={this.state.workExperience}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
               <TextField
                  name="jobStatus"
                  select
                  label="Job Status"
                  value={this.state.jobStatus}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a job status"
                >
                  {jobStatus.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField 
                    name="currentIncome"
                    label="Current Income (Optional)"
                    value={this.state.currentIncome}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
              </section>
              <section>
                <h2>Other Info</h2>
                <TextField 
                    name="settlingLocation"
                    label="Settling Location"
                    value={this.state.settlingLocation}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
                <TextField 
                    name="settlingDuration"
                    label="Settling Duration"
                    value={this.state.settlingDuration}
                    onChange={ event => this.handleChange(event)}
                    margin="normal"
                />
                <TextField
                  name="joiningReason"
                  select
                  label="Reason for joining"
                  value={this.state.joiningReason}
                  onChange={event => this.handleChange(event)}
                  margin="normal"
                  helperText="Please select a joining reason"
                >
                  {joiningReasons.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </section>
              <Button onClick={event => this.onSubmit(event)}>Submit</Button>
            </form>
        </div>
    );
  }
}

export default SignUpMigrant;