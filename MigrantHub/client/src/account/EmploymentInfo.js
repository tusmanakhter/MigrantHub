import React from 'react';
import FormComponent from './FormComponent'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const jobStatus = [
  { value: 'fulltime', label: 'Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
]

class EmploymentInfo extends FormComponent {
  state = {
    workExperience: '', //optional
    jobStatus: '',
    currentIncome: '' //optional
  }

  render() {
    return (
      <div className="EmploymentInfo">
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
      </div>
    );
  }
}

export default EmploymentInfo;
