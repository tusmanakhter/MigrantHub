import { Component } from 'react';

class FormComponent extends Component {
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFieldChange = (field) => (event, value, selectedKey) => {
    let data = { ...this.state.data };
    data[field] = value;
    this.setState({ data });
  }

}

export default FormComponent;
