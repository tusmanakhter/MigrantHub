import React, { Component } from 'react';

class FormComponent extends Component {
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target);
  }
}

export default FormComponent;
