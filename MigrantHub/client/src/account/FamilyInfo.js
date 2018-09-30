import React from 'react';
import FormComponent from './FormComponent'
import TextField from '@material-ui/core/TextField';
class FamilyInfo extends FormComponent {
  state = {
    // how many immediate family coming, ages, single/married etc?
    familyUnit: {
      familySize: '',
      familyMembers: []
    },
  }

  render() {
    return (
      <div className="FamilyInfo">
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
      </div>
    );
  }
}

export default FamilyInfo;
