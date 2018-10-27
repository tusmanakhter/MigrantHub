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
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {languages as languagesData} from 'country-data'
import deburr from 'lodash/deburr';
import NumberFormat from 'react-number-format';
import {cities} from 'canada'

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

const proficiencyExaminations = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'french', label: 'French' }
]

const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const relations = [
  { value: 'daughter', label: 'Daughter' },
  { value: 'son', label: 'Son' },
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
]

const relationshipStatus = [
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
]

const familyObject = { age: '', gender: '', relation: '', relationshipStatus: '' };

const statuses = [
  { value: 'immigrant', label: 'Immigrant' },
  { value: 'refugee', label: 'Refugee' },
  { value: 'resident', label: 'Permanent Resident' },
  { value: 'citizen', label: 'Citizen' }
];

const languageLevels = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const languages = languagesData.all.filter(word => !(/\d/.test(word.name)))

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : languages.filter(language => {
    const keep = count < 5 && language.name.slice(0, inputLength).toLowerCase() === inputValue;
    
    if (keep) {
      count++;
    }

    return keep;
  });
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
};

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
};

const langObject = { name: '', writingLevel: '', speakingLevel: '' };

const jobStatuses = [
  { value: 'fulltime', label: 'Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
]

const lookingForJobOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

const workObject = { title: '', company: '', years: '' };

const IncomeMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      onValueChange={values => {
        onChange({
            target: {
              name: props.name,
              value: values.value,
            },
        });
      }}
      thousandSeparator={true} 
      prefix={'$'}
    />
  );
}

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' }
]

const getSuggestionsCity = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : cities.filter(city => {
    const keep = count < 5 && (city[0] + ", " + city[1]).slice(0, inputLength).toLowerCase() === inputValue;
    
    if (keep) {
      count++;
    }

    return keep;
  });
};

const getSuggestionValueCity = suggestion => (suggestion[0] + ", " + suggestion[1]);

const renderSuggestionCity = (suggestion, { query, isHighlighted }) => {
  const matches = match((suggestion[0] + ", " + suggestion[1]), query);
  const parts = parse((suggestion[0] + ", " + suggestion[1]), matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
};

const styles = theme => ({
  select: {
    textAlign: 'left'
  },
  group: {
    flexDirection: 'row'
  },
  formControl: {
    textAlign: 'left'
  },
  container: {
    position: 'relative',
  },
  row: {
    display: 'inline-block'
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
  layout: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },},
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});
class EditMigrant extends Component {
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
            ageError: '',
            genderError: '',
            nationalityError: '',
            relationshipStatusError: '',
            statusError: '',
            suggestions: [],
            languagesError: [],
            writingLevelError: '',
            speakingLevelError: '',
            motherTongueError: '',
            educationLevelError: '',
            familyError: [],
            jobStatusError: '',
            lookingForJobError: '',
            workExperienceError: [],
            suggestionsCity: [],
            settlingLocationError: '',
            settlingDurationError: '',
            joiningReasonError: '',

