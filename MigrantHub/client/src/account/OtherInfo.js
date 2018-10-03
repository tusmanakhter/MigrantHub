import React from 'react';
import FormComponent from './FormComponent'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' }
]

class OtherInfo extends FormComponent {
  state = {
    settlingLocation: '',
    settlingDuration: '',
    joiningReason: '',
  }

  render() {
    return (
      <div className="OtherInfo">
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
      </div>
    );
  }
}

export default OtherInfo;
