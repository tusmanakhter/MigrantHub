import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator';
import { statuses, genders, relationshipStatuses } from '../../lib/SignUpConstants';

const styles = ({
  group: {
    flexDirection: 'row',
  },
  formControl: {
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
  },
});

class PersonalInfo extends Component {
  state = {
    ageError: '',
    genderError: '',
    nationalityError: '',
    relationshipStatusError: '',
    statusError: '',
  }

  validate = () => {
    const {
      age, gender, nationality, relationshipStatus, status,
    } = this.props;
    let isError = false;
    const errors = {
      ageError: '',
      genderError: '',
      nationalityError: '',
      relationshipStatusError: '',
      statusError: '',
    };

    if (validator.isEmpty(age)) {
      errors.ageError = 'Age is required';
      isError = true;
    } else if (!validator.isInt(age, {min: 1, max: 100})){
      errors.ageError = 'Age is not valid';
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

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      classes, handleChange, age, gender, nationality, relationshipStatus, status,
    } = this.props;
    const {
      ageError, genderError, nationalityError, relationshipStatusError, statusError,
    } = this.state;

    return (
      <React.Fragment>
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
              onChange={event => handleChange(event)}
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
              onChange={event => handleChange(event)}
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
                onChange={event => handleChange(event)}
              >
                {genders.map(option => (
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
              onChange={event => handleChange(event)}
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
              onChange={event => handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={relationshipStatusError}
              error={relationshipStatusError.length > 0}
            >
              {relationshipStatuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

PersonalInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  relationshipStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default withStyles(styles)(PersonalInfo);
