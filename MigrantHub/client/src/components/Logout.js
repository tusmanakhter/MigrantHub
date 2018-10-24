import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Auth from '../routes/Auth';
import axios from 'axios';

class Logout extends Component {
  logout = (history) => {
    axios.post('/account/logout').then(response => {
      if (response.status === 200) {
        Auth.unauthenticate();
        history.push('/');
      }
    })
  };

  render() {
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.logout}>
          Logout
        </Button>
      </React.Fragment>
    )
  }
}

export default withRouter(Logout);