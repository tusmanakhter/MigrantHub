import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';

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

const styles = theme => ({
  group: {
    flexDirection: 'row'
  },
  formControl: {
    textAlign: 'left'
  },
  select: {
    textAlign: 'left'
  }
});

class EducationInfo extends Component {
  state = {
    educationLevelError: '',
  }

  validate = () => {
    let isError = false;
    const errors = {
      educationLevelError: '',
    };

    if (validator.isEmpty(this.props.educationLevel)) {
      errors.educationLevelError = "Education level is required";
      isError = true
    }

    this.setState({
      ...this.state,
      ...errors
    })
    
    return isError;
  }
  
  handleChangeExams = (name) => (event) => {
    let proficiencyExams = { ...this.state.proficiencyExams };
    proficiencyExams[name] = event.target.checked;
    this.setState({ proficiencyExams });
  }

  render() {
    const { classes } = this.props;

    const handleChange = this.props.handleChange;
    const handleEditSingleObject = this.props.handleEditSingleObject;
    const educationLevel = this.props.educationLevel;
    const proficiencyExams = this.props.proficiencyExams;

    return (
      <React.Fragment>
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
            onChange={event => handleChange(event)}
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
                        checked={proficiencyExams[option.value]}
                        onChange={handleEditSingleObject("proficiencyExams", option.value)}
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
            value={proficiencyExams.others}
            onChange={handleEditSingleObject("proficiencyExams", "others")}
            fullWidth
          />
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }
}

EducationInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EducationInfo);
