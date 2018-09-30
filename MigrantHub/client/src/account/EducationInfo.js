import React from 'react';
import FormComponent from './FormComponent'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

class EducationInfo extends FormComponent {
  state = {
    educationLevel: '',
    proficiencyExams: {
      ielts: '',
      french: '',
      other: ''
    },
  }

  render() {
    return (
      <div className="EducationInfo">
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
      </div>
    );
  }
}

export default EducationInfo;
