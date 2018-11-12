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
import { languages as languagesData } from 'country-data';
import deburr from 'lodash/deburr';
import NumberFormat from 'react-number-format';
import { cities } from 'canada';
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

const educationLevels = [
  { value: 'earlyChildhood', label: 'Early childhood' },
  { value: 'elementary', label: 'Elementary' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'secondary', label: 'High School/Secondary' },
  { value: 'trade', label: 'Trade/Vocational School' },
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Mastors' },
  { value: 'doctorate', label: 'Ph.D/Doctorate' },
];

const proficiencyExaminations = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'french', label: 'French' },
];

const genderOptions = [
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
];

const relationshipStatusOptions = [
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

const familyObject = {
  age: '', gender: '', relation: '', relationshipStatus: '',
};

const statuses = [
  { value: 'immigrant', label: 'Immigrant' },
  { value: 'refugee', label: 'Refugee' },
  { value: 'resident', label: 'Permanent Resident' },
  { value: 'citizen', label: 'Citizen' },
];

const languageLevels = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const languagesList = languagesData.all.filter(word => !(/\d/.test(word.name)));

const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : languagesList.filter((language) => {
    const keep = count < 5 && language.name.slice(0, inputLength).toLowerCase() === inputValue;

    if (keep) {
      count += 1;
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
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
};

const renderInputComponent = (inputProps) => {
  const {
    classes, inputRef = () => {}, ref, ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
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
  { value: 'student', label: 'Student' },
];

const lookingForJobOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

const workObject = { title: '', company: '', years: '' };

const IncomeMask = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
};

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' },
];

const getSuggestionsCity = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : cities.filter((city) => {
    const keep = count < 5 && (`${city[0]}, ${city[1]}`).slice(0, inputLength).toLowerCase() === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

const getSuggestionValueCity = suggestion => (`${suggestion[0]}, ${suggestion[1]}`);

const renderSuggestionCity = (suggestion, { query, isHighlighted }) => {
  const matches = match((`${suggestion[0]}, ${suggestion[1]}`), query);
  const parts = parse((`${suggestion[0]}, ${suggestion[1]}`), matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
};

const styles = theme => ({
  select: {
    textAlign: 'left',
  },
  group: {
    flexDirection: 'row',
  },
  formControl: {
    textAlign: 'left',
  },
  container: {
    position: 'relative',
  },
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    width: '100%',
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
    },
  },
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
    };

    // this.getAccount(this);
    this.getAccount = this.getAccount.bind(this);
  }

  componentDidMount() {
    this.getAccount(this);
  }

  componentWillReceiveProps() {
    this.getAccount(this);
  }

  getAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get('/api/migrants/' + user.username).then((response) => {
      if (response.status === 200) {
        const jsonObj = qs.parse(qs.stringify(response.data));

        let tempLanguages;
        let tempWorkExperience;
        let tempFamily;

        if (jsonObj.languages !== undefined) {
          tempLanguages = jsonObj.languages;
        } else {
          tempLanguages = [];
        }

        if (jsonObj.workExperience !== undefined) {
          tempWorkExperience = jsonObj.workExperience;
        } else {
          tempWorkExperience = [];
        }

        if (jsonObj.family !== undefined) {
          tempFamily = jsonObj.family;
        } else {
          tempFamily = [];
        }

        this.setState({
          email: jsonObj.email,
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
          age: jsonObj.age,
          gender: jsonObj.gender,
          nationality: jsonObj.nationality,
          relationshipStatus: jsonObj.relationshipStatus,
          status: jsonObj.status,
          languages: tempLanguages,
          writingLevel: jsonObj.writingLevel,
          speakingLevel: jsonObj.speakingLevel,
          motherTongue: jsonObj.motherTongue,
          family: tempFamily,
          educationLevel: jsonObj.educationLevel,
          proficiencyExams: response.data.proficiencyExams,
          jobStatus: jsonObj.jobStatus,
          lookingForJob: jsonObj.lookingForJob,
          currentIncome: jsonObj.currentIncome,
          workExperience: tempWorkExperience,
          settlingLocation: jsonObj.settlingLocation,
          settlingDuration: jsonObj.settlingDuration,
          joiningReason: jsonObj.joiningReason,
        });
      }
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSave = async () => {
    const error = await this.validate();

    if (!error) {
      this.updateAccount(this);
    }
  };

  handleEditSingleObject = (name, fieldName) => (event) => {
    const obj = {};
    obj[name] = { ...this.state[name] };
    const value = ((event.target.type === 'checkbox') ? event.target.checked
      : event.target.value);
    obj[name][fieldName] = value;
    this.setState({
      [name]: obj[name],
    });
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

  objectErrorText = (name, index, field) => (this.state[name][index] === undefined ? '' : this.state[name][index][field])

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
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
      suggestions: [],
    });
  };

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  objectErrorText = (name, index, field) => (this.state[name][index] === undefined ? '' : this.state[name][index][field])

  validate = () => {
    const {
      firstName, lastName, address, city, province, postalCode, phoneNumber, age, gender,
      nationality, relationshipStatus, status, languages, writingLevel, speakingLevel,
      motherTongue, family, educationLevel, jobStatus, lookingForJob, workExperience,
      settlingLocation, settlingDuration, joiningReason,
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

    if (validator.isEmpty(educationLevel)) {
      errors.educationLevelError = 'Education level is required';
      isError = true;
    }

    if (validator.isEmpty(age)) {
      errors.ageError = 'Age is required';
      isError = true;
    }

    if (validator.isEmpty(gender)) {
      errors.genderError = 'Gender is required';
      isError = true;
    }

    if (validator.isEmpty(nationality)) {
      errors.nationalityError = 'Nationality is required';
      isError = true;
    } else if (!validator.isAlpha(nationality)) {
      errors.nationalityError = 'This is not a valid nationality';
      isError = true;
    }

    if (validator.isEmpty(relationshipStatus)) {
      errors.relationshipStatusError = 'Relationship status is required';
      isError = true;
    }

    if (validator.isEmpty(status)) {
      errors.statusError = 'Status is required';
      isError = true;
    }

    if (validator.isEmpty(motherTongue)) {
      errors.motherTongueError = 'Mother tongue is required';
      isError = true;
    } else if (!validator.isAlpha(motherTongue)) {
      errors.motherTongueError = 'Mother tongue is not valid';
      isError = true;
    }

    if (validator.isEmpty(writingLevel)) {
      errors.writingLevelError = 'Writing level is required';
      isError = true;
    }

    if (validator.isEmpty(speakingLevel)) {
      errors.speakingLevelError = 'Speaking level is required';
      isError = true;
    }

    languages.forEach((language, index) => {
      errors.languagesError = errors.languagesError.concat([JSON.parse(
        JSON.stringify(langObject),
      )]);
      if (validator.isEmpty(language.name)) {
        errors.languagesError[index].name = 'Language name is required';
        isError = true;
      } else if (!validator.isAlpha(language.name)) {
        errors.languagesError[index].name = 'Language name is not valid';
        isError = true;
      }
      if (validator.isEmpty(language.writingLevel)) {
        errors.languagesError[index].writingLevel = 'Writing level is required';
        isError = true;
      }

      if (validator.isEmpty(language.speakingLevel)) {
        errors.languagesError[index].speakingLevel = 'Speaking level is required';
        isError = true;
      }
    });

    family.forEach((member, index) => {
      errors.familyError = errors.familyError.concat([JSON.parse(JSON.stringify(familyObject))]);

      if (validator.isEmpty(member.age)) {
        errors.familyError[index].age = 'Age is required';
        isError = true;
      }

      if (validator.isEmpty(member.gender)) {
        errors.familyError[index].gender = 'Gender is required';
        isError = true;
      }

      if (validator.isEmpty(member.relationshipStatus)) {
        errors.familyError[index].relationshipStatus = 'Relationship status is required';
        isError = true;
      }

      if (validator.isEmpty(member.relation)) {
        errors.familyError[index].relation = 'Relation is required';
        isError = true;
      }
    });

    if (validator.isEmpty(jobStatus)) {
      errors.jobStatusError = 'Job status is required';
      isError = true;
    }

    if (validator.isEmpty(lookingForJob)) {
      errors.lookingForJobError = 'This field is required';
      isError = true;
    }

    workExperience.forEach((job, index) => {
      errors.workExperienceError = errors.workExperienceError.concat([JSON.parse(
        JSON.stringify(workObject),
      )]);

      if (validator.isEmpty(job.title)) {
        errors.workExperienceError[index].title = 'Title is required';
        isError = true;
      } else if (!validator.isAlpha(job.title)) {
        errors.workExperienceError[index].title = 'Title is not valid';
        isError = true;
      }

      if (validator.isEmpty(job.company)) {
        errors.workExperienceError[index].company = 'Company is required';
        isError = true;
      }

      if (validator.isEmpty(job.years)) {
        errors.workExperienceError[index].years = 'Employment length is required';
        isError = true;
      }
    });

    if (validator.isEmpty(settlingLocation)) {
      errors.settlingLocationError = 'Settling location is required';
      isError = true;
    }

    if (validator.isEmpty(settlingDuration)) {
      errors.settlingDurationError = 'Settling duration is required';
      isError = true;
    }

    if (validator.isEmpty(joiningReason)) {
      errors.joiningReasonError = 'Joining reason is required';
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  updateAccount(e) {
    const {
      email, password, confirmPassword, firstName, lastName, address, apartment, city, province,
      postalCode, phoneNumber, age, gender, nationality, relationshipStatus, status,
      languages, writingLevel, speakingLevel, motherTongue, family, educationLevel,
      proficiencyExams, jobStatus, lookingForJob, currentIncome, workExperience,
      settlingLocation, settlingDuration, joiningReason,
    } = this.state;

    axios.put('/api/migrants/' + email,
      qs.stringify({
        email,
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
        age,
        gender,
        nationality,
        relationshipStatus,
        status,
        languages,
        writingLevel,
        speakingLevel,
        motherTongue,
        family,
        educationLevel,
        proficiencyExams,
        jobStatus,
        lookingForJob,
        currentIncome,
        workExperience,
        settlingLocation,
        settlingDuration,
        joiningReason,

      })).then((response) => {
      e.setState({
        messageFromServer: response.data,
      });
    });
  }

  render() {
    const {
      firstNameError, lastNameError, addressError, apartmentError, cityError,
      provinceError, postalCodeError, phoneNumberError, ageError, genderError, nationalityError,
      relationshipStatusError, statusError, writingLevelError, speakingLevelError,
      motherTongueError, educationLevelError, jobStatusError, lookingForJobError,
      settlingLocationError, settlingDurationError, joiningReasonError, firstName, lastName,
      address, apartment, city, province, postalCode, phoneNumber, age, gender, nationality,
      relationshipStatus, status, languages, writingLevel, speakingLevel, motherTongue,
      family, educationLevel, proficiencyExams, jobStatus, lookingForJob, currentIncome,
      workExperience, settlingLocation, settlingDuration, joiningReason, suggestions,
      suggestionsCity,
    } = this.state;
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    const autosuggestCityProps = {
      renderInputComponent,
      suggestions: suggestionsCity,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequestedCity,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequestedCity,
      getSuggestionValueCity,
      renderSuggestionCity,
    };

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
                Personal Information
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="age"
              name="age"
              label="Age"
              value={age}
              type="number"
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={ageError}
              error={ageError.length > 0}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="nationality"
              name="nationality"
              label="Nationality"
              value={nationality}
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={nationalityError}
              error={nationalityError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset" fullWidth className={classes.formControl}>
              <FormLabel component="legend" error={genderError.length > 0}>Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                id="gender"
                name="gender"
                className={classes.group}
                value={gender}
                onChange={event => this.handleChange(event)}
              >
                {genderOptions.map(option => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                    {option.label}
                  </FormControlLabel>
                ))}
              </RadioGroup>
              <FormHelperText
                error={genderError.length > 0}
              >
                {genderError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="status"
              name="status"
              select
              label="Status"
              value={status}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={statusError}
              error={statusError.length > 0}
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
              value={relationshipStatus}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={relationshipStatusError}
              error={relationshipStatusError.length > 0}
            >
              {relationshipStatusOptions.map(option => (
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
                value: motherTongue,
                onChange: this.handleAutoSuggestChange('motherTongue'),
                helperText: motherTongueError,
                error: motherTongueError.length > 0,
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
              value={writingLevel}
              onChange={event => this.handleChange(event)}
              fullWidth
              className={classes.select}
              helperText={writingLevelError}
              error={writingLevelError.length > 0}
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
              value={speakingLevel}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={speakingLevelError}
              error={speakingLevelError.length > 0}
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
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={event => this.handleAddObject('languages', langObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>

          {languages.map((language, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={24} item xs={12} sm={11}>
                <Grid item xs={12} sm={4}>
                  <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                      classes,
                      value: language.name,
                      label: 'Language',
                      onChange: this.handleEditObjectAutosuggest('languages', 'name', index),
                      helperText: this.objectErrorText('languagesError', index, 'name'),
                      error: this.objectErrorText('languagesError', index, 'name').length > 0,
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
                    onChange={this.handleEditObject('languages', index)}
                    className={classes.select}
                    fullWidth
                    helperText={this.objectErrorText('languagesError', index, 'writingLevel')}
                    error={this.objectErrorText('languagesError', index, 'writingLevel').length > 0}
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
                    onChange={this.handleEditObject('languages', index)}
                    className={classes.select}
                    fullWidth
                    helperText={this.objectErrorText('languagesError', index, 'speakingLevel')}
                    error={this.objectErrorText('languagesError', index, 'speakingLevel').length > 0}
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
                <Button
                  variant="fab"
                  mini
                  aria-label="Delete"
                  onClick={event => this.handleRemoveObject('languages', index, event)}
                  className={classes.button}
                >
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
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={event => this.handleAddObject('family', familyObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {family.map((member, index) => (
            <React.Fragment key={index}>
              <Paper className={classes.paper}>
                <Typography variant="subheading" align="left" gutterBottom>
                            Member
                  {' '}
                  {index + 1}
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
                        onChange={this.handleEditObject('family', index)}
                        helperText={this.objectErrorText('familyError', index, 'age')}
                        error={this.objectErrorText('familyError', index, 'age').length > 0}
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">years</InputAdornment>,
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
                        onChange={this.handleEditObject('family', index)}
                        className={classes.select}
                        helperText={this.objectErrorText('familyError', index, 'relationshipStatus')}
                        error={this.objectErrorText('familyError', index, 'relationshipStatus').length > 0}
                        fullWidth
                      >
                        {relationshipStatusOptions.map(option => (
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
                        onChange={this.handleEditObject('family', index)}
                        className={classes.select}
                        helperText={this.objectErrorText('familyError', index, 'relation')}
                        error={this.objectErrorText('familyError', index, 'relation').length > 0}
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
                        <FormLabel
                          component="legend"
                          error={this.objectErrorText('familyError', index, 'gender').length > 0}
                        >
Gender
                        </FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          id="gender"
                          name="gender"
                          className={classes.group}
                          value={member.gender}
                          onChange={this.handleEditObject('family', index)}
                        >
                          {genderOptions.map(option => (
                            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                              {option.label}
                            </FormControlLabel>
                          ))}
                        </RadioGroup>
                        <FormHelperText
                          error={this.objectErrorText('familyError', index, 'gender').length > 0}
                        >
                          {this.objectErrorText('familyError', index, 'gender')}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="fab"
                      mini
                      aria-label="Delete"
                      onClick={event => this.handleRemoveObject('family', index, event)}
                      className={classes.button}
                    >
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
              value={educationLevel}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={educationLevelError}
              error={educationLevelError.length > 0}
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
                    control={(
                      <Checkbox
                        name={option.value}
                        checked={proficiencyExams[option.value]}
                        onChange={this.handleEditSingleObject('proficiencyExams', option.value)}
                      />
)}
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
              value={proficiencyExams.others}
              onChange={this.handleEditSingleObject('proficiencyExams', 'others')}
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
              value={jobStatus}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={jobStatusError}
              error={jobStatusError.length > 0}
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
              value={currentIncome}
              onChange={event => this.handleChange(event)}
              fullWidth
              InputProps={{
                inputComponent: IncomeMask,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset" fullWidth className={classes.formControl}>
              <FormLabel component="legend" error={lookingForJobError.length > 0}>Looking for a job?</FormLabel>
              <RadioGroup
                aria-label="Looking for a job?"
                id="lookingForJob"
                name="lookingForJob"
                className={classes.group}
                value={lookingForJob}
                onChange={event => this.handleChange(event)}
              >
                {lookingForJobOptions.map(option => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                    {option.label}
                  </FormControlLabel>
                ))}
              </RadioGroup>
              <FormHelperText
                error={lookingForJobError.length > 0}
              >
                {lookingForJobError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" gutterBottom className={classes.row}>
                    Add work experience
            </Typography>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={event => this.handleAddObject('workExperience', workObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {workExperience.map((work, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={24} item xs={12} sm={11}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    value={work.title}
                    onChange={this.handleEditObject('workExperience', index)}
                    helperText={this.objectErrorText('workExperienceError', index, 'title')}
                    error={this.objectErrorText('workExperienceError', index, 'title').length > 0}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="company"
                    name="company"
                    label="Company"
                    value={work.company}
                    onChange={this.handleEditObject('workExperience', index)}
                    helperText={this.objectErrorText('workExperienceError', index, 'company')}
                    error={this.objectErrorText('workExperienceError', index, 'company').length > 0}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="years"
                    name="years"
                    label="Employment length"
                    value={work.years}
                    onChange={this.handleEditObject('workExperience', index)}
                    helperText={this.objectErrorText('workExperienceError', index, 'years')}
                    error={this.objectErrorText('workExperienceError', index, 'years').length > 0}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">years</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  variant="fab"
                  mini
                  aria-label="Delete"
                  onClick={event => this.handleRemoveObject('workExperience', index, event)}
                  className={classes.button}
                >
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
                value: settlingLocation,
                onChange: this.handleAutoSuggestChange('settlingLocation'),
                helperText: settlingLocationError,
                error: settlingLocationError.length > 0,
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
              value={settlingDuration}
              onChange={event => this.handleChange(event)}
              fullWidth
              type="number"
              helperText={settlingDurationError}
              error={settlingDurationError.length > 0}
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="joiningReason"
              name="joiningReason"
              select
              label="Reason for joining"
              value={joiningReason}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={joiningReasonError}
              error={joiningReasonError.length > 0}
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
          onClick={this.handleSave}
          className={classes.button}
        >
                Save
        </Button>
      </React.Fragment>
    );
  }
}


EditMigrant.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EditMigrant);