            email: '',
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
            age: '',
            gender: '',
            nationality: '',
            relationshipStatus: '',
            status: '',
            languages: [],
            writingLevel: '',
            speakingLevel: '',
            motherTongue: '',
            family: [],
            educationLevel: '',
            proficiencyExams: {
              ielts: false,
              french: false,
              others: '',
            },
            jobStatus: '',
            lookingForJob: '',
            currentIncome: '',
            workExperience: [],
            settlingLocation: '',
            settlingDuration: '',
            joiningReason: '',
          }

          //this.getAccount(this);
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

  handleChangeExams = (name) => (event) => {
    let proficiencyExams = { ...this.state.proficiencyExams };
    proficiencyExams[name] = event.target.checked;
    this.setState({ proficiencyExams });
  }

  handleSave = async () => {
      this.updateAccount(this);
  };

  handleEditSingleObject = (name, fieldName) => (event) => {
    let obj = {};
    obj[name] = { ...this.state[name] };
    let value = ((event.target.type === 'checkbox') ? event.target.checked :
      event.target.value);
    obj[name][fieldName] = value;
    this.setState({ [name]: obj[name] });
  }

  handleAddObject = (name, object) => {
    this.setState({
      [name]: this.state[name].concat([object]),
    });
  }

  handleRemoveObject = (name, index) => {
    this.setState({
      [name]: this.state[name].filter((s, _index) => _index !== index),
    });
  }

  handleEditObjectAutosuggest = (name, fieldName, index) => (event, { newValue }) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [fieldName]: newValue };
      }),
    });
  }

  handleEditObject = (name, index) => (event) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [event.target.name]: event.target.value };
      }),
    });
  }

  objectErrorText = (name, index, field) => {
    return this.state[name][index] === undefined ? "" : this.state[name][index][field] 
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleSuggestionsFetchRequestedCity = ({ value }) => {
    this.setState({
      suggestions: getSuggestionsCity(value),
    });
  };

  handleSuggestionsClearRequestedCity = () => {
    this.setState({
      suggestions: []
    });
  };

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  updateAccount(e) {
    axios.post('/account/edit/user',
    qs.stringify({
      email: e.state.email,
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
      age: e.state.age,
      gender: e.state.gender,
      nationality: e.state.nationality,
      relationshipStatus: e.state.relationshipStatus,
      status: e.state.status,
      languages: e.state.languages,
      writingLevel: e.state.writingLevel,
      speakingLevel: e.state.speakingLevel,
      motherTongue: e.state.motherTongue,
      family: e.state.family,
      educationLevel: e.state.educationLevel,
      proficiencyExams: e.state.proficiencyExams,
      jobStatus: e.state.jobStatus,
      lookingForJob: e.state.lookingForJob,
      currentIncome: e.state.currentIncome,
      workExperience: e.state.workExperience,
      settlingLocation: e.state.settlingLocation,
      settlingDuration: e.state.settlingDuration,
      joiningReason: e.state.joiningReason

    })).then(function (response) {
    e.setState({
        messageFromServer: response.data
    });
});}

getAccount(e) {
    console.log('olla2');

    axios.get('/account/get/profile').then(function (response) {
        console.log(response);
        console.log(response.data);

        if(response.status===200){
            console.log('here safe');
            e.setState({
                email: response.data.email,
                password: response.data.password,
                confirmPassword: response.data.confirmPassword,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                address: response.data.address,
                apartment: response.data.apartment,
                city: response.data.city,
                province: response.data.province,
                postalCode: response.data.postalCode,
                phoneNumber: response.data.phoneNumber,
                age: response.data.age,
                gender: response.data.gender,
                nationality: response.data.nationality,
                relationshipStatus: response.data.relationshipStatus,
                status: response.data.status,
                languages: response.data.languages,
                writingLevel: response.data.writingLevel,
                speakingLevel: response.data.speakingLevel,
                motherTongue: response.data.motherTongue,
                family: response.data.family,
                educationLevel: response.data.educationLevel,
                proficiencyExams: response.data.proficiencyExams,
                jobStatus: response.data.jobStatus,
                lookingForJob: response.data.lookingForJob,
                currentIncome: response.data.currentIncome,
                workExperience: response.data.workExperience,
                settlingLocation: response.data.settlingLocation,
                settlingDuration: response.data.settlingDuration,
                joiningReason: response.data.joiningReason
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
      ageError: '',
      genderError: '',
      nationalityError: '',
      relationshipStatusError: '',
      statusError: '',
      languagesError: [],
      writingLevelError: '',
      speakingLevelError: '',
      motherTongueError: '',
      educationLevelError: '',
      familyError: [],
      jobStatusError: '',
      lookingForJobError: '',
      workExperienceError: [],
      settlingLocationError: '',
      settlingDurationError: '',
      joiningReasonError: '',
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

    if (validator.isEmpty(this.props.educationLevel)) {
      errors.educationLevelError = "Education level is required";
      isError = true
    }

    if (validator.isEmpty(this.props.age)) {
      errors.ageError = "Age is required";
      isError = true
    }

    if (validator.isEmpty(this.props.gender)) {
      errors.genderError = "Gender is required";
      isError = true
    }
   
    if (validator.isEmpty(this.props.nationality)) {
      errors.nationalityError = "Nationality is required";
      isError = true
    } else if (!validator.isAlpha(this.props.nationality)) {
      errors.nationalityError = "This is not a valid nationality"
      isError = true
    }

    if (validator.isEmpty(this.props.relationshipStatus)) {
      errors.relationshipStatusError = "Relationship status is required";
      isError = true
    } 

    if (validator.isEmpty(this.props.status)) {
      errors.statusError = "Status is required";
      isError = true
    }

    if (validator.isEmpty(this.props.motherTongue)) {
      errors.motherTongueError = "Mother tongue is required";
      isError = true
    } else if (!validator.isAlpha(this.props.motherTongue)) {
      errors.motherTongueError = "Mother tongue is not valid"
      isError = true
    }

    if (validator.isEmpty(this.props.writingLevel)) {
      errors.writingLevelError = "Writing level is required";
      isError = true
    } 

    if (validator.isEmpty(this.props.speakingLevel)) {
      errors.speakingLevelError = "Speaking level is required";
      isError = true
    } 

    this.props.languages.forEach((language, index) => {
      errors.languagesError = errors.languagesError.concat([JSON.parse(JSON.stringify(langObject))]);
      if (validator.isEmpty(language.name)) {
        errors.languagesError[index].name = "Language name is required";
        isError = true
      } else if (!validator.isAlpha(language.name)) {
        errors.languagesError[index].name = "Language name is not valid"
        isError = true
      }
      if (validator.isEmpty(language.writingLevel)) {
        errors.languagesError[index].writingLevel = "Writing level is required";
        isError = true
      } 
  
      if (validator.isEmpty(language.speakingLevel)) {
        errors.languagesError[index].speakingLevel = "Speaking level is required";
        isError = true
      } 
    });

    this.props.family.forEach((member, index) => {
      errors.familyError = errors.familyError.concat([JSON.parse(JSON.stringify(familyObject))]);

      if (validator.isEmpty(member.age)) {
        errors.familyError[index].age = "Age is required";
        isError = true
      } 

      if (validator.isEmpty(member.gender)) {
        errors.familyError[index].gender = "Gender is required";
        isError = true
      } 

      if (validator.isEmpty(member.relationshipStatus)) {
        errors.familyError[index].relationshipStatus = "Relationship status is required";
        isError = true
      } 
  
      if (validator.isEmpty(member.relation)) {
        errors.familyError[index].relation = "Relation is required";
        isError = true
      } 
    });

    if (validator.isEmpty(this.props.jobStatus)) {
      errors.jobStatusError = "Job status is required";
      isError = true
    }

    if (validator.isEmpty(this.props.lookingForJob)) {
      errors.lookingForJobError = "This field is required";
      isError = true
    }

    this.props.workExperience.forEach((job, index) => {
      errors.workExperienceError = errors.workExperienceError.concat([JSON.parse(JSON.stringify(workObject))]);

      if (validator.isEmpty(job.title)) {
        errors.workExperienceError[index].title = "Title is required";
        isError = true
      } else if (!validator.isAlpha(job.title)) {
        errors.workExperienceError[index].title = "Title is not valid";
        isError = true
      } 

      if (validator.isEmpty(job.company)) {
        errors.workExperienceError[index].company = "Company is required";
        isError = true
      }

      if (validator.isEmpty(job.years)) {
        errors.workExperienceError[index].years = "Employment length is required";
        isError = true
      }
    });

    if (validator.isEmpty(this.props.settlingLocation)) {
      errors.settlingLocationError = "Settling location is required";
      isError = true
    }

    if (validator.isEmpty(this.props.settlingDuration)) {
      errors.settlingDurationError = "Settling duration is required";
      isError = true
    }

    if (validator.isEmpty(this.props.joiningReason)) {
      errors.joiningReasonError = "Joining reason is required";
      isError = true
    }

    this.setState({
      ...this.state,
      ...errors
    })
    
    return isError;
  }

  objectErrorText = (name, index, field) => {
    return this.state[name][index] === undefined ? "" : this.state[name][index][field] 
  }

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    const autosuggestCityProps = {
      renderInputComponent,
      suggestions: this.state.suggestionsCity,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequestedCity,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequestedCity,
      getSuggestionValueCity,
      renderSuggestionCity,
    };

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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
            onChange={event => this.handleChange(event) }
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
        Personal Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <TextField 
            id="age"
            name="age"
            label="Age"
            value={this.state.age}
            type="number"
            onChange={ event => this.handleChange(event)}
            fullWidth
            helperText={this.state.ageError}
            error={this.state.ageError.length > 0}
            InputProps={{
              endAdornment: <InputAdornment position="end">years</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            id="nationality" 
            name="nationality"
            label="Nationality"
            value={this.state.nationality}
            onChange={ event => this.handleChange(event)}
            fullWidth
            helperText={this.state.nationalityError}
            error={this.state.nationalityError.length > 0}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset" fullWidth className={classes.formControl}>
            <FormLabel component="legend" error={this.state.genderError.length > 0}>Gender</FormLabel>
            <RadioGroup
              aria-label="Gender"
              id="gender"
              name="gender"
              className={classes.group}
              value={this.state.gender}
              onChange={ event => this.handleChange(event)}
            >
              {gender.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                  {option.label}
                </FormControlLabel>
              ))}
            </RadioGroup>
            <FormHelperText
                error={this.state.genderError.length > 0}
              >
                {this.state.genderError}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="status"
            name="status"
            select
            label="Status"
            value={this.state.status}
            onChange={event => this.handleChange(event)}
            className={classes.select}
            fullWidth
            helperText={this.state.statusError}
            error={this.state.statusError.length > 0}
          >
            {statuses.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="relationshipStatus"
            name="relationshipStatus"
            select
            label="Relationship Status"
            value={this.state.relationshipStatus}
            onChange={event => this.handleChange(event)}
            className={classes.select}
            fullWidth
            helperText={this.state.relationshipStatusError}
            error={this.state.relationshipStatusError.length > 0}
          >
            {relationshipStatus.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Typography variant="title" gutterBottom>
      Language Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              label: 'Mother Tongue',
              value: this.state.motherTongue,
              onChange: this.handleAutoSuggestChange('motherTongue'),
              helperText: this.state.motherTongueError,
              error: this.state.motherTongueError.length > 0,
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="writingLevel"
            name="writingLevel"
            select
            label="Writing Level"
            value={this.state.writingLevel}
            onChange={event => this.handleChange(event)}
            fullWidth
            className={classes.select}
            helperText={this.state.writingLevelError}
            error={this.state.writingLevelError.length > 0}
          >
            {languageLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="speakingLevel"
            name="speakingLevel"
            select
            label="Speaking Level"
            value={this.state.speakingLevel}
            onChange={event => this.handleChange(event)}
            className={classes.select}
            fullWidth
            helperText={this.state.speakingLevelError}
            error={this.state.speakingLevelError.length > 0}
          >
            {languageLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add another language
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={event => this.handleAddObject("languages", langObject)}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
        {this.state.languages.map((language, index) => (
          <React.Fragment key={index}>
          <Grid container spacing={24} item xs={12} sm={11}>
            <Grid item xs={12} sm={4}>
              <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                    classes,
                    value: language.name,
                    label: "Language",
                    onChange: this.handleEditObjectAutosuggest("languages", "name", index),
                    helperText: this.objectErrorText("languagesError", index, "name"),
                    error: this.objectErrorText("languagesError", index, "name").length > 0,
                  }}
                  theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                  }}
                  renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                      {options.children}
                    </Paper>
                  )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="writingLevel"
                name="writingLevel"
                select
                label="Writing Level"
                value={language.writingLevel}
                onChange={this.handleEditObject("languages", index)}
                className={classes.select}
                fullWidth
                helperText={this.objectErrorText("languagesError", index, "writingLevel")}
                error={this.objectErrorText("languagesError", index, "writingLevel").length > 0}
              >
                {languageLevels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="speakingLevel"
                name="speakingLevel"
                select
                label="Speaking Level"
                value={language.speakingLevel}
                onChange={this.handleEditObject("languages", index)}
                className={classes.select}
                fullWidth
                helperText={this.objectErrorText("languagesError", index, "speakingLevel")}
                error={this.objectErrorText("languagesError", index, "speakingLevel").length > 0}
              >
                {languageLevels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button variant="fab" mini aria-label="Delete" 
                  onClick={(event) => this.handleRemoveObject("languages", index, event)}
                  className={classes.button}>
            <DeleteIcon />
          </Button>
          </Grid>
          </React.Fragment>
          ))} 
      </Grid>
      <Typography variant="title" gutterBottom>
        Family Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add family member
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={event => this.handleAddObject("family", familyObject)}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
      {this.state.family.map((member, index) => (
          <React.Fragment key={index}>
          <Paper className={classes.paper}>
          <Typography variant="subheading" align="left" gutterBottom>
          Member {index+1}
          </Typography>
          <Grid justify="center" alignItems="center" container item xs>
            <Grid container spacing={24} item xs={11}>
              <Grid item xs={12} sm={4}>
                <TextField 
                  id="age"
                  name="age"
                  label="Age"
                  value={member.age}
                  type="number"
                  onChange={this.handleEditObject("family", index)}
                  helperText={this.objectErrorText("familyError", index, "age")}
                  error={this.objectErrorText("familyError", index, "age").length > 0}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">years</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="relationshipStatus"
                  name="relationshipStatus"
                  select
                  label="Relationship Status"
                  value={member.relationshipStatus}
                  onChange={this.handleEditObject("family", index)}
                  className={classes.select}
                  helperText={this.objectErrorText("familyError", index, "relationshipStatus")}
                  error={this.objectErrorText("familyError", index, "relationshipStatus").length > 0}
                  fullWidth
                >
                  {relationshipStatus.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="relation"
                  name="relation"
                  select
                  label="Relation to you"
                  value={member.relation}
                  onChange={this.handleEditObject("family", index)}
                  className={classes.select}
                  helperText={this.objectErrorText("familyError", index, "relation")}
                  error={this.objectErrorText("familyError", index, "relation").length > 0}
                  fullWidth
                >
                  {relations.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth className={classes.formControl}>
                  <FormLabel component="legend" 
                  error={this.objectErrorText("familyError", index, "gender").length > 0}>Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    id="gender"
                    name="gender"
                    className={classes.group}
                    value={member.gender}
                    onChange={this.handleEditObject("family", index)}
                  >
                    {gender.map(option => (
                      <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                        {option.label}
                      </FormControlLabel>
                    ))}
                  </RadioGroup>
                  <FormHelperText
                      error={this.objectErrorText("familyError", index, "gender").length > 0}
                    >
                      {this.objectErrorText("familyError", index, "gender")}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={1}>
            <Button variant="fab" mini aria-label="Delete" 
                    onClick={(event) => this.handleRemoveObject("family", index, event)}
                    className={classes.button}>
              <DeleteIcon />
            </Button>
            </Grid>   
          </Grid>
          </Paper>
          </React.Fragment>
          ))}
          </Grid>
      <Typography variant="title" gutterBottom>
        Education Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            name="educationLevel"
            select
            label="Education Level"
            value={this.state.educationLevel}
            onChange={event => this.handleChange(event) }
            className={classes.select}
            fullWidth
            helperText={this.state.educationLevelError}
            error={this.state.educationLevelError.length > 0}
          >
            {educationLevels.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} s={3}>
          <FormControl component="fieldset" fullWidth className={classes.formControl}>
            <FormLabel component="legend">Proficiency Exams</FormLabel>
            <FormGroup className={classes.group} name="proficiencyExams">
              {proficiencyExaminations.map(option => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        name={option.value}
                        checked={this.state.proficiencyExams[option.value]}
                        onChange={this.handleEditSingleObject("proficiencyExams", option.value)}
                      />
                    }
                    label={option.label}
                  />
                ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={9} s={9}>
          <TextField
            id="others" 
            name="others"
            label="Others"
            value={this.state.proficiencyExams.others}
            onChange={this.handleEditSingleObject("proficiencyExams", "others")}
            fullWidth
          />
        </Grid>
      </Grid>
      <Typography variant="title" gutterBottom>
        Employment Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="jobStatus"
            select
            label="Job Status"
            value={this.state.jobStatus}
            onChange={event => this.handleChange(event)}
            className={classes.select}
            fullWidth
            helperText={this.state.jobStatusError}
            error={this.state.jobStatusError.length > 0}
          >
            {jobStatuses.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
              name="currentIncome"
              label="Current Income (Optional)"
              value={this.state.currentIncome}
              onChange={ event => this.handleChange(event)}
              fullWidth
              InputProps={{
                inputComponent: IncomeMask,
              }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset" fullWidth className={classes.formControl}>
            <FormLabel component="legend" error={this.state.lookingForJobError.length > 0}>Looking for a job?</FormLabel>
            <RadioGroup
              aria-label="Looking for a job?"
              id="lookingForJob"
              name="lookingForJob"
              className={classes.group}
              value={this.state.lookingForJob}
              onChange={ event => this.handleChange(event) }
            >
              {lookingForJobOptions.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                  {option.label}
                </FormControlLabel>
              ))}
            </RadioGroup>
            <FormHelperText
                error={this.state.lookingForJobError.length > 0}
              >
                {this.state.lookingForJobError}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add work experience
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={event => this.handleAddObject("workExperience", workObject)}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
        {this.state.workExperience.map((work, index) => (
          <React.Fragment key={index}>
          <Grid container spacing={24} item xs={12} sm={11}>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="title"
                name="title"
                label="Title"
                value={work.title}
                onChange={this.handleEditObject("workExperience", index)}
                helperText={this.objectErrorText("workExperienceError", index, "title")}
                error={this.objectErrorText("workExperienceError", index, "title").length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="company"
                name="company"
                label="Company"
                value={work.company}
                onChange={this.handleEditObject("workExperience", index)}
                helperText={this.objectErrorText("workExperienceError", index, "company")}
                error={this.objectErrorText("workExperienceError", index, "company").length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="years"
                name="years"
                label="Employment length"
                value={work.years}
                onChange={this.handleEditObject("workExperience", index)}
                helperText={this.objectErrorText("workExperienceError", index, "years")}
                error={this.objectErrorText("workExperienceError", index, "years").length > 0}
                fullWidth
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button variant="fab" mini aria-label="Delete" 
                  onClick={(event) => this.handleRemoveObject("workExperience", index, event)}
                  className={classes.button}>
            <DeleteIcon />
          </Button>
          </Grid>
          </React.Fragment>
          ))}
      </Grid>  
      <Typography variant="title" gutterBottom>
      Other Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Autosuggest
            {...autosuggestCityProps}
            inputProps={{
              classes,
              label: 'Settling Location',
              value: this.state.settlingLocation,
              onChange: this.handleAutoSuggestChange('settlingLocation'),
              helperText: this.state.settlingLocationError,
              error: this.state.settlingLocationError.length > 0,
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="settlingDuration"
            name="settlingDuration"
            label="Settling Duration"
            value={this.state.settlingDuration}
            onChange={ event => this.handleChange(event)}
            fullWidth
            type="number"
            helperText={this.state.settlingDurationError}
            error={this.state.settlingDurationError.length > 0}
            InputProps={{
              endAdornment: <InputAdornment position="end">years</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="joiningReason"
            name="joiningReason"
            select
            label="Reason for joining"
            value={this.state.joiningReason}
            onChange={event => this.handleChange(event)}
            className={classes.select}
            fullWidth
            helperText={this.state.joiningReasonError}
            error={this.state.joiningReasonError.length > 0}
          >
            {joiningReasons.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

EditMigrant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditMigrant);
